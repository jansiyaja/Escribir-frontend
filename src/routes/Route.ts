 export  const ROUTES = {
  PUBLIC: {
    REGISTER: "/register",
    OTP_VERIFICATION: "/OTP-Verification",
    LOGIN: "/login",
    ADMIN_LOGIN: "/adminLogin",
  
  },
   PROTECTED: {
     HOME: "/",
      
    ABOUT: "/about",
    CONTACT: "/contact",
    PROFILE: "/profile",
    NOTIFICATIONS: "/notifications",
    DASHBOARD: "/dashboard",
    CONNECTIONS: "/connections/:authorId",
    BLOG_EDITOR: "/blog",
    EDIT_BLOG: "/editblog/:id",
    SINGLE_BLOG: "/singleblog/:id",
    CHAT: "/Chat",
  },
  ADMIN: {
    DASHBOARD: "/adminDashBord",
    TAGS: "/tagList",
    REPORTS: "/repotedList",
    SINGLE_REPORT: "/single/:id",
  },
};