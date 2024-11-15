import { Bell, Phone, Video } from "lucide-react";

export const VideoCallModal = ({
  localStream,
  remoteStream,
  onEnd,
}: {
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  onEnd: () => void;
}) => (
  <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
    <div className="relative w-full h-full sm:w-[80%] sm:h-[80%] md:w-[60%] md:h-[60%] lg:w-[50%] lg:h-[50%] bg-black rounded-lg">
      
      {/* Remote Video */}
      <div className="absolute inset-0 bg-gray-800 flex items-center justify-center m-5">
        <video
          autoPlay
          ref={(video) => {
            if (video && remoteStream) {
              video.srcObject = remoteStream;
            }
          }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Local Video */}
      <div className="absolute bottom-4 right-4 w-48 h-36 bg-gray-100 rounded-lg overflow-hidden m-3">
        <video
          autoPlay
          muted
          ref={(video) => {
            if (video && localStream) {
              video.srcObject = localStream;
            }
          }}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 bg-gray-900 bg-opacity-50 p-4 rounded-lg">
        <button className="p-4 bg-gray-700 rounded-full hover:bg-gray-600">
          <Video className="w-6 h-6 text-white" />
        </button>
        <button className="p-4 bg-gray-700 rounded-full hover:bg-gray-600">
          <Bell className="w-6 h-6 text-white" />
        </button>
        <button
          className="p-4 bg-red-500 rounded-full hover:bg-red-600"
          onClick={onEnd}
        >
          <Phone className="w-6 h-6 text-white transform rotate-135" />
        </button>
      </div>
    </div>
  </div>
);
