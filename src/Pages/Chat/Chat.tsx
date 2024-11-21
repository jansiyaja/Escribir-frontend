import { useEffect, useState } from "react";

import axiosInstance from "../../services/Api/axiosInstance";
import MessagesHeader, { UserFollow } from "./SubComponenets/MessagesHeader";
import { ChatListItem } from "./SubComponenets/ChatList";
import ChatHeader from "./SubComponenets/ChatHeader";
import { UserDetailsModal } from "./SubComponenets/UserDetailsModal";
import ChatInterface from "./SubComponenets/ChatInterface";

import { AudioCallModal } from "./SubComponenets/AudioCallModal";


const Chat = () => {
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [selectedChat, setSelectedChat] = useState<UserFollow | null>(null);
  const [activeCall, setActiveCall] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [interactedUsers, setInteractedUsers] = useState<UserFollow[]>([]);


  
 
  useEffect(() => {
    const fetchInteractedUsers = async () => {
      try {
        const response = await axiosInstance.get("/chat/interacted", {
          withCredentials: true,
        });
        const friendsList = response.data.friendsList;

        console.log("res",response.data);
        

        const list = friendsList.map((user: UserFollow) => {
          
          const formattedDate = new Date(user.date).toLocaleDateString(
            "en-IN"
          );
    

          return {
            username: user.username,
            image: user.image,
            chatId:user.chatId,
            userId: user.userId,
            latestMessage: user.latestMessage || "", 
            date: formattedDate, 
          };
        });



        setInteractedUsers(list);
      } catch (error) {
        console.error("Error fetching interacted users:", error);
      }
    };

    fetchInteractedUsers();
  }, []);
  
  const filteredChats = interactedUsers.filter((chat) =>
    chat.username.toLowerCase().includes(searchTerm.toLowerCase())
  );



  const handleEndCall = () => {
    setActiveCall("");
  };

  const handleCreateGroup = (groupData: any) => {
    console.log("Group created:", groupData);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleUserSelect = (user: UserFollow) => {
    setSelectedChat(user);
    console.log(user);
  };

  const handleUserDetailsClick = () => {
    setShowUserDetails((prevState) => !prevState);
    console.log(showUserDetails);
  };

  return (
    <div className="flex h-screen bg-gray-100 m-5">
      <div className="w-80 bg-white border-r">
        <MessagesHeader
          onCreateGroup={handleCreateGroup}
          onSearch={handleSearch}
          onUserSelect={handleUserSelect}
        />

     <div className="overflow-y-auto h-full">
  {filteredChats.map((user) => (
    <ChatListItem
      key={user.userId}
      chat={{
        type: "individual",
        chatId:user.chatId,
        name: user.username,
        image: user.image, 
        lastMessage: user.latestMessage,
        date: user.date, 
      }}
      isSelected={selectedChat?.userId === user.userId}
      onClick={() => handleUserSelect(user)}
    />
  ))}
</div>

      </div>

      <div className="flex-1 flex flex-col">
        <ChatHeader
          selectedChat={selectedChat}
          onUserDetailsClick={handleUserDetailsClick}
     
        />

        {showUserDetails && selectedChat && (
          <UserDetailsModal
            user={selectedChat}
            onClose={() => setShowUserDetails(false)}
          />
        )}

      <ChatInterface receiver={selectedChat} />
       

        {activeCall === "audio" && selectedChat && (
          <AudioCallModal
            caller={{
              name: selectedChat.username || "",
              image: selectedChat.image || "",
            }}
            onEnd={handleEndCall}
          />
        )}

       
        
      </div>
    </div>
  );
};

export default Chat;
