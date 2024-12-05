import { AdminEndPoints } from "../endPoints/adminEndPoints";
import axiosAdminInstance from "./axioxAdminInstance";

export const LIST_USERS = async ( ) => {
    try {
        return await axiosAdminInstance.get(AdminEndPoints.LIST_USERS,{withCredentials: true});
    } catch (error) {
        return Promise.reject(error);
    }
}
export const LIST_BLOGS = async ( ) => {
    try {
        return await axiosAdminInstance.get(AdminEndPoints.LIST_BLOGS,{withCredentials: true});
    } catch (error) {
        return Promise.reject(error);
    }
}
export const LIST_CLIENTS = async ( ) => {
    try {
        return await axiosAdminInstance.get(AdminEndPoints.LIST_CLIENTS,{withCredentials: true});
    } catch (error) {
        return Promise.reject(error);
    }
}