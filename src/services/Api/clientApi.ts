
import { clientEndpoints } from "../endPoints/clientEndPoint";
import axiosInstance from "./axiosInstance";

export const MAKEPAYMENT = async (email:string|undefined, businessName: string ) => {
    try {
        return await axiosInstance.post(clientEndpoints.MAKEPAYMENT, { email, businessName },{ withCredentials: true });
    } catch (error) {
        return Promise.reject(error);
    }
}
export const PAYMENTUPDATE = async (amount:number, orderId: string,customerEmail:string,businessName: string|undefined ) => {
    try {
        return await axiosInstance.post(clientEndpoints.PAYMENTUPDATE, {  amount, orderId, customerEmail,businessName },{ withCredentials: true });
    } catch (error) {
        return Promise.reject(error);
    }
}
export const CREATEADD = async (formData:FormData ) => {
    try {
        return await axiosInstance.post(clientEndpoints.CREATEADD, formData , {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    } catch (error) {
        return Promise.reject(error);
    }
}
export const LIST_ADVETISEMENTS = async ( ) => {
    try {
        return await axiosInstance.get(clientEndpoints.LIST_ADVETISEMENTS,{withCredentials: true});
    } catch (error) {
        return Promise.reject(error);
    }
}