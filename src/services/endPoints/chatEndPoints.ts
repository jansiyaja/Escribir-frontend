export const chatEndpoints={
        createChat: (receiverId: string|undefined) => `/chat/newChat/${receiverId}`,
        sendMessage: (chatId: string) => `/chat/messages/${chatId}`,
        getMessages: (receiverId: string) => `/chat/messages/${receiverId}`,
        interactedUsers: "/chat/interacted",
        createGroup: "/chat/groupscreate",
        listGroups: "/chat/groups",
}