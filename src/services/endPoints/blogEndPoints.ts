

export const blogEndpoints = {
    createBlogPost: "/blog/blogeditor",
    uploadBlogImage: "/blog/blogimage",
    listblogs: "/blog",
    listTags: "/blog/tags",
    getSingleBlog: (id: string|undefined) => `/blog/singleblog/${id}`,
    getSingleBlogEdit: (id: string|undefined) => `/blog/getblog/${id}`,
    deleteBlogpost: (id: string|undefined) => `/blog/delete-post/${id}`,
    updateBlogPost: (id: string|undefined) => `/blog/blogeditor/${id}`,
    userBlogList: (userId: string |undefined) => `/blog/your-blog/${userId}`,
    reportBlog: (id: string|undefined) => `/blog/reportblog/${id}`,
    addReaction: (id: string|undefined) => `/blog/react/${id}`,
    removeReaction: (id: string|undefined) => `/blog/react/${id}`,
    addComment: (id: string) => `/blog/comment/${id}`,
};
