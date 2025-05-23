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
import { ROUTES } from "../routes/Route";

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
    navigate("/login", { replace: true });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const sidebarFeatures: Record<string, Feature[]> = {
    dashboard: [
      { label: "Dashboard", path: ROUTES.PROTECTED.DASHBOARD },
      ...(user?.role === 'client' ? [{ label: "Client", path: ROUTES.PROTECTED.CLIENTDASHBOARD }] : []),
      { label: "Settings", path: "/settings" },
      { label: "Notifications", path: "/notifications" },
      { label: "Blog", path: "/blog" },
    ],
  };

  return (
    <div className={`w-full border-b top-0 sticky z-50 ${darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"}`}>
      <nav className="w-full mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-6 md:space-x-8">
            <Link to="/" className="flex-shrink-0">
              <img src={darkMode ? darkLogo : lightLogo} alt="Logo" className="h-10" />
            </Link>

            <div className="md:hidden">
              <IconButton onClick={() => setMenuOpen(!menuOpen)} variant="ghost">
                {menuOpen ? <HiXMark className="w-6 h-6 text-gray-800" /> : <HiListBullet className="w-6 h-6 text-gray-800" />}
              </IconButton>
            </div>
 
            <div className={`hidden md:flex items-center space-x-8 ${darkMode ? "text-white" : "text-gray-600"}`}>
              <Link to={ROUTES.PUBLIC.HOME} className="hover:text-blue-600 transition duration-200">Home</Link>
              <Link to={ROUTES.PUBLIC.ABOUT} className="hover:text-blue-600 transition duration-200">About</Link>
              <Link to={ROUTES.PUBLIC.CONTACT} className="hover:text-blue-600 transition duration-200">Contact</Link>
              <Link to={ROUTES.PUBLIC.ADVERTISEMENT} className="hover:text-blue-600 transition duration-200">Advertise with Us</Link>
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

          <div className="hidden md:flex items-center space-x-6 md:space-x-6">
            <Link to="/notifications">
              <IconButton className="p-2 rounded-lg hover:bg-gray-200 transition duration-200" variant="ghost">
                <HiOutlineBell className={`w-5 h-5 ${darkMode ? "text-gray-200" : "text-gray-800"}`} />
              </IconButton>
            </Link>
            <Link to="/blog">
              <IconButton className="p-2 rounded-lg hover:bg-gray-200 transition duration-200" variant="ghost">
                <HiOutlinePencilSquare className={`w-5 h-5 ${darkMode ? "text-gray-200" : "text-gray-800"}`} />
              </IconButton>
            </Link>
            <ToggleTheme />
                      {user?.email ? (
            <button
              className={`px-4 text-md py-2  font-bodoni ${darkMode ? " text-gray-300  transition duration-200" : " text-gray-700 transition duration-200"}`}
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button
                className={`px-4 text-md py-2  font-bodoni ${darkMode ? " text-gray-300  transition duration-200" :" text-gray-700  transition duration-200"}`}
              >
                Sign In
              </button>
            </Link>
          )}
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

                <ToggleTheme />
                          {user?.email ? (
            <button
              className={`px-4 text-md py-2 font-bodoni ${darkMode ? " text-gray-300  transition duration-200" : " text-gray-700 hover:text-white transition duration-200"}`}
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button
                className={`px-4 text-md py-2  font-bodoni ${darkMode ? " text-gray-300  transition duration-200" : " text-gray-700  hover:text-white transition duration-200"}`}
              >
               Sign In
              </button>
            </Link>
          )}
              </div>
            </Popover.Content>
          </Popover.Root>


        </div>

        {menuOpen && (
          <div className={`md:hidden flex flex-col space-y-3 mt-4 ${darkMode ? "text-gray-200" : "text-gray-600"}`}>
            <Link to={ROUTES.PUBLIC.HOME} className="text-gray-600 hover:text-blue-600">Home</Link>
            <Link to={ROUTES.PUBLIC.ABOUT} className="text-gray-600 hover:text-blue-600">About</Link>
            <Link to={ROUTES.PUBLIC.CONTACT} className="text-gray-600 hover:text-blue-600">Contact</Link>
            <Link to={ROUTES.PUBLIC.ADVERTISEMENT} className="text-gray-600 hover:text-blue-600">Advertise with Us</Link>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Header;
