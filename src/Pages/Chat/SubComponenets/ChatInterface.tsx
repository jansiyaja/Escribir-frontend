import React, { useState, useEffect } from "react";
import { Send, Smile, Paperclip } from "lucide-react";
import { Message, RawMessage } from "../../../Interfaces/Components";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import axiosInstance from "../../../services/Api/axiosInstance";

import socket, {
  ReciveNewMessage,
  SendNewMessage,

  loginUser,

} from "../../../services/socketService";
import EmojiPicker from "./EmojiPicker";
import { UserFollow } from "./MessagesHeader";

export interface ChatProps {
  receiver: UserFollow | null;
}

const ChatInterface: React.FC<ChatProps> = ({ receiver }) => {
  const currentReceiver = receiver || {
    username: "",
    image: "",
    userId: "",
    chatId:""
  };

  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [chatId, setChatId] = useState<string | null>(null);
  const { user } = useSelector((state: RootState) => state.auth);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  
  const [typingStatus, setTypingStatus] = useState(false); 
  


  const recieverId = currentReceiver.userId;

  

  useEffect(() => {
    if (user?.username) {
      setUsername(user.username);
      loginUser({ userId: user._id, username: user.username });
    }
  }, [user]);

  useEffect(() => {
    if (recieverId) {
      console.log("chatId",chatId);
      
      const fetchMessages = async () => {
        try {
          const response = await axiosInstance.get(
            `chat/messages/${currentReceiver.chatId}`,
            { withCredentials: true }
          );
          const messagesArray: RawMessage[] = Array.isArray(response.data)
            ? response.data
            : response.data.messages;

          const fetchedMessages: Message[] = messagesArray.map(
            (msg: RawMessage) => ({
              _id: msg.Sender_id._id,
              username: msg.Sender_id?.username || "Unknown User",
              message: msg.Content || "",
              image: msg.Sender_id?.image || "",
              timestamp: new Date(msg.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
              status: msg.ReadBy ? "read" : "delivered",
            })
          );
          console.log(fetchedMessages);

          setMessages(fetchedMessages);
        } catch (error) {
          console.error("Error fetching messages:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchMessages();
    }
  }, [recieverId]);

  useEffect(() => {
    const handleReactionNotification = (newMessage: Message) => {
      setMessages((prevMessages) => {
        const messageExists = prevMessages.some(
          (prevMessage) => prevMessage.message === newMessage.message
        );

        if (messageExists) return prevMessages;

        return [...prevMessages, newMessage];
      });
    };

    ReciveNewMessage(handleReactionNotification);
 
  }, []);

  const sendMessage = async () => {
    if (message.trim() && username) {
      let currentChatId = chatId;
      if (!currentChatId) {
        currentChatId = await createNewChat();
      }
      if (currentChatId && recieverId) {
        const newMessage: Message = {
          _id: recieverId,
          username,
          message: message.trim(),
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          status: "sent",
        };

        setMessages((prevMessages) => [...prevMessages, newMessage]);

        try {
          await axiosInstance.post(
            `/chat/messages/${currentChatId}`,
            newMessage,
            { withCredentials: true }
          );
          SendNewMessage(newMessage, recieverId);
        } catch (error) {
          console.error("Error sending message:", error);
        }

        setMessage("");

    
      }
    }
  };

  const createNewChat = async () => {
    try {
      const response = await axiosInstance.post(
        `/chat/newChat/${recieverId}`,
        { withCredentials: true }
      );
      const newChatId = response.data.chat._id;
      setChatId(newChatId);
      return newChatId;
    } catch (error) {
      console.error("Error creating new chat:", error);
    }
    return null;
  };

 

  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prev) => !prev);
  };
  const handleEmojiSelect = (emoji: string) => {
    setMessage((prevMessage) => prevMessage + emoji);
    setShowEmojiPicker(false);
  };

const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
  const inputValue = e.target.value;
  setMessage(inputValue);

  if (inputValue) {
    
    socket.emit("typing", { receiverId: recieverId });
  } else {
   
    socket.emit("stop-typing", { receiverId: recieverId });
  }
};
useEffect(() => {
  socket.on("typing-status", (data) => {
   
    if (data.receiverId === user?._id) {
    
      
      setTypingStatus(data.isTyping); 
    }
  });

  return () => {
    socket.off("typing-status");
  };
}, [recieverId]);

  return (
    <div className="flex flex-col h-screen max-h-[800px] bg-white rounded-lg shadow-lg">
   
      <div className="flex-grow p-4 space-y-4 overflow-y-auto bg-gray-50">
        {loading ? (
          <p>Loading messages...</p>
        ) : messages.length === 0 ? (
          <p className="text-center text-gray-500">
            No messages yet. Start the conversation!
          </p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.username === username ? "justify-end" : "justify-start"}`}
            >
              <div className="flex max-w-[70%] items-end space-x-2">
                {msg.username !== username && (
                  <img
                    src={
                      currentReceiver.image || "https://via.placeholder.com/158"
                    }
                    alt={`${msg.username}'s profile`}
                    className="w-10 h-10 rounded-full"
                  />
                )}
                {msg.username === username && (
                  <img
                    src={user?.image || "https://via.placeholder.com/150"}
                    alt={`${msg.username}'s profile`}
                    className="w-10 h-10 rounded-full"
                  />
                )}
                <div
                  className={`p-3 rounded-lg ${msg.username === username ? "bg-blue-500 text-white rounded-br-none ml-auto" : "bg-gray-200 text-gray-800 rounded-bl-none"}`}
                  style={{ maxWidth: "80%" }}
                >
                  <p className="text-md">{msg.message}</p>
                  <div className="flex justify-between items-center mt-1 text-xs text-blue-900">
                    <span>{msg.timestamp}</span>
                    {msg.username === username && (
                      <span>
                        {msg.status === "read"
                          ? "✓✓"
                          : msg.status === "delivered"
                            ? "✓"
                            : ""}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
     
      </div>

      <div className="p-4 border-t bg-white">
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleEmojiPicker}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <Smile className="w-5 h-5 text-gray-600" />
          </button>
          {showEmojiPicker && <EmojiPicker onSelect={handleEmojiSelect} />}
          <button inlist="file" className="p-2 hover:bg-gray-100 rounded-full">
            <Paperclip className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex-grow">
              {typingStatus && <p>{receiver?.username} is typing...</p>}
            <input
              type="text"
              value={message}
               onChange={handleTyping}
              
              placeholder="Type a message..."
              className="w-full p-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
          </div>
          <button
            onClick={sendMessage}
            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-200"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;