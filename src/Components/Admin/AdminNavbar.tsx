import { IconButton, Avatar } from "@radix-ui/themes";
import { useSelector,useDispatch } from "react-redux";
import { RootState } from "../../redux/store/store";
import axiosInstance from "../../services/Api/axiosInstance";

import {
  HiOutlineHome,
  HiOutlineDocument,
  HiOutlinePencilSquare,
  HiOutlineBell,
  HiOutlineCog8Tooth,
  HiPower,
  HiOutlineGlobeAlt,
  HiOutlineUserGroup,
  HiOutlineAcademicCap,

} from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";

import { adminLogout } from "../../redux/slices/adminSlice";

const AdminNavBar = () => {
  const { darkMode } = useSelector((state: RootState) => state.theme);
  const dispatch=useDispatch()
const navigate=useNavigate()

  const handleLogout = async () => {
    await axiosInstance.post('/admin/logout', {}, { withCredentials: true });
    dispatch(adminLogout());
    navigate("/adminLogin", { replace: true });
  };


  return (
    <div
      className={`h-screen w-16 flex flex-col justify-around items-center py-10 ${
        darkMode ? 'bg-gray-900' : 'bg-gray-100'
      }`}
    >
      <Link to="/profile">
        <div className="flex flex-col items-center space-y-4">
          <Avatar size="3" src="" fallback="A" />
        </div>
      </Link>

      <nav className="flex flex-col space-y-6">
        <Link to={'/adminDashBord'}>
        <IconButton className="p-2 rounded-lg hover:bg-gray-200" variant="ghost">
          <HiOutlineHome className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-600'}`} />
        </IconButton>
       </Link>
       
        <Link to={'/DashBord'}>
        <IconButton className="p-2 rounded-lg hover:bg-gray-200" variant="ghost">
          <HiOutlineAcademicCap className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-600'}`} />
        </IconButton>
       </Link>
       

        <Link to={'/tagList'}>
        <IconButton className="p-2 rounded-lg hover:bg-gray-200" variant="ghost">
          <HiOutlinePencilSquare className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-600'}`} />
        </IconButton>
        </Link>
        <Link to={'/repotedList'}>
        <IconButton className="p-2 rounded-lg hover:bg-gray-200" variant="ghost">
          <HiOutlineDocument className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-600'}`} />
        </IconButton>
        </Link>
        
        <IconButton className="p-2 rounded-lg hover:bg-gray-200" variant="ghost">
          <HiOutlineUserGroup className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-600'}`} />
        </IconButton>
        <IconButton className="p-2 rounded-lg hover:bg-gray-200" variant="ghost">
          <HiOutlineGlobeAlt className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-600'}`} />
        </IconButton>
        <IconButton className="p-2 rounded-lg hover:bg-gray-200" variant="ghost">
          <HiOutlineBell className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-600'}`} />
        </IconButton>
        <IconButton className="p-2 rounded-lg hover:bg-gray-200" variant="ghost">
          <HiOutlineCog8Tooth className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-600'}`} />
        </IconButton>
        <Link to="/adminLogout">
        <IconButton className="p-2 rounded-lg hover:bg-gray-200" variant="ghost"  onClick={handleLogout}>
          <HiPower className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-600'}`} />
        </IconButton>
        </Link>
      </nav>
     
    </div>
  );
};

export default AdminNavBar;
