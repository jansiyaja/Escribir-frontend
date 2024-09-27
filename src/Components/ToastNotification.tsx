
import React from "react";
import * as Toast from "@radix-ui/react-toast";
import { ToastProps } from "../Interfaces/Components";



const ToastComponent: React.FC<ToastProps> = ({ open, setOpen, message, type }) => {
  const isSuccess = type === "success";
  const bgColor = isSuccess ? "bg-green-600" : "bg-red-600";
  const borderColor = isSuccess ? "border-green-400" : "border-red-400";

  return (
    <Toast.Provider>
      <Toast.Root
        open={open}
        onOpenChange={setOpen}
        className={`flex items-center justify-between w-full max-w-xs p-4 rounded-lg shadow-lg border ${bgColor} ${borderColor} text-white`}
      >
        <Toast.Description>{message}</Toast.Description>
        <Toast.Close className="ml-4 text-white hover:text-gray-200">
          Close
        </Toast.Close>
      </Toast.Root>
      <Toast.Viewport className="fixed bottom-0 right-0 p-4" />
    </Toast.Provider>
  );
};

export default ToastComponent;
