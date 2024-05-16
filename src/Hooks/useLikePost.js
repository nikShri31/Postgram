import { useState } from "react"
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { firestore } from "../Firebase/firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";





const useLikePost = (post)=>{

    const [isUpdating, setIsUpdating] = useState(false);
	const authUser = useAuthStore((state) => state.user);
	const [likes, setLikes] = useState(post.likes.length);
	const [isLiked, setIsLiked] = useState(post.likes.includes(authUser?.uid));
	const showToast = useShowToast();

        const handleLikePost = async () => {
            if (isUpdating) return;
            if (!authUser) return showToast("Error", "You must be logged in to like a post", "error");
            setIsUpdating(true);
    
        try {
            
            // ** Document reference creation
            const postRef = doc(firestore,'posts',post.id);
            // ** Update Document
            //await updateDoc(docRef, { field: 'updatedValue' });
            await updateDoc(postRef, {
				likes: isLiked ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid),
			});
            // **Updating Local State
            setIsLiked(!isLiked);

            // **Updating Like Count 
            isLiked ? setLikes(likes - 1) : setLikes(likes + 1);
        } catch (error) {
            showToast("Error", error.message, "error")
        } finally{
            setIsUpdating(false);
        }
    }
    return{handleLikePost,isLiked , likes,isUpdating};
};

export default useLikePost;

//.includes(): This is a method of JavaScript arrays used to check if an array includes a certain value.[true/false]

/*The initial state value of isLiked is determined by the result of post.likes.includes(authUser?.uid).
 If the current user's uid is found in the post.likes array,isLiked will be set to true;
  otherwise, it will be set to false. */