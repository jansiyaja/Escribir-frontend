import { useState } from "react";
import { Lock } from "lucide-react";
import PasswordManagement from "./Password";
import SecurityAlerts from "./SecurityAlert";
import TwoFactor from "./TwoFactor";

interface SecuritySettingsProps {
  email: string|undefined;
  lastLoginDate: Date;
}
const SecuritySettingsPage: React.FC<SecuritySettingsProps> = ({
  email,
  
}) => {
  const [activeSection, setActiveSection] = useState<"password" | "alerts" | "2fa">("password");

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center space-x-4">
          <Lock className="w-8 h-8 text-gray-700" />
          <h1 className="text-3xl font-bold">Security Settings</h1>
        </div>

        <div className="flex space-x-4 mb-6">
          {[
            { key: "password", label: "Password" },
            { key: "alerts", label: "Security Alerts" },
            { key: "2fa", label: "Two-Factor Auth" },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveSection(key as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
                activeSection === key ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {activeSection === "password" && <PasswordManagement />}
        {activeSection === "alerts" && <SecurityAlerts email={email} />}
        {activeSection === "2fa" && <TwoFactor  />}
       
      </div>
    </div>
  );
};

export default SecuritySettingsPage;
