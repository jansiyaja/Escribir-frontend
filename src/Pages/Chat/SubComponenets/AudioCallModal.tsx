import { Bell, Phone, Video } from "lucide-react";

 export  const AudioCallModal = ({ caller, onEnd }:any) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white rounded-lg p-8 max-w-md w-full">
      <div className="flex flex-col items-center space-y-6">
        <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center">
          <span className="text-4xl">{caller.name[0]}</span>
        </div>
        <div className="text-center">
          <h3 className="text-xl font-semibold">{caller.name}</h3>
          <p className="text-gray-500">Audio Call</p>
        </div>
        <div className="flex space-x-4">
          <button className="p-4 bg-gray-200 rounded-full hover:bg-gray-300">
            <Bell className="w-6 h-6" />
          </button>
          <button className="p-4 bg-gray-200 rounded-full hover:bg-gray-300">
            <Video className="w-6 h-6" />
          </button>
          <button className="p-4 bg-red-500 rounded-full hover:bg-red-600 text-white"
                  onClick={onEnd}>
            <Phone className="w-6 h-6 transform rotate-135" />
          </button>
        </div>
        <div className="text-gray-500">
          00:00
        </div>
      </div>
    </div>
  </div>
);