

export interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
  dob: string;
  linkedIn: string;
  github: string;
  portfolio: string;
  location: string;
  bio: string;
  phone?: string;
  image?: string
  isPremium: boolean
  twoFactorEnabled: boolean
}


export interface Admin {
  id: string;
  username: string;
  email: string;
  role: string;

}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;

}

export interface AdminAuthState {
  admin: Admin | null;
  accessToken: string;
  refreshToken: string;

}


export interface ThemeState {
  darkMode: boolean;


}

export interface Notification {
  _id: string;
  createdAt: string;
  fromUserId: User;
  isRead: boolean;
  message: string;
  userId: User;
}

export interface Advertisement{
  id:string
    title: string;
    targetAudience:string,
    format: string,
    industry:string,
    thumbnailPreview:string,
  link: string,
  type:string
    textContent:string, 
   
}
export interface AdState {
  advertisement: Advertisement[] | null;


}
