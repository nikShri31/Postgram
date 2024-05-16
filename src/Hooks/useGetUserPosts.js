import { useEffect, useState } from "react";
import usePostStore from "../store/postStore";
import useShowToast from "./useShowToast";
import useUserProfileStore from "../store/userProfileStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../Firebase/firebase";

const useGetUserPosts = () => {
    const [isLoading, setIsLoading] = useState();
    const showToast = useShowToast();
    const { posts, setPosts } = usePostStore();
    const { userProfile } = useUserProfileStore();   //const userProfile = useUserProfileStore((state) => state.userProfile);

    useEffect(() => {

        const getPosts = async () => {
            if (!userProfile) return;

            setIsLoading(true);
            setPosts([]);
            try {
                //const querySnapshot = await getDocs(query(collection(firestore, 'collectionName'), where('field', '==', 'value')));

                const q = query(collection(firestore, 'posts'), where('createdBy', "==", userProfile.uid));
                const querySnapshot = await getDocs(q);

                const fetchPosts = [];
                querySnapshot.forEach((doc) => {
                    fetchPosts.push({ ...doc.data(), id: doc.id });
                })
                fetchPosts.sort((a, b) => b.createdAt - a.createdAt);   // latest posts come first and show on top

                setPosts(fetchPosts);
            } catch (error) {
                showToast('Error', error.message, "error");
                setPosts([]);                                // remember 
            } finally {
                setIsLoading(false);
            }

        };
        getPosts();
    }, [setPosts, userProfile, showToast]);

    return { posts, isLoading }
}
export default useGetUserPosts;