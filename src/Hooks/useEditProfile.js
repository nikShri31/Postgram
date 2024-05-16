import { useState } from "react";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { getDownloadURL, ref, uploadString } from "firebase/storage"; // upload from a string
import { firestore, storage } from "../Firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import useUserProfileStore from "../store/userProfileStore";


const useEditProfile = () => {
    const [isUpdating, setIsUpdating] = useState(false);
    const authUser = useAuthStore(state => state.user);
    const setAuthUser = useAuthStore(state => state.setUser);              //setUser
    const setUserProfile = useUserProfileStore(state => state.setUserProfile);
    const showToast = useShowToast();

    const editProfile = async (inputs, selectedFile) => {

        if (isUpdating || !authUser) return;
        setIsUpdating(true);

        //const storage = getStorage();
        const storageRef = ref(storage, `profilePics/${authUser.uid}`);  // shown in  firebase Storage upload from string
        const userDocRef = doc(firestore, 'users', authUser.uid);

       let URL ="";
        try {
            if(selectedFile){
                await uploadString(storageRef, selectedFile, "data_url"); // remember firebase Storage
                URL = await getDownloadURL(ref(storage, `profilePics/${authUser.uid}`));
            }
            const updatedUser = {
                ...authUser,
                fullName: inputs.fullName || authUser.fullName,
                username: inputs.username || authUser.username,
                bio: inputs.bio || authUser.bio,
                profilePicURL: URL || authUser.profilePicURL     // got our new URL above by storage
            };

            await updateDoc(userDocRef, updatedUser);  // update document by firebase
            localStorage.setItem("user-info", JSON.stringify(updatedUser));
            setAuthUser(updatedUser);
            setUserProfile(updatedUser);
            showToast('Success ', "Profile updated Successfully ", 'success');

            console.log(updatedUser);
        }
        catch (error) {
            showToast("Error", error.message, "error");
        }
    }
    return { editProfile, isUpdating };
};

export default useEditProfile;