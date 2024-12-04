import { LucideIcon } from "lucide-react";

 export  interface SpinnerProps {
    size: string;
    color: string;
    text: string;
    isLoading: boolean; 
  }
  

  export interface Feature {
  label: string;
  path: string;
}

 export interface DashBoardSideBarProps {
  features: Feature[];
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
  
 export  interface FormFieldProps {
    label: string;
    name: string;
    value: string;
    editMode: boolean;
    type?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    darkMode: boolean;
    isTextArea?: boolean;
  }
  export interface BlogPreviewProps {
    heading: string;
    image: string | null;
    tag: string;
    content: string;
    onClose: () => void; 
  }

  export interface AvatarProps {
    src?: string;           
    fallback?: string;     
    size?: 'sm' | 'md' | 'lg'; 
  }

  ////////////////////////////////////////////////////////////////////////
  interface Author {
    image: string;
    username: string;
    _id?:string;
  }

  export interface BlogPostCardProps {
    _id: string;
    heading: string;
    tag: string;
    coverImageUrl: string;
    createdAt: string;
    author_id : Author
      
    content?:string
  }
 export interface comment {
    id?: string;
    createdAt: string;
    userId : string
    content?:string
  }
export interface RawMessage {
  Sender_id: {
    username: string;
    image: string;
    _id:string
  };
  Content: string;
  createdAt: string;
  ReadBy?: boolean;
  Chat: {
    _id:string
  }
}

export interface Message {
  chatId?: string,
  _id?:string,
  username: string;
  message: string;
  image?: string;
  timestamp: string;
  status: "read" | "delivered" | "sent" | undefined;
  sender?:string
}



  /////////////////////////////////////////////////////////////////////////////////

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  confirmMessage?: string;
  onConfirm?: () => void;
  children?: React.ReactNode; 
}
  

export interface CreateTagProps {
  onTagCreatedOrUpdated: () => void;  
  tagToEdit: { _id: string; name: string } | null; 
  isEditMode: boolean;
}
export interface Tag {
  _id: string;
  name: string;
  createdAt: string;
}

/////////////////////////////////////////////////////////////////

// fallback

 export  interface FloatingIcon {
  icon: LucideIcon;
  color: string;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  delay: number;
}


 export interface CreativeBlogLoadingProps {
  children?: React.ReactNode;
  className?: string;
  subtitle?: string;
  icons?: FloatingIcon[];
  animationDuration?: number;
}

/////////////////////////
 export interface AdDetails {
  title: string;
  targetAudience: string;
  format: string;
  industry: string;
   thumbnailPreview: string | null;
   link: string
   textContent:string
}