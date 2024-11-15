import { Bell, UserX, PhoneCall, VideoIcon, X } from "lucide-react";
import { useState } from "react";

export const UserDetailsModal = ({ user, onClose }: any) => {
 
  const [callHistory] = useState([
    { 
      id: 1, 
      type: 'audio',
      duration: '5:23',
      date: '2024-03-10',
      time: '14:30',
      status: 'outgoing' 
    },
    { 
      id: 2, 
      type: 'video',
      duration: '12:45',
      date: '2024-03-09',
      time: '11:20',
      status: 'incoming' 
    },
    { 
      id: 3, 
      type: 'audio',
      duration: '3:12',
      date: '2024-03-09',
      time: '09:15',
      status: 'missed' 
    }
  ]);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed bg-black/20 flex justify-center items-center w-full h-full ">
      <div className="w-80 bg-white shadow-lg h-auto animate-slide-left">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="font-semibold">Contact Info</h2>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-4 flex flex-col items-center space-y-4 border-b">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
              <img
                src={user.image}
                alt={user.username}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <h3 className="font-semibold text-xl">{user.username}</h3>

          <div className="flex space-x-4 pt-2">
            <button className="flex items-center space-x-2 text-red-500 hover:text-red-600">
              <UserX className="w-4 h-4" />
              <span>Block</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800">
              <Bell className="w-4 h-4" />
              <span>Mute</span>
            </button>
          </div>
        </div>

        <div className="p-4">
          <h4 className="font-medium text-gray-900 mb-3">Call History</h4>
          <div className="space-y-3">
            {callHistory.map((call) => (
              <div key={call.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${call.status === 'missed' ? 'bg-red-100' : 'bg-gray-100'}`}>
                    {call.type === 'audio' ? (
                      <PhoneCall className={`w-4 h-4 ${call.status === 'missed' ? 'text-red-500' : 'text-gray-600'}`} />
                    ) : (
                      <VideoIcon className={`w-4 h-4 ${call.status === 'missed' ? 'text-red-500' : 'text-gray-600'}`} />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm ${call.status === 'missed' ? 'text-red-500' : 'text-gray-900'}`}>
                        {call.status === 'incoming' ? 'Incoming' : call.status === 'outgoing' ? 'Outgoing' : 'Missed'}
                      </span>
                      <span className="text-xs text-gray-500">{call.duration}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {formatDate(call.date)} at {call.time}
                    </div>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <PhoneCall className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
