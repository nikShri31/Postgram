import { create } from "zustand";

const useUserProfileStore = create((set) => ({
    userProfile: null,           //initial-state

    setUserProfile: (userProfile) => set({ userProfile }),

    // this is used to update the number of posts count in the profile page

    //add post
    addPost: (post) => set((state) => ({
        userProfile: {
            ...state.userProfile,
            posts: [post.id, ...state.userProfile.posts ]
        },
    })),

    // delete Post
    deletePost: (postId) => set((state) => ({
        userProfile: {
            ...state.userProfile,
            posts: state.userProfile.posts.filter((id) => id !== postId),
        },
    }))

}));

export default useUserProfileStore;