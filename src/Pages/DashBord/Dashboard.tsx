import { useSelector } from "react-redux";
import ProfileHeader from "./SubComponents/ProfileHeader";
import { RootState } from "../../redux/store/store";
import { useState } from "react";
import Blogs from "./SubComponents/Blogs";
import Followers from "./SubComponents/Followers";
import Following from "./SubComponents/Following";

const Dashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const [currentView, setCurrentView] = useState<string>('Blogs'); 

  const sidebarItems: string[] = ['Blogs', 'Followers', 'Following'];


  const renderContent = () => {
    switch (currentView) {
      case 'Blogs':
        return (
          <div className="p-4">
            <Blogs />
          </div>
        );
      case 'Followers':
        return (
          <div className="p-4">
            <Followers />
          </div>
        );
      case 'Following':
        return (
          <div className="p-4">
            <Following />
          </div>
        );
      default:
        return <div className="p-4">Select a category from the sidebar.</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 flex flex-col items-center">
      <div className="p-6 w-full max-w-4xl">
        <ProfileHeader
          username={user?.username}
          bio={user?.bio}
          imageUrl={user?.image}
        />

      </div>

      <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-lg">
    
        <div className="w-1/4 p-4 bg-gray-100 border-r border-gray-300">
          <ul className="space-y-4">
            {sidebarItems.map((item) => (
              <li
                key={item}
                className={`cursor-pointer p-2 rounded ${
                  currentView === item ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
                }`}
                onClick={() => setCurrentView(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

    
        <div className="w-3/4 p-4">
          {renderContent()} 
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
