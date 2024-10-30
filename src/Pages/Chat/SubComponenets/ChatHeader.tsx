import React, { useEffect, useRef, useState } from "react";
import { HiOutlinePhone, HiOutlineVideoCamera } from "react-icons/hi2";
import { Avatar, IconButton } from "@radix-ui/themes";
import {
  handleCallAnswered,
  receiveCall,
  startCall,
  endCall,
} from "../../../services/socketService";

export interface Receiver {
  userId?: string;
  username: string;
  image: string;
}

export interface ChatProps {
  receiver: Receiver | null;
}

type CallType = "audio" | "video";

const ChatHeader: React.FC<ChatProps> = ({ receiver }) => {
  const [callStatus, setCallStatus] = useState<"idle" | "calling" | "in-call">(
    "idle"
  );
  const [incomingCall, setIncomingCall] = useState<{
    from: Receiver;
    type: CallType;
  } | null>(null);
  const receiverId = receiver?.userId;
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnection = useRef<RTCPeerConnection | null>(null);

  useEffect(() => {
    const handleIncomingCall = ({
      from,
      callType,
    }: {
      from: Receiver;
      callType: CallType;
    }) => {
      setIncomingCall({ from, type: callType });
    };

    receiveCall(handleIncomingCall);

    return () => {
      endCall();
    };
  }, []);

  const initializePeerConnection = () => {
    peerConnection.current = new RTCPeerConnection();

    peerConnection.current.ontrack = (event) => {
      const [stream] = event.streams;
      setRemoteStream(stream);
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = stream;
      }
    };

    if (localStream) {
      localStream
        .getTracks()
        .forEach((track) =>
          peerConnection.current?.addTrack(track, localStream)
        );
    }
  };

  const handleStartCall = async (type: CallType) => {
    if (!receiverId) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: type === "video",
      });

      setRemoteStream(stream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      initializePeerConnection();
      await startCall(receiverId, type);
      setCallStatus("calling");
    } catch (error) {
      console.error("Error starting call:", error);
      setCallStatus("idle");
    }
  };

  const handleAcceptCall = async () => {
    if (incomingCall) {
      setCallStatus("in-call");
      handleCallAnswered();

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: incomingCall.type === "video",
      });
      setLocalStream(stream);

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      initializePeerConnection();
      setIncomingCall(null);
    }
  };

  const handleEndCall = () => {
    localStream?.getTracks().forEach((track) => track.stop());
    setLocalStream(null);
    remoteStream?.getTracks().forEach((track) => track.stop());
    setRemoteStream(null);

    peerConnection.current?.close();
    peerConnection.current = null;
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null;
    }

    setCallStatus("idle");
    endCall();
  };

  useEffect(() => {
    if (localStream && localVideoRef.current) {
      localVideoRef.current.srcObject = localStream;
    }
    if (remoteStream && remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [localStream, remoteStream]);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-gray-100 rounded-lg shadow-md">
      <div className="flex items-center space-x-4">
        <Avatar
          src={receiver?.image}
          alt={receiver?.username}
          className="w-12 h-12 rounded-full"
          fallback={""}
        />
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold">{receiver?.username}</h2>
          <div className="flex space-x-2">
            {callStatus === "idle" && (
              <>
                <IconButton
                  onClick={() => handleStartCall("audio")}
                  className="p-2 text-blue-500 hover:text-blue-700 transition"
                >
                  <HiOutlinePhone size={20} />
                </IconButton>
                <IconButton
                  onClick={() => handleStartCall("video")}
                  className="p-2 text-blue-500 hover:text-blue-700 transition"
                >
                  <HiOutlineVideoCamera size={20} />
                </IconButton>
              </>
            )}

            {callStatus === "calling" && (
              <>
                <IconButton
                  onClick={() => handleStartCall("audio")}
                  className="p-2 text-blue-500 hover:text-blue-700 transition"
                >
                  <HiOutlinePhone size={20} />
                </IconButton>
                <IconButton
                  onClick={() => handleStartCall("video")}
                  className="p-2 text-blue-500 hover:text-blue-700 transition"
                >
                  <HiOutlineVideoCamera size={20} />
                </IconButton>
              </>
            )}

            {callStatus === "in-call" && (
              <button
                onClick={handleEndCall}
                className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md transition"
              >
                End Call
              </button>
            )}
          </div>
        </div>
      </div>

      {incomingCall && (
        <div className="flex flex-col items-center p-4 bg-white shadow-lg rounded-lg border border-gray-200">
          <h3 className="text-sm font-medium">
            {incomingCall.from.username} is calling...
          </h3>
          <Avatar
            src={incomingCall.from.image}
            alt={incomingCall.from.username}
            className="w-12 h-12 rounded-full mt-2 mb-4"
            fallback=""
          />
          <div className="flex space-x-2">
            <button
              onClick={handleAcceptCall}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-md transition"
            >
              Accept
            </button>
            <button
              onClick={handleEndCall}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-md transition"
            >
              Decline
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-center w-full mt-4 sm:mt-0 sm:w-1/2">
        <video
          ref={localVideoRef}
          autoPlay
          muted
          className={`w-full h-48 rounded-lg shadow-md ${localStream ? "block" : "hidden"}`}
        />
        <video
          ref={remoteVideoRef}
          autoPlay
          className={`w-full h-48 rounded-lg shadow-md mt-4 sm:mt-0 ${remoteStream ? "block" : "hidden"}`}
        />
        {callStatus === "calling" && (
          <button
            onClick={handleEndCall}
            className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md transition"
          >
            End Call
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatHeader;
