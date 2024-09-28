import { IconButton, Avatar } from "@radix-ui/themes";
import { useSelector } from "react-redux";
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
import { Link } from "react-router-dom";
import ToggleTheme from "../ToggleTheme";

const Navbar = () => {
  const { darkMode } = useSelector((state: RootState) => state.theme);
  const {user} = useSelector((state:RootState)=>state.auth)

  return (
    <div
      className={`h-screen w-16 flex flex-col justify-around items-center py-10 ${
        darkMode ? 'bg-gray-900' : 'bg-gray-100'
      }`}
    >
      <Link to="/profile">
        <div className="flex flex-col items-center space-y-4">
          <Avatar size="3" src={user?.image} fallback="A" />
        </div>
      </Link>

      <nav className="flex flex-col space-y-6">
        <Link to="/">
          <IconButton className="p-2 rounded-lg hover:bg-gray-200" variant="ghost">
            <HiOutlineHome className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-600'}`} />
          </IconButton>
        </Link>
        <Link to="/chat">
          <IconButton className="p-2 rounded-lg hover:bg-gray-200" variant="ghost">
            <HiOutlineChatBubbleLeftEllipsis className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-600'}`} />
          </IconButton>
        </Link>
        <Link to="/contacts">
          <IconButton className="p-2 rounded-lg hover:bg-gray-200" variant="ghost">
            <HiOutlinePhone className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-600'}`} />
          </IconButton>
        </Link>
        <Link to="/blog">
          <IconButton className="p-2 rounded-lg hover:bg-gray-200" variant="ghost">
            <HiOutlinePencilSquare className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-600'}`} />
          </IconButton>
        </Link>
        <Link to="/groups">
          <IconButton className="p-2 rounded-lg hover:bg-gray-200" variant="ghost">
            <HiOutlineUserGroup className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-600'}`} />
          </IconButton>
        </Link>
        <Link to="/global">
          <IconButton className="p-2 rounded-lg hover:bg-gray-200" variant="ghost">
            <HiOutlineGlobeAlt className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-600'}`} />
          </IconButton>
        </Link>
        <Link to="/notifications">
          <IconButton className="p-2 rounded-lg hover:bg-gray-200" variant="ghost">
            <HiOutlineBell className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-600'}`} />
          </IconButton>
        </Link>
        <Link to="/settings">
          <IconButton className="p-2 rounded-lg hover:bg-gray-200" variant="ghost">
            <HiOutlineCog8Tooth className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-600'}`} />
          </IconButton>
        </Link>
        <Link to="/logout">
          <IconButton className="p-2 rounded-lg hover:bg-gray-200" variant="ghost">
            <HiPower className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-600'}`} />
          </IconButton>
        </Link>
      </nav>
      <ToggleTheme />
    </div>
  );
};

export default Navbar;
