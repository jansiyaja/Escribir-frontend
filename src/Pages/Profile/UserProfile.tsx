
import Profile from './subComponents/Profile'
import Sidebar from './subComponents/SideBar'


const UserProfile = () => {
  return (
    <div>
        <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8 bg-gradient-to-r from-gray-100 to-blue-100">
 
       <Profile/>
      </div>
    </div>
    </div>
  )
}

export default UserProfile
