import { useEffect, useState } from "react";
import axiosInstance from "../../../services/Api/axiosInstance";
import ToastComponent from "../../../Components/ToastNotification";
import useToast from "../../../Components/Hooks/UseToast";

import FollowerCard from "../../Common/FollowCard";

interface Follower {
  _id: string;
  follower: {
    _id: string;
    username: string;
    image?: string;
  };
  following: string;
  createdAt: string;
}

const Followers = () => {
  const [followers, setFollower] = useState<Follower[]>([]);
  const { showToast, setShowToast, toastMessage, toastType, triggerToast } = useToast();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get("/users/getFollowers", { withCredentials: true });
        if (response.status === 200) {
          setFollower(response.data);
          triggerToast("Fetching successfully", "success");
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        triggerToast("Failed to fetch user data", "error");
        setShowToast(true);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      {followers.length === 0 ? (
        <div className="bg-gray-100 border border-gray-300 rounded-md p-4 text-gray-700">
          <p className="font-semibold">No new followers</p>
          <p>You're all caught up! Check back later for new updates.</p>
        </div>
      ) : (
        followers.map((follow) => (
          <FollowerCard
            key={follow._id}
            username={follow.follower.username}
            image={follow.follower.image}
            createdAt={follow.createdAt}
          />
        ))
      )}
      <ToastComponent open={showToast} setOpen={setShowToast} message={toastMessage} type={toastType} />
    </div>
  );
};

export default Followers;
