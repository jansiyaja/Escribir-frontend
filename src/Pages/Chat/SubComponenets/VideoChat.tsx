import React, { useEffect, useRef, useState } from 'react';
import { useSocket } from '../../../Contexts/SocketProvider';


const STUN_SERVERS = [
  { urls: ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302'] },
];

const VideoChat: React.FC = () => {
  const { socket } = useSocket();
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream] = useState(() => new MediaStream());
  const [peerConnection, setPeerConnection] = useState<RTCPeerConnection | null>(null);
  const [didIOffer, setDidIOffer] = useState(false);

  useEffect(() => {
    if (!socket) return;

    // Listen for incoming offers
    socket.on('newOfferAwaiting', async (offers) => {
      const offer = offers[offers.length - 1];
      await handleIncomingOffer(offer);
    });

    socket.on('answerResponse', async (offerObj) => {
      if (peerConnection) {
        await peerConnection.setRemoteDescription(offerObj.answer);
      }
    });

    socket.on('receivedIceCandidateFromServer', (iceCandidate) => {
      if (peerConnection) {
        peerConnection.addIceCandidate(new RTCIceCandidate(iceCandidate));
      }
    });

    return () => {
      socket.off('newOfferAwaiting');
      socket.off('answerResponse');
      socket.off('receivedIceCandidateFromServer');
    };
  }, [socket, peerConnection]);

  const fetchUserMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      setLocalStream(stream);
    } catch (err) {
      console.error(err);
    }
  };

  const createPeerConnection = async (offerObj?: any) => {
    const pc = new RTCPeerConnection({ iceServers: STUN_SERVERS });
    setPeerConnection(pc);

    if (localStream) {
      localStream.getTracks().forEach((track) => pc.addTrack(track, localStream));
    }

    pc.onicecandidate = (e) => {
      if (e.candidate && socket) {
        socket.emit('sendIceCandidateToSignalingServer', {
          iceCandidate: e.candidate,
          iceUserName: (socket.auth as { userName: string }).userName,
          didIOffer,
        });
      }
    };

    pc.ontrack = (e) => {
      e.streams[0].getTracks().forEach((track) => remoteStream.addTrack(track));
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = remoteStream;
      }
    };

    if (offerObj) {
      await pc.setRemoteDescription(new RTCSessionDescription(offerObj.offer));
    }

    return pc;
  };

  const handleCall = async () => {
    await fetchUserMedia();
    const pc = await createPeerConnection();

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    setDidIOffer(true);
    if (socket) {
      socket.emit('newOffer', offer);
    }
  };

  const handleIncomingOffer = async (offerObj: any) => {
    await fetchUserMedia();
    const pc = await createPeerConnection(offerObj);

    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);

    if (socket) {
      socket.emit('newAnswer', { ...offerObj, answer });
    }
  };

  return (
    <div className="video-chat">
      <div className="videos">
        <video ref={localVideoRef} autoPlay playsInline></video>
        <video ref={remoteVideoRef} autoPlay playsInline></video>
      </div>
      <button onClick={handleCall}>Call</button>
    </div>
  );
};

export default VideoChat;
