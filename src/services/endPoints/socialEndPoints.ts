export const socialEndPoints = {
       
        followStatus: (followingId: string|undefined) => `/social/followStatus/${followingId}`,
        followUser: (followingId: string) => `/social/follow/${followingId}`,
        unfollowUser: (followingId: string | undefined) => `/social/unfollow/${followingId}`,
        acceptFollowRequest: (followingId: string) => `/social/followAccept/${followingId}`,
        getFollowers: "/social/getFollowers",
        userSearch: "/social/follows/search",
        
}