import axios from 'axios';
import store from '../../redux/store/store';
import { setCredentials } from '../../redux/slices/adminSlice';




const baseURL = "http://localhost:3000"


 const axiosAdminInstance = axios.create({
    baseURL,
    withCredentials: true, 
});

axiosAdminInstance.interceptors.request.use(
    (config) => {
        const state = store.getState(); 
        const accessToken = state.admin.accessToken; 
        if (accessToken) {
           
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
       
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosAdminInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response) {
            console.error('Error Data:', error.response.data);
            
        }

     
        if (error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                
                
                const response = await axiosAdminInstance.post('/admin/verify-token', {
                    withCredentials: true, 
                });

                if (response.status === 200) {
                    const newAccessToken = response.data.accessToken;
                    const newRefreshToken = response.data.refreshToken;
                   
                    
                    store.dispatch(setCredentials({
                        admin: store.getState().admin.admin, 
                        accessToken: newAccessToken,
                        refreshToken: newRefreshToken,
                    }));

                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                    return axiosAdminInstance(originalRequest);
                }
            } catch (refreshError) {
                console.error('Refresh token failed:', refreshError);
                
           
         
                return Promise.reject(refreshError);
            }
        }

     
        if (error.response.status === 401) {
            console.log('Access token is invalid. Logging out...');
            //window.location.href = '/adminLogin';
        }

        return Promise.reject(error);
    }
);

export default axiosAdminInstance

