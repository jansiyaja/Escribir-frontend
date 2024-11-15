import { ILogin, IRegister } from "../../Interfaces/Auth"
import { handleAxiosError } from "../../utils/errorHandling";

import { userEndpoints } from "../endPoints/userEndPoints"
import axiosInstance from "./axiosInstance"

export const userRegister = async (registerData: IRegister) => {
    try {
        return await axiosInstance.post(userEndpoints.auth.register, registerData, { withCredentials: true });
    } catch (error) {
        return Promise.reject(error);
    }
};
export const verifyOtp = async (otpData: { otp: string, email: string  }) => {
    try {
        return await axiosInstance.post(userEndpoints.auth.verifyOtp, otpData, { withCredentials: true });
    } catch (error) {
        return Promise.reject(error);
    }
};

export const resendOtp = async (data: { email: string }) => {
    try {
        return await axiosInstance.post(userEndpoints.auth.resendOtp, data, { withCredentials: true });
    } catch (error) {
        return Promise.reject(error);
    }
};


export const userLogin = async (login: ILogin) => {
    try {
        return await axiosInstance.post(userEndpoints.auth.login, login, { withCredentials: true });
    } catch (error) {
    const errorMessage = handleAxiosError(error);
    return Promise.reject(errorMessage);
    }
};

export const userLogout = async () => {
    try {
        return await axiosInstance.post(userEndpoints.auth.logout, { withCredentials: true });
    } catch (error) {
        const errorMessage = handleAxiosError(error);
    return Promise.reject(errorMessage); 
    }
}

export const getProfile = async () => {
    try {
        return await axiosInstance.get(userEndpoints.profile.getProfile, { withCredentials: true });
    } catch (error) {
         const errorMessage = handleAxiosError(error);
    return Promise.reject(errorMessage); 
    }
}

export const getConnectionProfile = async(authorId:string|undefined) => {
    try {
        return await axiosInstance.get (userEndpoints.profile.friendProfile(authorId), { withCredentials: true });
         
    } catch (error) {
          const errorMessage = handleAxiosError(error);
    return Promise.reject(errorMessage);  
    }
}

export const getallNotification = async () => {
    try {
        
        return await axiosInstance.get(userEndpoints.notifications.getAll,{withCredentials:true})
    } catch (error) {
            const errorMessage = handleAxiosError(error);
    return Promise.reject(errorMessage); 
        
    }
}
export const sendNotification = async (authorId: string) => {
    try {
        return await axiosInstance.post(userEndpoints.notifications.send, {
            followerId: authorId,
        }, { withCredentials: true });
    } catch (error) {
        return Promise.reject(error);
    }
};

