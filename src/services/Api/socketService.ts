
import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_API_BASE_URL);

export const loginUser = (userId: string) => {
    socket.emit('login', userId); 
    console.log(`User logged in with ID: ${userId}`);
};


export const sendFollowNotification = (followerId: string, followedId: string) => {
    socket.emit('follow', { followerId, followedId });
};

export const subscribeToNotifications = (callback: (notification: any) => void) => {
    socket.on('receive_notification', callback);  
};;

export const unsubscribeFromNotifications = () => {
    socket.off('notification');
};

export default socket;
