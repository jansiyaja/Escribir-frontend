import axios from 'axios';

import { setCredentials } from '../../redux/slices/authSlice'; 
import store from '../../redux/store/store';




const baseURL = "https://blog.escriber.blog/";

 const axiosInstance = axios.create({
    baseURL,
    withCredentials: true, 
});

axiosInstance.interceptors.request.use(
    (config) => {
        const state = store.getState(); 
        const accessToken = state.auth.accessToken; 
        if (accessToken) {
           
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
       
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response) {
            console.error('Error Data:', error.response.data);
             console.error('Original Request:', originalRequest);
            
        }

        // Handle 403 Forbidden errors
        if (error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                
                
                const response = await axiosInstance.post('/users/verify-token', {
                    withCredentials: true, 
                });
                console.log("res",response);
                

                if (response.status === 200) {
                    const newAccessToken = response.data.accessToken;
                    const newRefreshToken = response.data.refreshToken;
                   
                    
                    store.dispatch(setCredentials({
                        user: store.getState().auth.user, // Keep the current user data
                        accessToken: newAccessToken,
                        refreshToken: newRefreshToken,
                    }));

                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                    return axiosInstance(originalRequest);
                }
            } catch (refreshError) {
                console.error('Refresh token failed:', refreshError);
                
           
                // Reject the promise to continue error handling
                return Promise.reject(refreshError);
            }
        }

        // Handle 401 Unauthorized errors
        if (error.response.status === 401) {
            console.log(error);
            
            console.log('Access token is invalid. Logging out...');
            window.location.href = '/login';
        }

        return Promise.reject(error);
    }
);

export default axiosInstance

