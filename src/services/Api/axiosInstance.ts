import axios from 'axios';

import { setCredentials } from '../../redux/slices/authSlice'; 
import store from '../../redux/store/store';

axios.defaults.withCredentials = true;  


const baseURL = "https://escribir1.furnishop.site";

 const axiosInstance = axios.create({
    baseURL,
    withCredentials: true, 
});

axiosInstance.interceptors.request.use(
    (config) => {
        const state = store.getState(); 
        const accessToken = state.auth.accessToken; 
        console.log("accessToKen",accessToken)
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
            
        }

        // Handle 403 Forbidden errors
        if (error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                
                
                const response = await axiosInstance.post('/users/verify-token', {
                    withCredentials: true, 
                });

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

       if (error.response.status === 401) {
    console.log('Access token is invalid. Trying to refresh...');

    try {
        const response = await axiosInstance.post('/users/verify-token', {
            withCredentials: true,  // Ensure cookies are sent
        });

        if (response.status === 200) {
            const newAccessToken = response.data.accessToken;
            const newRefreshToken = response.data.refreshToken;

            // Store new tokens in Redux or localStorage
            store.dispatch(setCredentials({
                user: store.getState().auth.user,  // Keep user data intact
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
            }));

            // Retry the original request with the new token
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return axiosInstance(originalRequest);
        }
    } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        store.dispatch(setCredentials({ user: null, accessToken: null, refreshToken: null }));
        window.location.href = '/login';  // Redirect to login after failed token refresh
    }
}

        return Promise.reject(error);
    }
);

export default axiosInstance

