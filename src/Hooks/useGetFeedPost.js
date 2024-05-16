import { useEffect, useState } from "react"
import usePostStore from "../store/postStore";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import useUserProfileStore from "../store/userProfileStore";
import { collection, getDoc, query, where } from "firebase/firestore";
import { firestore } from "../Firebase/firebase";


const useGetFeedPost = () => {

    const [isLoading, setIsLoading] = useState(true);
    const { posts, setPosts } = usePostStore();
    const authUser = useAuthStore(state => state.user);
    const { setUserProfile } = useUserProfileStore();
    const showToast = useShowToast();

    useEffect(() => {
        const getFeedPost = async () => {
            setIsLoading(true);
            if (authUser.following.length === 0) {
                setIsLoading(false);
                setPosts([]);
                return;
            }
            const q = query(collection(firestore, "posts"), where("createdBy", "in", authUser.following));
            try {
                const querySnapshot = await getDoc(q);
                let feedPosts = [];

                querySnapshot.forEach((doc) => {
                    feedPosts.push({ id: doc.id, ...doc.data() });
                })

                feedPosts.sort((a, b) => b.createdAt - a.createdAt);   //  to latest show first

                setPosts(feedPosts);     // Updating Component State

            } catch (error) {
                showToast("Error",error.message, "error");

            } finally {
                setIsLoading(false);
            }

        }
           if (authUser)  getFeedPost();

    }, [showToast, authUser, setPosts, setUserProfile])

    return { isLoading, posts };
}

export default useGetFeedPost;

// in : The "in" operator is used to check if the value of the "createdBy" field is included in an array.
/* Overall, the query q retrieves documents from the "posts" collection 
   where the value of the "createdBy" field matches any of the IDs present in the authUser.following array */