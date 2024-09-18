import { IconButton, Avatar } from "@radix-ui/themes";


const Sidebar = () => {
  return (
    <div className="w-1/5 bg-gray-100 h-screen p-4">
      <ul>
      <li className="flex flex-col items-center space-y-4">
        <Avatar size="3" src="" fallback="A" />
      </li>
      <IconButton>
       
      </IconButton>
        <li className="mb-6"><i className="icon-class-for-home"> Profile</i></li>
        <li className="mb-6"><i className="icon-class-for-customization">Customization</i></li>
        <li className="mb-6"><i className="icon-class-for-notifications"> Notification</i></li>
        <li className="mb-6"><i className="icon-class-for-account"></i> Account</li>
      </ul>
    </div>
  );
};

export default Sidebar;
