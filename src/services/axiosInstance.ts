import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
    baseURL,
    withCredentials:true
});

axiosInstance.interceptors.request.use(
    (config) => {
       
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
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

           
            try {
                const response = await axios.post(`${baseURL}/users/refresh-token`, {
               
                
                },{
                    
                        withCredentials: true 
                    
                });
               
                

                if (response.status === 200) {
                    const newAccessToken = response.data.accessToken;

                  
                    axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosInstance(originalRequest);
                }
            } catch (error) {
                console.error('Refresh token failed:', error);
                
              
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;