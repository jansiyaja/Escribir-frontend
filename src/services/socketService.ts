import { io } from 'socket.io-client';
import { Message } from '../Interfaces/Components';


const socket = io(import.meta.env.VITE_API_BASE_URL, { withCredentials: true });


const configuration = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] }
let peerConnection = new RTCPeerConnection(configuration);
export const loginUser = (user: { userId: string; username?: string; email?: string }) => {
    socket.emit('login', user);
    console.log(`User logged in with ID: ${user.userId}`, user);
};

export const sendReactionNotification = (userId: string, postAuthorId: string, reactionType: string) => {
    socket.emit('reaction', { userId, postAuthorId, reactionType });
    console.log(`Reaction sent from ${userId} to ${postAuthorId}: ${reactionType}`);
};

export const reciveReactionNotification = (callback: (notification: any) => void) => {
    socket.on('recive_Reaction', (notification) => {
        console.log(`Received reaction notification:`, notification);
        callback(notification);
    });

    return () => {
        socket.off("recive_Reaction", callback);
    };
};

export const sendFollowNotification = (followerId: string, followedId: string) => {
    socket.emit('follow', { followerId, followedId });
    console.log(`Follow request sent from ${followerId} to ${followedId}`);
};

export const SendNewMessage = (newMessage: Message, receiverId: string | undefined) => {
    if (receiverId) {
        socket.emit('send_message', { message: newMessage, receiverId });
        console.log(`New message sent to ${receiverId}:`, newMessage);
    } else {
        console.error(`Receiver ID is undefined. Cannot send message.`);
    }
};

export const ReciveNewMessage = (callback: (notification: any) => void) => {
    socket.on('receive_message', (message) => {
        console.log(`New message received:`, message);
        callback(message);
    });

    return () => {
        socket.off('receive_message', callback);
    };
};

export const RecieveMsgNotifications = (callback: (notification: any) => void) => {
    socket.on('notification_count', (notification) => {
        console.log(`New message notification count received:`, notification);
        callback(notification);
    });
};

export const subscribeToNotifications = (callback: (notification: any) => void) => {
    socket.on('receive_notification', (notification) => {
        console.log(`Received notification:`, notification);
        callback(notification);
    });
};

export const unsubscribeFromNotifications = () => {
    socket.off('notification');
};



export const startCall = async (receiverId: string, callType: 'audio' | 'video') => {
    peerConnection = new RTCPeerConnection(configuration);

    const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: callType === 'video',
    });

    mediaStream.getTracks().forEach((track) => {
        console.log(track,mediaStream);
        
        peerConnection?.addTrack(track, mediaStream);
        console.log("added track successfully");
        
    });

    peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
            socket.emit('ice-candidate', { receiverId, candidate: event.candidate });
        }
    };

    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    socket.emit('call-user', { receiverId, offer, callType });
};


export const receiveCall = (callback: (callInfo: { from: any; callType: 'audio' | 'video' }) => void) => {
    socket.on('receive-call', async ({ from, offer, callType }) => {
        callback({ from, callType });
        peerConnection = new RTCPeerConnection(configuration);

        peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                socket.emit('ice-candidate', { receiverId: from.userId, candidate: event.candidate });
            }
        };

        const mediaStream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: callType === 'video',
        });

        mediaStream.getTracks().forEach((track) => {
              console.log(track,mediaStream);
             console.log("recived track successfully");
            peerConnection?.addTrack(track, mediaStream);
        });

        await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        socket.emit('answer-call', { to: from.userId, answer });
    });
};


export const handleCallAnswered = () => {
    socket.on('call-answered', async ({ answer }) => {
        console.log(`Call answered received:`, answer);
        if (peerConnection) {
            await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
        }
    });
};

export const handleIceCandidate = () => {
    socket.on('ice-candidate', ({ candidate }) => {
        if (peerConnection) {
            peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
        }
    });
};

export const endCall = () => {
    if (peerConnection) {
        peerConnection.close();
       
    }
    socket.emit('end-call'); // Optional: Notify the server that the call ended
};

export default socket;
