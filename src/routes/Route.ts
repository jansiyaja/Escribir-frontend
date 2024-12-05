 export  const ROUTES = {
  PUBLIC: {
    REGISTER: "/register",
    OTP_VERIFICATION: "/OTP-Verification",
    LOGIN: "/login",
    ADMIN_LOGIN: "/adminLogin",
     ABOUT: "/about",
     CONTACT: "/contact",
     HOME: "/",
     ADVERTISEMENT:"/advertisement"
  },
   PROTECTED: {
   PAYMENT_CANCELLED:"/paymentcancelled" ,
    PAYMENT_SUCCESS :"/payment-success",
    SETTINGS:"/settings",
    PROFILE: "/profile",
    NOTIFICATIONS: "/notifications",
    DASHBOARD: "/dashboard",
    CONNECTIONS: "/connections/:authorId",
    BLOG_EDITOR: "/blog",
    EDIT_BLOG: "/editblog/:id",
    SINGLE_BLOG: "/singleblog/:id",
     CHAT: "/Chat",
     CREATEADD: "/createadd",
     BUISNESS: "/addbuisness",
     TERMS_AND_CONDITION: '/terms_and_condition',
   ADVERTISEMENT_PAYMENT_SUCESS: '/advertisement-payment-success',
    CLIENTDASHBOARD:'/client_dashboard'
  },
  ADMIN: {
    ADMINDASHBOARD: "/adminDashBord",
    DASHBOARD: "/DashBord",
    TAGS: "/tagList",
    REPORTS: "/repotedList",
    SINGLE_REPORT: "/single/:id",
    USERS:"/users"
  },
};