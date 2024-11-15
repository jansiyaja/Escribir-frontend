import { handleAxiosError } from "../../utils/errorHandling";
import { socialEndPoints } from "../endPoints/socialEndPoints";
import axiosInstance from "./axiosInstance";

export const followStatus = async (followingId: string | undefined) => {
    
    try {
          return await axiosInstance.get(socialEndPoints.followStatus(followingId),{withCredentials:true})
        
    } catch (error) {
    const errorMessage = handleAxiosError(error);
    return Promise.reject(errorMessage);   
    }
   
 }

export const followUser = async (followingId: string) => {
    try {
        return await axiosInstance.post(socialEndPoints.followUser(followingId), {}, { withCredentials: true });
    } catch (error) {
          const errorMessage = handleAxiosError(error);
    return Promise.reject(errorMessage); 
    }
};

export const unfollowUser = async (followingId: string|undefined) => {
    try {
        return await axiosInstance.post(socialEndPoints.unfollowUser(followingId), {}, { withCredentials: true });
    } catch (error) {
               const errorMessage = handleAxiosError(error);
    return Promise.reject(errorMessage); 
    }
};

export const acceptFollowRequest = async (followingId: string) => {
    try {
        return await axiosInstance.post(socialEndPoints.acceptFollowRequest(followingId), {}, { withCredentials: true });
    } catch (error) {
                 const errorMessage = handleAxiosError(error);
    return Promise.reject(errorMessage); 
    }
};

export const getFollowers = async () => {
    try {
        return await axiosInstance.get(socialEndPoints.getFollowers, { withCredentials: true });
    } catch (error) {
                const errorMessage = handleAxiosError(error);
    return Promise.reject(errorMessage); 
    }
};

export const searchFollowers = async (searchQuery: string) => {
    try {
        return await axiosInstance.get(
            `${socialEndPoints.userSearch}?query=${encodeURIComponent(searchQuery)}`,
            { withCredentials: true }
        );
      
    } catch (error) {
        const errorMessage = handleAxiosError(error);
        return Promise.reject(errorMessage);
    }
};
