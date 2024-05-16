import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import { firestore } from "../Firebase/firebase"
import { doc , getDoc } from "firebase/firestore";

const useGetUserProfilebyId = (userId) => {

    const [isLoading, setIsLoading] = useState(true);
    const [userProfile, setUserProfile] = useState(null);
    const showToast = useShowToast();

    useEffect(() => {
        const getUserProfile = async () => {
            setIsLoading(true);
            setUserProfile(null);

            try {
                const userRef = await getDoc(doc(firestore, 'users', userId));
                if (userRef.exists()) {
                    setUserProfile(userRef.data());
                }

            } catch (error) {
                showToast('Error', error.message, 'error');
            } finally {
                setIsLoading(false);
            }
        }
        getUserProfile();

    }, [setUserProfile, showToast, userId])

    return { userProfile, isLoading, setUserProfile };
};

export default useGetUserProfilebyId;