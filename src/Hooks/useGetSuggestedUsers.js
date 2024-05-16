
import { useEffect, useState } from "react";
import useAuthStore from "../store/authStore"

import useShowToast from "./useShowToast";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { firestore } from "../Firebase/firebase";


const useGetSuggestedUsers = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [suggestedUsers, setSuggestedUsers] = useState([]);   // ** empty array
    const authUser = useAuthStore(state => state.user);
    const showToast = useShowToast();

    useEffect(() => {
        const getSuggestedUsers = async () => {
            setIsLoading(true);
           

            try {
                const userRef = collection(firestore, "users");
                const q = query(
                    userRef,
                    where('uid', 'not-in', [authUser.uid, ...authUser.following]),
                    orderBy('uid'),
                    limit(3)
                );
                const querySnapshot = await getDocs(q);
                const users = [];

                querySnapshot.forEach((doc) => {
                    users.push({ ...doc.data(), id: doc.id })
                });

                setSuggestedUsers(users);

            } catch (error) {
                showToast("Error", error.message, "error");
            } finally {
                setIsLoading(false);
            }
        };

        // call this function only if authUserExists.
        if (authUser) getSuggestedUsers();

    }, [authUser, showToast]);

    return { isLoading, suggestedUsers };


};

export default useGetSuggestedUsers;

/*               
*****Get documents where a field value matches any value in an array , Limit the number of documents retrieved: :---
               
    // const querySnapshot = await getDocs( query ( collection(firestore, 'your_collection'),
                                                                where('field_name','in', ['value1', 'value2'])));  
                                                               
                 
    //const querySnapshot = await getDocs(query ( collection (firestore, 'your_collection'),
                                                             orderBy('field_name')));
               
    //const querySnapshot = await getDocs(query (  collection(firestore, 'your_collection'),
                                                                limit(5)));
               
*/