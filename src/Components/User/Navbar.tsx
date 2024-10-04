import { IconButton } from "@radix-ui/themes";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../../redux/store/store";
import {
  HiOutlineHome,
  HiOutlineChatBubbleLeftEllipsis,
  HiOutlinePencilSquare,
  HiOutlineBell,
  HiOutlineCog8Tooth,
  HiPower,
  HiOutlineGlobeAlt,
  HiOutlineUserGroup,
  HiOutlinePhone,
} from "react-icons/hi2";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ToggleTheme from "../ToggleTheme";
import axiosInstance from "../../services/axiosInstance";
import { logout } from "../../redux/slices/authSlice";
import AvatarComponent from "../AvatarComponent";

const Navbar = () => {
  const { darkMode } = useSelector((state: RootState) => state.theme);
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await axiosInstance.post('/users/logout', {}, { withCredentials: true });
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  const isActive = (path: string) => {
    return location.pathname === path ? "text-blue-600" : darkMode ? 'text-white' : 'text-gray-600';
  };

  return (
    <div
      className={`h-screen w-16 flex flex-col justify-around items-center py-10 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}
    >
      <Link to="/profile">
        <div className="flex flex-col items-center space-y-4">
          <AvatarComponent size="md" src={user?.image} fallback={user?.username?.charAt(0)} />
        </div>
      </Link>

      <nav className="flex flex-col space-y-6">
        <Link to="/">
          <IconButton className={`p-2 rounded-lg hover:bg-gray-200 ${isActive('/')}`} variant="ghost">
            <HiOutlineHome className={`w-5 h-5 ${isActive('/')}`} />
          </IconButton>
        </Link>
        <Link to="/chat">
          <IconButton className={`p-2 rounded-lg hover:bg-gray-200 ${isActive('/chat')}`} variant="ghost">
            <HiOutlineChatBubbleLeftEllipsis className={`w-5 h-5 ${isActive('/chat')}`} />
          </IconButton>
        </Link>
        <Link to="/contacts">
          <IconButton className={`p-2 rounded-lg hover:bg-gray-200 ${isActive('/contacts')}`} variant="ghost">
            <HiOutlinePhone className={`w-5 h-5 ${isActive('/contacts')}`} />
          </IconButton>
        </Link>
        <Link to="/blog">
          <IconButton className={`p-2 rounded-lg hover:bg-gray-200 ${isActive('/blog')}`} variant="ghost">
            <HiOutlinePencilSquare className={`w-5 h-5 ${isActive('/blog')}`} />
          </IconButton>
        </Link>
        <Link to="/groups">
          <IconButton className={`p-2 rounded-lg hover:bg-gray-200 ${isActive('/groups')}`} variant="ghost">
            <HiOutlineUserGroup className={`w-5 h-5 ${isActive('/groups')}`} />
          </IconButton>
        </Link>
        <Link to="/global">
          <IconButton className={`p-2 rounded-lg hover:bg-gray-200 ${isActive('/global')}`} variant="ghost">
            <HiOutlineGlobeAlt className={`w-5 h-5 ${isActive('/global')}`} />
          </IconButton>
        </Link>
        <Link to="/notifications">
          <IconButton className={`p-2 rounded-lg hover:bg-gray-200 ${isActive('/notifications')}`} variant="ghost">
            <HiOutlineBell className={`w-5 h-5 ${isActive('/notifications')}`} />
          </IconButton>
        </Link>
        <Link to="/settings">
          <IconButton className={`p-2 rounded-lg hover:bg-gray-200 ${isActive('/settings')}`} variant="ghost">
            <HiOutlineCog8Tooth className={`w-5 h-5 ${isActive('/settings')}`} />
          </IconButton>
        </Link>
        <Link to="/logout">
          <IconButton className={`p-2 rounded-lg hover:bg-gray-200 ${isActive('/logout')}`} variant="ghost" onClick={handleLogout}>
            <HiPower className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-600'}`} />
          </IconButton>
        </Link>
      </nav>
      <ToggleTheme />
    </div>
  );
};

export default Navbar;
