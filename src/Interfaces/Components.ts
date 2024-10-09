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