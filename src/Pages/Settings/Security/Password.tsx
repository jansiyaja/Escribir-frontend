import React, { useState } from "react";
import { KeyRound } from "lucide-react";
import PasswordToggle from "../../../Components/PasswordToggle";
import axiosInstance from "../../../services/Api/axiosInstance";
import { handleAxiosError } from "../../../utils/errorHandling";

import ToastComponent from "../../../Components/ToastNotification";
import useToast from "../../../Components/UseToast";

const PASSWORD_VALIDATION_REGEX =
  /^(?=.*[A-Z])(?=.*\d)(?!.*\s{2,}).{6,}$/;

interface PasswordManagementProps {}

const PasswordManagement: React.FC<PasswordManagementProps> = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState("");
    
  const { showToast, setShowToast, toastMessage, toastType, triggerToast } = useToast();

  

  const validatePassword = (password: string) => {
    if (!PASSWORD_VALIDATION_REGEX.test(password)) {
      return (
        "Password must be at least 6 characters long, " +
        "include at least one uppercase letter, one number."
      );
    }
    return "";
  };

  const updatePassword = async () => {
    if (!currentPassword || !newPassword) {
      setError("Both fields are required.");
      return;
    }

    const validationError = validatePassword(newPassword);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const response = await axiosInstance.post(
        "/users/update-password",
        { currentPassword, newPassword },
        { withCredentials: true }
      );

      if (response.status === 201) {
        
        setCurrentPassword("");
        setNewPassword("");
        setError("");
        triggerToast("Password updated successfully!", "success");
      }
    } catch (error) {
      const errorMessage = handleAxiosError(error);
      setError(errorMessage);
      
      triggerToast(errorMessage, "error");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <KeyRound className="text-blue-600 w-6 h-6" />
          <h3 className="text-xl font-semibold">Password Management</h3>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <PasswordToggle
            id="currentPassword"
            name="currentPassword"
            value={currentPassword}
            placeholder="Enter your current password"
            onChange={(e) => setCurrentPassword(e.target.value)}
            error={error}
            label="Current Password"
          />
        </div>

        <div>
          <PasswordToggle
            id="newPassword"
            name="newPassword"
            value={newPassword}
            placeholder="Enter your new password"
            onChange={(e) => setNewPassword(e.target.value)}
            error={error}
            label="New Password"
          />
        </div>

        <div className="flex space-x-3">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={updatePassword}
          >
            Update Password
          </button>
          <button
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            onClick={() => {
              setCurrentPassword("");
              setNewPassword("");
              setError("");
            }}
          >
            Cancel
          </button>
        </div>

      
        <ToastComponent
          open={showToast}
          setOpen={setShowToast}
          message={toastMessage}
          type={toastType}
        />
      </div>
    </div>
  );
};

export default PasswordManagement;
