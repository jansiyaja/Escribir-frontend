
export const userEndpoints = {
    auth: {
        register: "/users/register",
        verifyOtp: "/users/verify-otp",
        verifyToken: "/users/verify-token",
        login: "/users/login",
        resendOtp: "/users/resend-otp",
        logout: "/users/logout",
    },
    profile: {
        uploadProfileImage: "/users/profileImage",
        updateProfile: "/users/profile",
        getProfile: "/users/profile",
        friendProfile: (authorId: string|undefined) => `/users/connectionProfile/${authorId}`,
    },
   
    notifications: {
        getAll: "/users/notifications",
        send: "/users/notificationSend",
    },
   
   
};
