import { useState, useEffect } from "react";
import { Search, MoreVertical } from "lucide-react";
import axiosInstance from "../../../services/Api/axiosInstance";
import { Receiver } from "../Chat";
import { RecieveMsgNotifications } from "../../../services/Api/socketService";

export interface Follower {
  userId: string;
  username: string;
  image: string;
}

interface ChatListProps {
  onUserSelect: (user: Receiver) => void;
  interactedUsers: Follower[];
}

const ChatList: React.FC<ChatListProps> = ({
  onUserSelect,
  interactedUsers,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<Follower[]>(interactedUsers);
  const [notifactionCount, setNotificationCount] = useState("");

  useEffect(() => {
    RecieveMsgNotifications((newCount) => {
      console.log("Setting notification count:", newCount);
      setNotificationCount(newCount);
    });
  }, [notifactionCount]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get(
          `/users/follows/search?query=${searchQuery}`
        );
        const reusers = response.data.users;
        console.log(reusers);

        const list = reusers.map((user: any) => {
          return {
            userId: user.follower._id,
            username: user.follower.username,
            image: user.follower.image,
          };
        });
        setUsers(list);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };

    if (searchQuery) {
      fetchUsers();
    } else {
      setUsers(interactedUsers);
    }
  }, [searchQuery, interactedUsers]);

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-lg m-2">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold text-gray-800">Messages</h2>
      </div>

      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="overflow-y-auto max-h-[600px]">
        {users.length > 0 ? (
          users.map((user, index) => (
            <div
              key={index}
              className="flex items-center p-4 hover:bg-gray-50 cursor-pointer border-b transition-colors duration-150"
              onClick={() => onUserSelect(user)}
            >
              <div className="relative">
                <img
                  src={user.image}
                  alt={user.username}
                  className="w-12 h-12 rounded-full"
                />
              </div>
              <div className="flex-1 ml-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-gray-800">
                    {user.username}
                  </h3>

                  <div className="flex items-center">
                    <button className="ml-2 text-gray-400 hover:text-gray-600">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="p-4 text-gray-500">No users found</p>
        )}
      </div>
    </div>
  );
};

export default ChatList;
