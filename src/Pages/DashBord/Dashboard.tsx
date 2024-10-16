import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { useState } from "react";
import ProfileHeader from "./SubComponents/ProfileHeader";
import Blogs from "./SubComponents/Blogs";
import Followers from "./SubComponents/Followers";

import { Layout, Pen, Users,Bookmark  } from 'lucide-react';
import Saved from "./SubComponents/Saved";

const Dashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [currentView, setCurrentView] = useState<string>('Blogs');

  const sidebarItems = [
    { name: 'Blogs', icon: <Pen size={20} /> },
    { name: 'Connections', icon: <Users size={20} /> },
    { name: 'Saved', icon: <Bookmark size={20} /> },
   
  ];

  const renderContent = () => {
    switch (currentView) {
      case 'Blogs':
        return <Blogs authorId={user?._id || 'default'} />
      case 'Connections':
        return <Followers />;
     case 'Saved':
      return <Saved/>
      default:
        return <div className="text-gray-500">Select a category from the sidebar.</div>;
    }
  };

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
            <ProfileHeader
              username={user?.username}
              bio={user?.bio}
              imageUrl={user?.image}
            />
          </div>
        </div>

     
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
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-150 ${
                        currentView === item.name
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <span className={currentView === item.name ? 'text-blue-500' : 'text-gray-400'}>
                        {item.icon}
                      </span>
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
                  {currentView === 'Connections' && 'People who follow you'}
                  {currentView === 'Saved' && 'Your saved Post'}
                 
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                {renderContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;