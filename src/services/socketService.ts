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



// export const startCall = async (receiverId: string|undefined, callType: 'audio' | 'video') => {
//     peerConnection = new RTCPeerConnection(configuration);

//     const mediaStream = await navigator.mediaDevices.getUserMedia({
//         audio: true,
//         video: callType === 'video',
//     });

//     mediaStream.getTracks().forEach((track) => {
//         console.log(track,mediaStream);
        
//         peerConnection?.addTrack(track, mediaStream);
//         console.log("added track successfully");
        
//     });

//     peerConnection.onicecandidate = (event) => {
//         if (event.candidate) {
//             socket.emit('ice-candidate', { receiverId, candidate: event.candidate });
//         }
//     };

//     const offer = await peerConnection.createOffer();
//     await peerConnection.setLocalDescription(offer);
//     socket.emit('call-user', { receiverId, offer, callType });
// };


// export const receiveCall = (callback: (callInfo: { from: any; callType: 'audio' | 'video' }) => void) => {
//     socket.on('receive-call', async ({ from, offer, callType }) => {
//         callback({ from, callType });
//         peerConnection = new RTCPeerConnection(configuration);

//         peerConnection.onicecandidate = (event) => {
//             if (event.candidate) {
//                 socket.emit('ice-candidate', { receiverId: from.userId, candidate: event.candidate });
//             }
//         };

//         const mediaStream = await navigator.mediaDevices.getUserMedia({
//             audio: true,
//             video: callType === 'video',
            
//         });
//         console.log("Local audio track:", mediaStream.getAudioTracks());
//         mediaStream.getTracks().forEach((track) => {
//               console.log(track,mediaStream);
//              console.log("recived track successfully");
//             peerConnection?.addTrack(track, mediaStream);
//         });

//         await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
//         const answer = await peerConnection.createAnswer();
//         await peerConnection.setLocalDescription(answer);
//         socket.emit('answer-call', { to: from.userId, answer });
//     });
// };


// export const handleCallAnswered = () => {
//     socket.on('call-answered', async ({ answer }) => {
//         console.log(`Call answered received:`, answer);
//         if (peerConnection) {
//             await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
//         }
//     });
// };

// export const handleIceCandidate = () => {
//     socket.on('ice-candidate', ({ candidate }) => {
//         if (peerConnection) {
//             peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
//         }
//     });
// };





type CallType = "audio" | "video";
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
      offerToReceiveVideo: callType === "video",
    });
    await peerConnection.setLocalDescription(offer);

    socket.emit("call-user", { receiverId, callType,offer });
  } catch (error) {
    console.error("Error starting call:", error);
  }
};


export const receiveCall = (callback: (callInfo: CallInfo) => void) => {
  socket.on("receive-call", async ({ from, offer, callType }: CallInfo) => {
    const peerConnection = new RTCPeerConnection();
    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", { candidate: event.candidate });
      }
    };

   

    await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    console.log("Sending call answer:", answer);
    socket.emit("call-answer", { answer });

    callback({ from, offer, callType });
  });
};


export const handleCallAnswered = (peerConnection: RTCPeerConnection) => {
  socket.on("call-answered", async ({ answer }: { answer: RTCSessionDescriptionInit }) => {
    if (peerConnection) {
      await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
    }
  });

  // Send answer back to caller
  peerConnection.onnegotiationneeded = async () => {
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    socket.emit("call-answer", { answer });
  };
};



export const endCall = () => {
   
     if (peerConnection && peerConnection.getSenders) {
        peerConnection.getSenders().forEach(sender => {
            sender.track?.stop();
        });
    }

   
    if (peerConnection) {
        peerConnection.close();
        peerConnection = null;
    }
};



export default socket;
