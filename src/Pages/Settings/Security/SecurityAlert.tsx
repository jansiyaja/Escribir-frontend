import React, { useState } from "react";
import { AlertTriangle } from "lucide-react";

interface SecurityAlertsProps {
  email: string | undefined;
}

const SecurityAlerts: React.FC<SecurityAlertsProps> = ({ email }) => {
  const [securityAlerts, setSecurityAlerts] = useState(false);
  const [alerts, setAlerts] = useState<string[]>([]); 

 
  const exampleAlerts = [
    "Account deleted from your device",
    "Password changed from a new device",
    "New login from an unknown location",
    "2FA enabled/disabled",
  ];

  const handleToggleAlerts = () => {
    setSecurityAlerts(!securityAlerts);
    if (!securityAlerts) {
    
      setAlerts(exampleAlerts);
    } else {
    
      setAlerts([]);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
      <div className="flex items-center space-x-3">
        <AlertTriangle className="text-yellow-600 w-6 h-6" />
        <h3 className="text-xl font-semibold">Security Alerts</h3>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <p className="font-medium">Enable Security Notifications</p>
          <p className="text-sm text-gray-500">Get alerts for suspicious activities</p>
        </div>
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={securityAlerts}
            onChange={handleToggleAlerts}
            className="sr-only peer"
          />
          <div
            className={`w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600 relative after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:border-gray-300 after:h-5 after:w-5 after:rounded-full after:transition-all ${
              securityAlerts ? "after:translate-x-full" : ""
            }`}
          ></div>
        </label>
      </div>

      {securityAlerts && (
        <div className="bg-blue-50 border border-blue-200 p-3 rounded-md">
          <p className="text-sm text-blue-800">
            Security alerts will be sent to: {email}
          </p>
          <div className="mt-4 space-y-2">
            {alerts.length > 0 ? (
              alerts.map((alert, index) => (
                <div key={index} className="text-sm text-blue-700">
                  - {alert}
                </div>
              ))
            ) : (
              <p className="text-sm text-blue-600">No active alerts</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SecurityAlerts;
