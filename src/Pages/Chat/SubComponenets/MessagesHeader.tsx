import { useEffect, useState } from "react";
import { CreateGroupModal } from "./GroupModel";
import { Search, Users } from "lucide-react";
import axiosInstance from "../../../services/Api/axiosInstance";

export interface UserFollow {
  chatId:string,
  userId: string;
  username: string;
     image: string;
     latestMessage: string;
     date:string

}


interface MessagesHeaderProps {
  onCreateGroup: (data: any) => void;
  onSearch: (query: string) => void;
  onUserSelect: (user: UserFollow) => void;
}

const MessagesHeader = ({ onCreateGroup, onSearch, onUserSelect }: MessagesHeaderProps) => {
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<UserFollow[]>([]);

  const handleCreateGroup = (data: any) => {
    onCreateGroup(data);
    setShowCreateGroup(false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get(`/social/follows/search?query=${searchQuery}`);
        const usersData = response.data.users || [];
        
        const formattedUsers: UserFollow[] = usersData.map((user: any) => ({
          userId: user.follower._id,
          username: user.follower.username,
          image: user.follower.image,
        }));
        
        setUsers(formattedUsers);
        console.log("Fetched users:", formattedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    if (searchQuery) {
      fetchUsers(); 
    }
  }, [searchQuery]);

  return (
    <div className="p-4 border-b">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold">Messages</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowCreateGroup(true)}
            className="p-2 hover:bg-gray-100 rounded-full text-gray-600 hover:text-gray-900"
            title="Create Group"
          >
            <Users className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search messages"
          className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
        />
      </div>

      {showCreateGroup && (
        <CreateGroupModal
          isOpen={showCreateGroup}
          onClose={() => setShowCreateGroup(false)}
          onCreateGroup={handleCreateGroup}
        />
      )}

      <div className="mt-4">
        {users.length > 0 ? (
          users.map((user) => (
            <div
              key={user.userId}
              className="flex items-center p-4 hover:bg-gray-50 cursor-pointer transition-colors duration-150"
              onClick={() => onUserSelect(user)}
            >
              <img
                src={user.image}
                alt={user.username}
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1 ml-4">
                <h3 className="font-semibold text-gray-800">{user.username}</h3>
              </div>
            </div>
          ))
        ) : (
         <p></p>
        )}
      </div>
    </div>
  );
};

export default MessagesHeader;
