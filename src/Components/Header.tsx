import { Search } from "lucide-react";
import darkLogo from "../assets/Images/LogoB.svg";
import lightLogo from "../assets/Images/Logo.svg";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store/store";
import { logout } from "../redux/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, IconButton, Popover } from "@radix-ui/themes";
import { HiListBullet, HiOutlineBell, HiOutlinePencilSquare, HiXMark } from "react-icons/hi2";
import { useState } from "react";
import { useSearch } from "../Contexts/SearchContext";
import DashBoardSideBar from "./User/DashBoardSideBar";
import ToggleTheme from "./ToggleTheme";
import { Feature } from "../Interfaces/Components";
import { userLogout } from "../services/Api/userApi";


const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const { darkMode } = useSelector((state: RootState) => state.theme);
  const { setSearchTerm } = useSearch();

  const [menuOpen, setMenuOpen] = useState(false);
  const currentView = location.pathname.split("/")[1] || "dashboard";

  const handleLogout = async () => {
    await userLogout()
    dispatch(logout());
    navigate("/logout", { replace: true });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const sidebarFeatures: Record<string, Feature[]> = {
    dashboard: [
      { label: "Dashboard", path: "/dashboard" },
      { label: "Settings", path: "/profile" },
    ],
  };

  return (
    <div className={`w-full border-b top-0 sticky z-50 ${darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"}`}>
      <nav className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex-shrink-0">
              <img src={darkMode ? darkLogo : lightLogo} alt="Logo" className="h-10" />
            </Link>

          
            <div className="md:hidden">
              <IconButton onClick={() => setMenuOpen(!menuOpen)} variant="ghost">
                {menuOpen ? <HiXMark className="w-6 h-6 text-gray-800" /> : <HiListBullet className="w-6 h-6 text-gray-800" />}
              </IconButton>
            </div>

         
            <div className={`hidden md:flex items-center space-x-6 ${darkMode ? "text-gray-200" : "text-gray-600"}`}>
              <Link to="/" className="hover:text-gray-400">Home</Link>
              <Link to="/about" className="hover:text-gray-400">About</Link>
              <Link to="/contact" className="hover:text-gray-400">Contact</Link>
            </div>
          </div>

          <div className="flex-1 max-w-xl px-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className={`${darkMode ? "text-gray-500" : "text-gray-400"}`} />
              </div>
              <input
                type="text"
                placeholder="Search titles..."
                onChange={handleSearch}
                className={`w-full py-2.5 pl-10 pr-4 text-sm rounded-full focus:outline-none focus:ring-2 ${darkMode ? "bg-gray-800 border-gray-700 text-white focus:ring-gray-600" : "bg-gray-50 border-gray-200 text-gray-800 focus:ring-blue-500"}`}
              />
            </div>
          </div>

         
          <div className="hidden md:flex items-center space-x-3">
            <Link to="/notifications">
              <IconButton className="p-2 rounded-lg hover:bg-gray-200" variant="ghost">
                <HiOutlineBell className={`w-5 h-5 ${darkMode ? "text-gray-200" : "text-gray-800"}`} />
              </IconButton>
            </Link>
            <Link to="/blog">
              <IconButton className="p-2 rounded-lg hover:bg-gray-200" variant="ghost">
                <HiOutlinePencilSquare className={`w-5 h-5 ${darkMode ? "text-gray-200" : "text-gray-800"}`} />
              </IconButton>
            </Link>
            <ToggleTheme />
          </div>

        
          <Popover.Root>
            <Popover.Trigger>
              <div className="cursor-pointer">
                <Avatar size="3" src={user?.image} fallback="A" />
              </div>
            </Popover.Trigger>
            <Popover.Content
              side="bottom"
              align="start"
              className={`rounded-lg shadow-lg p-4 z-50 ${darkMode ? "bg-gray-800 text-white" : "bg-white"}`}
            >
              <DashBoardSideBar features={sidebarFeatures[currentView] || sidebarFeatures["dashboard"]} />
            
              <div className="flex flex-col md:hidden space-y-2 mt-3">
                <Link to="/notifications" className="flex items-center">
                  <HiOutlineBell className={`w-5 h-5 mr-2 ${darkMode ? "text-gray-200" : "text-gray-800"}`} />
                  Notifications
                </Link>
                <Link to="/blog" className="flex items-center">
                  <HiOutlinePencilSquare className={`w-5 h-5 mr-2 ${darkMode ? "text-gray-200" : "text-gray-800"}`} />
                  Blog
                </Link>
                <ToggleTheme />
              </div>
            </Popover.Content>
          </Popover.Root>

          {user?.email ? (
            <button
              className={`px-4 text-md py-2 rounded-full font-bodoni ${darkMode ? "bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700" : "bg-white text-gray-700 border-2 border-gray-200 hover:bg-gray-900 hover:text-white"}`}
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button
                className={`px-4 text-md py-2 rounded-full font-bodoni ${darkMode ? "bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700" : "bg-white text-gray-700 border-2 border-gray-200 hover:bg-gray-900 hover:text-white"}`}
              >
                Sign In
              </button>
            </Link>
          )}
        </div>

        {menuOpen && (
          <div className={`md:hidden flex flex-col space-y-2 mt-4 ${darkMode ? "text-gray-200" : "text-gray-600"}`}>
            <Link to="/" className="hover:text-gray-400">Home</Link>
            <Link to="/about" className="hover:text-gray-400">About</Link>
            <Link to="/contact" className="hover:text-gray-400">Contact</Link>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Header;
