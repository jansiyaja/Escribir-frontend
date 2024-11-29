



import Sidebar from "./subComponents/SideBar";
import UserForm from "./subComponents/UserForm";


const UserProfile = () => {
 

  return (
    <>
   
    <div className="flex flex-col lg:flex-row min-h-screen ">
      
        
        
       
          <Sidebar/>

         
          <div className="lg:w-2/3 p-2">
           <UserForm/>
            </div>
            
        </div>
    
   
    </>
  );
};

export default UserProfile;
