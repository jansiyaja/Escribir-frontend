import { useEffect, useState } from "react";
import ProfileHeader from "./SubComponents/ProfileHeader";
import Blogs from "./SubComponents/Blogs";

import { Layout, Pen } from 'lucide-react';
import { useParams } from "react-router-dom";
import axiosInstance from "../../services/Api/axiosInstance";
import { CreativeBlogLoading } from "../../Components/Fallback";
import { User } from "../../Interfaces/slice";
import { handleAxiosError } from "../../utils/errorHandling";
import useToast from "../../Components/Hooks/UseToast";
import ToastComponent from "../../Components/ToastNotification";
import { sendFollowNotification } from "../../services/Api/socketService";

const Conections = () => {
    const { authorId } = useParams<{ authorId: string }>();
    const [loading, setLoading] = useState<boolean>(true);
    const [currentView, setCurrentView] = useState<string>('Blogs');
    const [user, setUser] = useState<User>();
    const [isFollowing, setIsFollowing] = useState<string>('follow');
    const [isMutualFollowing, setIsMutualFollowing] = useState<boolean>(false);
    const { showToast, setShowToast, toastMessage, toastType, triggerToast } = useToast();

    const sidebarItems = [
        { name: 'Blogs', icon: <Pen size={20} /> },
      
    ];
const userId=user?._id
    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance.get(`/users/connectionProfile/${authorId}`, { withCredentials: true });
                setUser(response.data.user);
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [authorId]);

 
    const fetchFollowStatus = async () => {
        try {
            const response = await axiosInstance.get(`/users/followStatus/${authorId}`, { withCredentials: true });
            setIsFollowing(response.data.followStatus);
            console.log("Follow status updated:", response.data.followStatus);
        } catch (error) {
            console.error("Failed to fetch follow status:", error);
        }
    };
    
   
    useEffect(() => {
        if (authorId) {
            fetchFollowStatus();
        }
    }, [authorId]);

    const handleFollow = async () => {
        if (!authorId) {
            console.log("Auther Id is required");
            
            return;
        }
         if (!userId) {
            console.log("Auther Id is required");
            
            return;
        }
        try {
            const response = await axiosInstance.post(`users/follow/${authorId}`, {}, { withCredentials: true });
            if (response.status === 200) {
                triggerToast("Sent follow request", "success");
                fetchFollowStatus(); 
                setIsMutualFollowing(response.data.followStatus)
                sendFollowNotification(userId, authorId);
            }
        } catch (error) {
            const errorMessage = handleAxiosError(error);
            triggerToast(errorMessage, "error");
            console.error(errorMessage);
        }
    };

    
    const handleUnfollow = async () => {
        try {
            const response = await axiosInstance.post(`users/unfollow/${authorId}`, {}, { withCredentials: true });
            if (response.status === 200) {
                triggerToast("Unfollowed successfully", "success");
                fetchFollowStatus(); 
            }
        } catch (error) {
            const errorMessage = handleAxiosError(error);
            triggerToast(errorMessage, "error");
            console.error(errorMessage);
        }
    };

  
    const renderContent = () => {
        switch (currentView) {
            case 'Blogs':
                return <Blogs authorId={authorId || 'defaultAuthorId'} />;
           
            default:
                return <div className="text-gray-500">Select a category from the sidebar.</div>;
        }
    };

 
    if (loading) {
        return (
            <div className="space-y-8">
                <CreativeBlogLoading>Preparing Your Writing Canvas</CreativeBlogLoading>
                <CreativeBlogLoading className="bg-gray-50" subtitle="Collecting brilliant ideas..." animationDuration={4}>
                    Gathering Inspiration
                </CreativeBlogLoading>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg mb-8 overflow-hidden">
                    <div className="relative h-32 bg-gradient-to-r from-blue-500 to-purple-600">
                        <div className="absolute -bottom-16 left-8">
                            <img
                                src={user?.image || '/api/placeholder/100/100'}
                                alt={user?.username}
                                className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                            />
                        </div>
                    </div>
                    <div className="pt-20 pb-6 px-8">
                        <ProfileHeader username={user?.username} bio={user?.bio} imageUrl={user?.image} />
                        <div className="mt-4">
                            {isFollowing === "following" ? (
                                <button
                                    onClick={handleUnfollow}
                                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                                >
                                    Unfollow
                                </button>
                            ) : isFollowing === 'requested' ? (
                                <button
                                    className="px-4 py-2 bg-gray-500 text-white rounded-lg cursor-not-allowed"
                                    disabled
                                >
                                    Follow Requested
                                </button>
                            ) : (
                                <button
                                    onClick={handleFollow}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                                >
                                    Follow
                                </button>
                            )}
                        </div>
                        {isMutualFollowing && (
                            <div className="mt-2 text-sm text-green-500">
                                You are mutually following each other!
                            </div>
                        )}
                    </div>
                </div>

                {isFollowing ? (
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                        <div className="flex">
                            <div className="w-64 border-r border-gray-200">
                                <div className="p-4">
                                    <div className="flex items-center space-x-2 mb-6">
                                        <Layout className="text-blue-500" size={24} />
                                        <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
                                    </div>
                                    <nav>
                                        {sidebarItems.map((item) => (
                                            <button
                                                key={item.name}
                                                onClick={() => setCurrentView(item.name)}
                                                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-150 ${currentView === item.name ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                                                    }`}>
                                                <span className={currentView === item.name ? 'text-blue-500' : 'text-gray-400'}>{item.icon}</span>
                                                <span className="font-medium">{item.name}</span>
                                            </button>
                                        ))}
                                    </nav>
                                </div>
                            </div>
                            <div className="flex-1 p-8">
                                <div className="mb-6">
                                    <h1 className="text-2xl font-bold text-gray-800">{currentView}</h1>
                                    <p className="text-gray-500">
                                        {currentView === 'Blogs' && 'Manage and view your blog posts'}
                                       
                                    </p>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-6">{renderContent()}</div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-center text-gray-500 mt-4">Follow each other to see more content.</p>
                )}

                <ToastComponent
                    open={showToast}
                    setOpen={setShowToast}
                    message={toastMessage}
                    type={toastType}
                />
            </div>
        </div>
    );
};

export default Conections;
