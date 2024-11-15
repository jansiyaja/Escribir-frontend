import { BlogPostCardProps } from '../../Interfaces/Components';
import { handleAxiosError } from '../../utils/errorHandling';
import { blogEndpoints } from '../endPoints/blogEndPoints';
import axiosInstance from './axiosInstance';





export const createBlogPost = async (formData: FormData) => {
    try {
        return await axiosInstance.post(blogEndpoints.createBlogPost, formData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    } catch (error) {
    const errorMessage = handleAxiosError(error);
    return Promise.reject(errorMessage); 
    }
};

export const uploadBlogImage = async (imageData: FormData) => {
    try {
        return await axiosInstance.post(blogEndpoints.uploadBlogImage, imageData, { withCredentials: true });
    } catch (error) {
         const errorMessage = handleAxiosError(error);
    return Promise.reject(errorMessage); 
    }
};

export const listBlogs = async () => {
    try {
        return await axiosInstance.get(blogEndpoints.listblogs, { withCredentials: true });
    } catch (error) {
          const errorMessage = handleAxiosError(error);
    return Promise.reject(errorMessage); 
    }
};

export const getSingleBlog = async (id: string|undefined) => {
    try {
        return await axiosInstance.get(blogEndpoints.getSingleBlog(id), { withCredentials: true });
    } catch (error) {
          const errorMessage = handleAxiosError(error);
    return Promise.reject(errorMessage); 
    }
};
export const getSingleBlogEdit = async (id: string|undefined) => {
    try {
        return await axiosInstance.get(blogEndpoints.getSingleBlogEdit(id), { withCredentials: true });
    } catch (error) {
       const errorMessage = handleAxiosError(error);
    return Promise.reject(errorMessage); 
    }
};
export const updateBlogPost = async (id: string|undefined, updatedBlogPost: BlogPostCardProps) => {
    try {
        return await axiosInstance.put(blogEndpoints.updateBlogPost(id), updatedBlogPost, { withCredentials: true });
    } catch (error) {
         const errorMessage = handleAxiosError(error);
    return Promise.reject(errorMessage); 
    }
};
export const deleteSingleBlog = async (id: string | undefined) => {
    try {
        return await axiosInstance.delete(blogEndpoints.deleteBlogpost(id), { withCredentials: true });
    } catch (error) {
       const errorMessage = handleAxiosError(error);
    return Promise.reject(errorMessage); 
    }
}


export const listTags = async () => {
    try {
        return await axiosInstance.get(blogEndpoints.listTags, { withCredentials: true });
    } catch (error) {
     const errorMessage = handleAxiosError(error);
    return Promise.reject(errorMessage); 
    }
};

export const userBlogList = async (autherId:string|undefined) => {
     try {
        return await axiosInstance.get(blogEndpoints.userBlogList(autherId), { withCredentials: true });
     } catch (error) {
     const errorMessage = handleAxiosError(error);
    return Promise.reject(errorMessage);  
     }
}
 
 export const reportBlog = async (id: string|undefined, reportReason: string) => {
    try {
        const response = await axiosInstance.post(blogEndpoints.reportBlog(id), { reason: reportReason }, {
            withCredentials: true,
        });
        return response;
    } catch (error) {
         const errorMessage = handleAxiosError(error);
    return Promise.reject(errorMessage);
    }
};

export const addReaction = async (id: string|undefined, reaction: string, authorId: string|undefined) => {
    try {
        const response = await axiosInstance.delete(blogEndpoints.addReaction(id), {
            data: { reaction, authorId },
            withCredentials: true,
        });
        return response;
    } catch (error) {
     const errorMessage = handleAxiosError(error);
    return Promise.reject(errorMessage);
    }
};


export const deleteReaction = async (id: string|undefined, reaction: string, authorId: string|undefined) => {
    try {
        const response = await axiosInstance.delete(blogEndpoints.removeReaction(id), {
            data: { reaction, authorId },
            withCredentials: true,
        });
        return response;
    } catch (error) {
     const errorMessage = handleAxiosError(error);
    return Promise.reject(errorMessage);
    }
};