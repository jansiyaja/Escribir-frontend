import React, { useEffect, useState } from "react";

import ChatList, { Follower } from "./SubComponenets/ChatList";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import ChatInterface from "./SubComponenets/ChatInterface";
import axiosInstance from "../../services/Api/axiosInstance";

export interface Receiver {
  username: string;
  image: string;
  userId: string;
}

const Chat: React.FC = () => {
  const [receiver, setReceiver] = useState<Receiver | null>(null);
  const [interactedUsers, setInteractedUsers] = useState<Follower[]>([]);
  const { darkMode } = useSelector((state: RootState) => state.theme);

  useEffect(() => {
    const fetchInteractedUsers = async () => {
      try {
        const response = await axiosInstance.get("/users/interacted", {
          withCredentials: true,
        });
        const friendsList = response.data.friendsList;
        console.log("ff", friendsList);

        const list = friendsList.map((user: Follower) => {
          return {
            username: user.username,
            image: user.image,
            userId: user.userId,
          };
        });

        setInteractedUsers(list);
      } catch (error) {
        console.error("Error fetching interacted users:", error);
      }
    };

    fetchInteractedUsers();
  }, []);

  return (
    <div
      className={`min-h-screen flex   ${darkMode ? "bg-gray-900" : "bg-gradient-to-r from-gray-100 to-blue-100"}`}
    >
      <ChatList onUserSelect={setReceiver} interactedUsers={interactedUsers} />

      <div className="w-3/5 flex-grow p-4 m-2 bg-white border ">
        <div className="flex-grow p-4 space-y-4 overflow-y-auto bg-gray-100">
          <ChatInterface receiver={receiver} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
