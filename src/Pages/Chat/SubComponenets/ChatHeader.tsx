import React, { useEffect, useRef, useState } from "react";
import { HiOutlinePhone, HiOutlineVideoCamera } from "react-icons/hi2";
import {  IconButton } from "@radix-ui/themes";
import socket from "../../../services/socketService";
import { VideoCallModal } from "./VideoCallModal";

export const configuration = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };

export interface Receiver {
  userId?: string;
  username: string;
  image: string;
}

interface ChatHeaderProps {
  selectedChat: {
    userId: string;
    username: string;
    image: string;
  } | null;
  onUserDetailsClick: () => void;
}

type CallType = "audio" | "video";

interface CallInfo {
  from: Receiver;
  offer: RTCSessionDescriptionInit;
  callType: CallType;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ selectedChat, onUserDetailsClick }) => {
  const [callStatus, setCallStatus] = useState<"idle" | "calling" | "in-call">("idle");
  const [incomingCall, setIncomingCall] = useState<{ from: Receiver; type: CallType } | null>(null);
  const receiverId = selectedChat?.userId;
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleIncomingCall = ({ from, callType }: { from: Receiver; callType: CallType }) => {
      console.log("Incoming call from:", from.username, "Call type:", callType);
      setIncomingCall({ from, type: callType });
    };

    socket.on("receive-call", async ({ from, offer, callType }: CallInfo) => {
      console.log("Incoming call received from:", from.username);
      console.log("Call type:", callType);

      // Use the peerConnection ref here to avoid creating a new one every time
      peerConnection.current = new RTCPeerConnection(configuration);
      console.log("Created new RTCPeerConnection for the incoming call...");

      peerConnection.current.onicecandidate = (event) => {
        if (event.candidate) {
          console.log("Sending ICE candidate to caller...");
          socket.emit("ice-candidate", { candidate: event.candidate });
        }
      };

      console.log("Setting remote description with the received offer...");
      await peerConnection.current.setRemoteDescription(new RTCSessionDescription(offer));
      console.log("Remote description set:", peerConnection.current.remoteDescription);

      const answer = await peerConnection.current.createAnswer();
      console.log("Answer created:", answer);

      console.log("Setting local description with the created answer...");
      await peerConnection.current.setLocalDescription(answer);
      console.log("Local description set:", peerConnection.current.localDescription);

      console.log("Sending answer back to the caller via socket...");
      socket.emit("call-answer", { answer });

      setIncomingCall({ from, type: callType });
      setCallStatus("calling");
    });

    return () => {
      socket.off("receive-call", handleIncomingCall);
    };
  }, []);

  const initializePeerConnection = () => {
    console.log("Initializing peer connection...");
    if (peerConnection.current) {
      peerConnection.current.ontrack = (event) => {
        const [stream] = event.streams;
        console.log("Received remote stream:", stream);
        setRemoteStream(stream);
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = stream;
          console.log("Remote stream set to remoteVideoRef.");
        }
      };

      if (localStream) {
        localStream.getTracks().forEach((track) => {
          peerConnection.current?.addTrack(track, localStream);
          console.log("Adding local track to peer connection:", track);
        });
      }
    }
  };

  const handleStartCall = async (type: CallType) => {
    console.log("iam clicking the buttion");
    console.log("id",receiverId);
    
    if (!receiverId) return;

    try {
      console.log(`Requesting ${type} media stream...`);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: type === "video",
      });

      setLocalStream(stream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
        console.log("Local stream set to localVideoRef.");
      }

      initializePeerConnection();
      const offer = await peerConnection.current?.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: type === "video",
      });

      console.log("Created offer:", offer);

      await peerConnection.current?.setLocalDescription(offer!);
      console.log("Local description set with offer:", peerConnection.current?.localDescription);

      socket.emit("call-user", { receiverId, callType: type, offer });
      console.log("Offer sent to receiver via socket...");

      setCallStatus("calling");
      setShowModal(true);
    } catch (error) {
      console.error("Error starting call:", error);
      setCallStatus("idle");
    }
  };

  const handleAcceptCall = async () => {
    if (incomingCall) {
      setCallStatus("in-call");
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: incomingCall.type === "video",
      });

      console.log("Local stream obtained for incoming call:", stream);

      setLocalStream(stream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
        console.log("Local stream set to localVideoRef.");
      }
      initializePeerConnection();
      const answer = await peerConnection.current!.createAnswer();
      console.log("Answer created:", answer);
      await peerConnection.current!.setLocalDescription(answer);
      console.log("Local description set with answer:", peerConnection.current?.localDescription);

      socket.emit("call-answered", { answer });
      console.log("Answer sent to caller via socket...");

      setIncomingCall(null);
      setShowModal(true);
    }
  };

  const handleEndCall = () => {
    console.log("Ending call...");
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
      setLocalStream(null);

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = null;
      }
    }

    if (remoteStream) {
      remoteStream.getTracks().forEach((track) => track.stop());
      setRemoteStream(null);

      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = null;
      }
    }

    if (peerConnection.current) {
      peerConnection.current.close();
      peerConnection.current = null;
    }

    setCallStatus("idle");
    setShowModal(false);

    socket.emit("end-call", { receiverId });
    console.log("Call ended and event emitted to server...");
  };

  if (!selectedChat) return <div>Select a user</div>;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-gray-100 rounded-lg shadow-md">
      <div
        className="flex items-center space-x-3 cursor-pointer"
        onClick={onUserDetailsClick}
      >
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img
            src={selectedChat.image}
            alt={selectedChat.username || 'User'}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h2 className="font-semibold">{selectedChat.username}</h2>
          <p className="text-sm text-gray-500">Online</p>
        </div>
      </div>

      {callStatus === "idle" && (
        <div className="flex items-center space-x-4">
          <button
            className="p-2 hover:bg-gray-100 rounded-full"
            onClick={() => handleStartCall("audio")}
          >
            <HiOutlinePhone className="w-5 h-5 text-gray-600" />
          </button>
          <button
            className="p-2 hover:bg-gray-100 rounded-full"
            onClick={() => handleStartCall("video")}
          >
            <HiOutlineVideoCamera className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      )}

      {callStatus === "calling" && (
        <div className="flex items-center space-x-4">
          <IconButton
            onClick={handleAcceptCall}
            className="p-2 text-green-500 hover:text-green-700 transition"
          >
            <HiOutlinePhone size={20} />
          </IconButton>
          <IconButton
            onClick={handleEndCall}
            className="p-2 text-red-500 hover:text-red-700 transition"
          >
            <HiOutlineVideoCamera size={20} />
          </IconButton>
        </div>
      )}

      {showModal && (
              <VideoCallModal
          localStream={localStream}
          remoteStream={remoteStream}
          onEnd={handleEndCall}
       
        />
      )}
    </div>
  );
};

export default ChatHeader;
