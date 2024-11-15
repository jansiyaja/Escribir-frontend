/**
 * Custom hook for managing toast notifications
 * 
 * This hook provides a simple way to display temporary messages to users, such as success alerts, error messages, or informational notes.
 * It encapsulates the logic for showing and hiding toast notifications,
 * allowing components to easily trigger them without worrying about the
 * underlying state management.

 */


import { useState } from "react";


 const useToast = () =>{
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

  const triggerToast = (message: string, type: "success" | "error") => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    
  };
  return { showToast, setShowToast, toastMessage, toastType, triggerToast };
};
  export default useToast