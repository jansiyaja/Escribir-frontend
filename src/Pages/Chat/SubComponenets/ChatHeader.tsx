import React, { useEffect, useRef, useState } from "react";
import { HiOutlinePhone, HiOutlineVideoCamera } from "react-icons/hi2";
import { Avatar, IconButton } from '@radix-ui/themes';
import { handleCallAnswered, receiveCall, startCall, endCall as endCallService } from "../../../services/socketService";

export interface Receiver {
    userId?: string;
    username: string;
    image: string;
}

export interface ChatProps {
    receiver: Receiver | null;
}

type CallType = 'audio' | 'video';

const ChatHeader: React.FC<ChatProps> = ({ receiver }) => {
    const [callStatus, setCallStatus] = useState<'idle' | 'calling' | 'in-call'>('idle');
    const [incomingCall, setIncomingCall] = useState<{ from: Receiver; type: CallType } | null>(null);
    const receiverId = receiver?.userId;

    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const handleIncomingCall = ({ from, callType }: { from: Receiver; callType: CallType }) => {
            setIncomingCall({ from, type: callType });
        };

        receiveCall(handleIncomingCall);
        return () => {
            endCall();
        };
    }, []);

    const handleStartCall = async (type: CallType) => {
        if (!receiverId) return;

        try {
            setLocalStream(await navigator.mediaDevices.getUserMedia({ audio: true, video: type === 'video' }));

            if (localVideoRef.current) {
                localVideoRef.current.srcObject = localStream;
            }

            await startCall(receiverId, type);
            setCallStatus('calling');
        } catch (error) {
            console.error('Error starting call:', error);
            setCallStatus('idle');
        }
    };

    const handleAcceptCall = async () => {
        if (incomingCall) {
            setCallStatus('in-call');
            handleCallAnswered();
            setIncomingCall(null);
        }
    };

    const endCall = () => {
        localStream?.getTracks().forEach(track => track.stop());
        setLocalStream(null);
        setRemoteStream(null);
        setCallStatus('idle');
        endCallService();
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
        <div className="chat-header">
            <Avatar src={receiver?.image} alt={receiver?.username} fallback="" />
            <div className="user-info">
                <h2>{receiver?.username}</h2>
                <div className="call-controls">
                    {callStatus === 'idle' && (
                        <>
                            <IconButton onClick={() => handleStartCall('audio')}><HiOutlinePhone /></IconButton>
                            <IconButton onClick={() => handleStartCall('video')}><HiOutlineVideoCamera /></IconButton>
                        </>
                    )}
                    {incomingCall && (
                        <>
                            <h3>{incomingCall.from.username} is calling...</h3>
                            <Avatar src={incomingCall.from.image} alt={incomingCall.from.username} fallback="" />
                            <button onClick={handleAcceptCall}>Accept {incomingCall.type} Call</button>
                            <button onClick={() => setIncomingCall(null)}>Decline</button>
                        </>
                    )}
                </div>
            </div>
            <div className="video-container">
                <video ref={localVideoRef} autoPlay muted style={{ display: localStream ? 'block' : 'none' }} />
                <video ref={remoteVideoRef} autoPlay style={{ display: remoteStream ? 'block' : 'none' }} />
                {callStatus === 'in-call' && (
                    <button onClick={endCall} style={{ marginTop: "10px" }}>End Call</button>
                )}
            </div>
        </div>
    );
};

export default ChatHeader;
