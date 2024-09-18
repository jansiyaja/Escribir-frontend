import { IconButton, Avatar } from "@radix-ui/themes";
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

const Navbar = () => {
  return (
    <div className="h-screen w-16 bg-white shadow-lg flex flex-col justify-around items-center py-10 dark:bg-black">
       <Link to="/profile">
      
      <div className="flex flex-col items-center space-y-4">
        <Avatar size="3" src="" fallback="A" />
      </div>
      </Link>
      
      <nav className="flex flex-col space-y-6">
        <IconButton className="bg-white p-2 rounded-lg hover:bg-gray-200">
         
          <HiOutlineHome className="text-gray-600 w-8 h-8" />
        </IconButton>

        <IconButton className="bg-white p-2 rounded-lg hover:bg-gray-200">
          <HiOutlineChatBubbleLeftEllipsis className="text-gray-600 w-8 h-8" />
        </IconButton>

        <IconButton className="bg-white p-2 rounded-lg hover:bg-gray-200">
          <HiOutlinePhone className="text-gray-600 w-8 h-8" />
        </IconButton>

        <IconButton className="bg-white p-2 rounded-lg hover:bg-gray-200">
          <HiOutlinePencilSquare className="text-gray-600 w-8 h-8" />
        </IconButton>

        <IconButton className="bg-white p-2 rounded-lg hover:bg-gray-200">
          <HiOutlineUserGroup className="text-gray-600 w-8 h-8" />
        </IconButton>
   

    
     
        <IconButton className="bg-white p-2 rounded-lg hover:bg-gray-200">
          <HiOutlineGlobeAlt className="text-gray-600 w-8 h-8" />
        </IconButton>

        <IconButton className="bg-white p-2 rounded-lg hover:bg-gray-200">
          <HiOutlineBell className="text-gray-600 w-8 h-8" />
        </IconButton>

        <IconButton className="bg-white p-2 rounded-lg hover:bg-gray-200">
          <HiOutlineCog8Tooth className="text-gray-600 w-8 h-8" />
        </IconButton>

        <IconButton className="bg-white p-2 rounded-lg hover:bg-gray-200">
          <HiPower className="text-gray-600 w-8 h-8" />
        </IconButton>
        </nav>

    </div>
  );
};

export default Navbar;
