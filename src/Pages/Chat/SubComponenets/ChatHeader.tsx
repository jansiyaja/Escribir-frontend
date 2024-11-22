import React, { useEffect, useRef, useState } from "react";
import { HiOutlinePhone, HiOutlineVideoCamera } from "react-icons/hi2";
import { Avatar, IconButton } from "@radix-ui/themes";
import socket, {
  handleCallAnswered,
  receiveCall,
  startCall,
  endCall,
} from "../../../services/socketService";

import { VideoCallModal } from "./VideoCallModal"; 

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

const ChatHeader: React.FC<ChatHeaderProps> = ({
  selectedChat,
  onUserDetailsClick,

}) => {
  const [callStatus, setCallStatus] = useState<"idle" | "calling" | "in-call">(
    "idle"
  );
  const [incomingCall, setIncomingCall] = useState<{
    from: Receiver;
    type: CallType;
  } | null>(null);
  const receiverId = selectedChat?.userId;
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnection = useRef<RTCPeerConnection | null>(null);

  const [showModal, setShowModal] = useState(false);

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

      setLocalStream(stream);
     
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      initializePeerConnection();
      await startCall(receiverId, type,peerConnection.current!);
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
    setLocalStream(stream);
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = stream;
    }
    initializePeerConnection();
    handleCallAnswered(peerConnection.current!);
    setIncomingCall(null);
    setShowModal(true);
  }
};



  useEffect(() => {
  
  const handleCallEnded = () => {
    endCall(); 
    
    handleEndCall();
  };

  socket.on("call-ended", handleCallEnded);

  return () => {
    socket.off("call-ended", handleCallEnded);


  };
}, []);

const handleEndCall = () => {
  
  
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

  socket.emit("end-callactivate", { receiverId });
   
  
  
};

  useEffect(() => {
    if (localStream && localVideoRef.current) {
      localVideoRef.current.srcObject = localStream;
    }

    if (remoteStream && remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [localStream, remoteStream]);

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

      {callStatus === "in-call" && (
        <button
          onClick={handleEndCall}
          className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md transition"
        >
          End Call
        </button>
      )}

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
