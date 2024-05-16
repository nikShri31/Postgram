
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import useShowToast from './useShowToast';
import { doc, getDoc } from "firebase/firestore";
import { auth, firestore } from '../Firebase/firebase';
import useAuthStore from '../store/authStore';

const useLogin = () => {
    const [
        signInWithEmailAndPassword,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const showToast = useShowToast();
    const loginUser = useAuthStore((state) => state.login);

    const login = async (inputs) => {
		if (!inputs.email || !inputs.password) {
			return showToast("Error", "Please fill all the fields", "error");
		}
		try {
			const userCred = await signInWithEmailAndPassword(inputs.email, inputs.password);

			if (userCred) {
				const docRef = doc(firestore, "users", userCred.user.uid);
				const docSnap = await getDoc(docRef);
				localStorage.setItem("user-info", JSON.stringify(docSnap.data()));
				loginUser(docSnap.data());
			}
		} catch (error) {
			showToast("Error", error.message, "error");
		}
	};

	return { loading, error, login };
};
export default useLogin;

{/*
*In summary, the code is saving user information retrieved from docSnap.data() into the browser's localStorage under the key "user-info",
 and then it's passing the same data to a function named loginUser.
It might be responsible for handling the login process or performing some actions related to user authentication. 
*/}