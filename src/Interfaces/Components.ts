 export  interface SpinnerProps {
    size: string;
    color: string;
    text: string;
    isLoading: boolean; 
  }
  

  export interface PasswordInputProps {
   
    name: string;
    value: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    label: string;
    showEyeIcon?: boolean;
  }
  
  export interface ToastProps {
    open: boolean;
    setOpen: (state: boolean) => void;
    message: string;
    type: "success" | "error"; 
  }
  