import { User } from "lucide-react";
interface ChatListItemProps {
  chat: {
    type: string;
    name: string;
    image: string; // Add image property
    lastMessage: string;
    date: string;
    chatId:string
  };
  isSelected: boolean;
  onClick: () => void;
}


export const ChatListItem = ({ chat, isSelected, onClick }: ChatListItemProps) => {
 
  
  return (
    <div className="chat-list">
      <div
        className={`p-4 hover:bg-gray-50 cursor-pointer ${isSelected ? "bg-blue-50" : ""}`}
        onClick={onClick}
      >
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
            {chat.image ? (
              <img src={chat.image} alt={`${chat.name}'s avatar`} className="w-full h-full object-cover" />
            ) : (
              <User className="text-gray-600" />
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-medium">{chat.name}</h3>
            <p className="text-sm text-gray-500">{chat.lastMessage}</p>
          </div>
          <span className="text-xs text-gray-400">{chat.date||"default"}</span>
        </div>
      </div>
    </div>
  );
};

