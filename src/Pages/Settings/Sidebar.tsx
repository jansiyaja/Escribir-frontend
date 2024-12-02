import React from "react";
import {
  User,
  Crown,
  Shield,
  CreditCard,
  LogOut,
  User2,
} from "lucide-react";
import { SidebarItem } from "./types";



type SidebarProps = {
  activeSection: string;
  setActiveSection: (section: string) => void; 
};

const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection }) => {
  const sidebarItems: SidebarItem[] = [
    { id: "profile", label: "Profile", icon: User },
    { id: "premium", label: "Premium Plans", icon: Crown },
    { id: "security", label: "Security", icon: Shield },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "account", label: "Account", icon: User2 },
  ];

  return (
    <div className="w-64 bg-white border-r">
      <div className="p-6">
        <h1 className="text-xl font-bold">Settings</h1>
      </div>
      <nav className="px-4">
        {sidebarItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-1 ${
              activeSection === item.id
                ? "bg-blue-50 text-blue-600"
                : "hover:bg-gray-50"
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </button>
        ))}
        <button
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 mt-4"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
