


import { useSelector } from "react-redux";
import Sidebar from "./subComponents/SideBar";
import UserForm from "./subComponents/UserForm";
import { RootState } from "../../redux/store/store";

const UserProfile = () => {
 
 const {darkMode}= useSelector((state:RootState)=>state.theme)
  return (
    <>
   
    <div className="flex flex-col lg:flex-row min-h-screen ">
      <div className={`flex flex-col lg:w-3/4 mx-auto p-8 shadow-md rounded-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-600'} `}>
        <h2 className={`text-3xl font-bold mb-6 text-center `}>Profile Settings</h2>
        <div className="flex flex-col lg:flex-row gap-8">
       
          <Sidebar/>

         
          <div className="lg:w-2/3 p-2">
           <UserForm/>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default UserProfile;
