import { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import axiosInstance from '../../services/Api/axiosInstance';
import useToast from '../../Components/UseToast';
import ToastComponent from '../../Components/ToastNotification';
import FollowCard from './FollowCard';

import { Notification } from '../../Interfaces/slice';
import { reciveReactionNotification } from '../../services/socketService';
import { acceptFollowRequest } from '../../services/Api/socialApi';
import { getallNotification, sendNotification } from '../../services/Api/userApi';
interface RealTimeNotification {
  message: string;
}


const NotificationPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const [realTimeNotifications, setRealTimeNotifications] = useState<RealTimeNotification[]>([]);


  const { showToast, setShowToast, toastMessage, toastType, triggerToast } = useToast();

  useEffect(() => {

    const handleReactionNotification = (notification: RealTimeNotification) => {
      setRealTimeNotifications((prev) => {

        if (prev.find((note) => note.message === notification.message)) {
          return prev;
        }
        return [...prev, notification];

      });
    };

    reciveReactionNotification(handleReactionNotification);

  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await getallNotification()
        setNotifications(response.data.notifications);
        console.log(response.data.notifications);
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  const handleAccept = async (authorId: string) => {
    try {
     
      const response = await acceptFollowRequest(authorId);
      if (response.status === 200) {
        triggerToast("Follow request accepted", "success");
       await sendNotification(authorId)

        setNotifications((prev) => prev.filter((n) => n._id !== authorId));
      }
    } catch (error) {
      triggerToast("Failed to accept the follow request", "error");
    }
  };

  const handleReject = async (notificationId: string) => {
    try {
      await axiosInstance.post(`/users/notifications/${notificationId}/reject`);
      setNotifications((prev) => prev.filter((n) => n._id !== notificationId));
    } catch (error) {
      console.error('Failed to reject the request:', error);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl rounded-lg shadow-sm ">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Bell className="mr-2" /> Notifications
      </h1>

      {realTimeNotifications.length > 0 ? (
        realTimeNotifications.map((note, index) => (
          <div key={index} className="mb-4 bg-white border border-gray-200 rounded-lg shadow-sm p-4">
            <p>{note.message}</p>
          </div>
        ))
      ) : (
        <p></p>
      )}

      {notifications.length === 0 ? (
        <div className="bg-gray-100 border border-gray-300 rounded-md p-4 text-gray-700">
          <p className="font-semibold">No new notifications</p>
          <p>You're all caught up! Check back later for new updates.</p>
        </div>
      ) : (
        <>
          {notifications.map((notification) => {
            const fromUserId = notification.fromUserId;
            return (
              <div key={notification._id} className="mb-4 flex items-center  p-4 ">
                {fromUserId ? (
                  <FollowCard
                    username={fromUserId.username}
                    image={fromUserId.image}

                    message={notification.message}
                  />
                ) : (
                  <div className="text-gray-500">Unknown User</div>
                )}

                {notification.message.includes('Requested to Follow You') && (
                  <div className="ml-auto flex space-x-2">
                    <button
                      onClick={() => handleAccept(fromUserId?._id)}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(notification._id)}
                      className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            );
          })}




        </>

      )}



      <ToastComponent open={showToast} setOpen={setShowToast} message={toastMessage} type={toastType} />
    </div>
  );
};

export default NotificationPage;
