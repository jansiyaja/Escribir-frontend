import { Message } from "../../Interfaces/Components";
import { handleAxiosError } from "../../utils/errorHandling";
import { chatEndpoints } from "../endPoints/chatEndPoints";
import axiosInstance from "./axiosInstance";

export const interactedUsersList = async () => {
    try {
        return await axiosInstance.get(chatEndpoints.interactedUsers, { withCredentials: true });
    } catch (error) {
         const errorMessage = handleAxiosError(error);
    return Promise.reject(errorMessage); 
    }
}
export const createGroup = async (groupName: string, users: { userId: string }[]) => {
    try {
        return await axiosInstance.post(
            chatEndpoints.createGroup,
            {
                groupName,
                members: users.map((user) => user.userId),
            },
            { withCredentials: true }
        );
    } catch (error) {
        const errorMessage = handleAxiosError(error);
        return Promise.reject(errorMessage);
    }
};


export const listGroups = async () => {
    try {
        return await axiosInstance.get(chatEndpoints.listGroups, { withCredentials: true });
    } catch (error) {
         const errorMessage = handleAxiosError(error);
    return Promise.reject(errorMessage); 
    }
}

export const getMessages = async (receiverId:string) => {
    try {
        return await axiosInstance.get(chatEndpoints.getMessages(receiverId), { withCredentials: true });
    } catch (error) {
         const errorMessage = handleAxiosError(error);
    return Promise.reject(errorMessage); 
    }
}
export const sendMessages = async (currentChatId: string, newMessage: Message) => {
    try {
        return await axiosInstance.post(
            chatEndpoints.sendMessage(currentChatId),
            newMessage,
            { withCredentials: true }
        );
    } catch (error) {
        const errorMessage = handleAxiosError(error);
        return Promise.reject(errorMessage);
    }
};

export const createChat = async (recieverId: string|undefined) => {
    try {
        return await axiosInstance.get(chatEndpoints.createChat(recieverId),{ withCredentials: true } );
    } catch (error) {
        const errorMessage = handleAxiosError(error);
        return Promise.reject(errorMessage);
    }
};
 
