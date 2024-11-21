import { io } from 'socket.io-client';
import { Message } from '../Interfaces/Components';


 export const socket = io(import.meta.env.VITE_API_BASE_URL, { withCredentials: true });
 export const configuration = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
let peerConnection: RTCPeerConnection | null = null;



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

};

export const SendNewMessage = (newMessage: Message, receiverId: string | undefined) => {
    if (receiverId) {
        socket.emit('send_message', { message: newMessage, receiverId });
        
    } else {
        console.error(`Receiver ID is undefined. Cannot send message.`);
    }
};





export const ReciveNewMessage = (callback: (notification: any) => void) => {
    socket.on('receive_message', (message) => {
       
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








type CallType = 'audio' | 'video';
interface Receiver {
    userId: string;
    username: string;
    image: string;
}
interface CallInfo {
    from: Receiver;
    offer: RTCSessionDescriptionInit;
    callType: CallType;
}

export const startCall = async (
    receiverId: string,
    callType: CallType,
    peerConnection: RTCPeerConnection
) => {
    try {
        const offer = await peerConnection.createOffer({
            offerToReceiveAudio: true,
            offerToReceiveVideo: callType === 'video',
        });
        await peerConnection.setLocalDescription(offer);

        socket.emit('call-user', { receiverId, offer, callType });
    } catch (error) {
        console.error('Error starting call:', error);
    }
};

export const receiveCall = (
    peerConnection: RTCPeerConnection,
    localStream: MediaStream,
    callback: (callInfo: CallInfo) => void
) => {
    socket.on('receive-call', async ({ from, offer, callType }: CallInfo) => {
        try {
            callback({ from, offer, callType });

            await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));

            localStream.getTracks().forEach((track) => {
                peerConnection.addTrack(track, localStream);
            });

            const answer = await peerConnection.createAnswer();
            await peerConnection.setLocalDescription(answer);

            socket.emit('answer-call', { receiverId: from.userId, answer });
        } catch (error) {
            console.error('Error handling incoming call:', error);
        }
    });
};

export const handleCallAnswered = async (
  peerConnection: RTCPeerConnection,
  answer: RTCSessionDescriptionInit
) => {
  try {
    if (peerConnection) {
      await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
    }
  } catch (error) {
    console.error("Error handling call answer:", error);
  }
};


export const endCall = (receiverId?: string) => {
    if (peerConnection) {
        peerConnection.getSenders().forEach((sender) => sender.track?.stop());
        peerConnection.close();
        peerConnection = null;
    }
   
    if (receiverId) {
        socket.emit('end-call', { receiverId });
    } else {
        socket.emit('end-call');
    }
};


export const handleEndCall = (callback: () => void) => {
    socket.on('call-ended', () => {
        if (peerConnection) {
            peerConnection.getSenders().forEach((sender) => sender.track?.stop());
            peerConnection.close();
            peerConnection = null;
        }
        callback();
    });
};



export default socket;
