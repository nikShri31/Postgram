
import { Flex, Image, Text } from "@chakra-ui/react";
import { auth, firestore } from "../../Firebase/firebase";
import useShowToast from "../../Hooks/useShowToast";
import useAuthStore from "../../store/authStore";

import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { doc, getDoc, setDoc } from "firebase/firestore";


const GoogleAuth = ({ prefix }) => {

  const showToast = useShowToast();
  const loginUser = useAuthStore((state) => state.login);
  const [signInWithGoogle, , error] = useSignInWithGoogle(auth);

  const handleGoogleAuth = async() => {
    try {
      const newUser = await signInWithGoogle();
      if (!newUser && error) {
        showToast("Error", error.message, "error");
        return;
      }

      // /*** Fixing Google Auth Issue ***/ --->  by Get A Document
      //const docRef = doc(db, "cities", "SF");
      //const docSnap = await getDoc(docRef);

      const userRef = doc(firestore, "users", newUser.user.uid);
      /* The doc() function is typically used in Firebase Firestore to reference a document.
       In this case, it's referencing a document located in the "users" collection with the uid (user ID) from newUser.user. */

      const userSnap = await getDoc(userRef);
      /*This line retrieves the document snapshot for the document referenced by userRef. 
      It uses the getDoc() function to fetch the document snapshot asynchronously.  */
      if (userSnap.exists()) {
        //Login
        const userDoc = userSnap.data();
        localStorage.setItem('user-info', JSON.stringify(userDoc));
        loginUser(userDoc);
      }

      else {
        //SignUp
        const userDoc = {
          uid: newUser.user.uid,
          email: newUser.user.email,
          username: newUser.user.email.split("@")[0],
          fullName: newUser.user.displayName,
          bio: "",
          profilePicURL: newUser.user.profilePicURL,
          followers: [],
          following: [],
          posts: [],
          createdAt: Date.now(),
        };
        await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
        localStorage.setItem("user-info", JSON.stringify(userDoc));

        loginUser(userDoc);
      }
    }
    catch (error) {
      showToast("Error", error.message, "error");
    }

  };
  return (
    <Flex
      alignItems={"center"} justifyContent={"center"}
      cursor={"pointer"}
      onClick={handleGoogleAuth}
    >
      <Image src='/google.png' w={5} alt='Google logo' />
      <Text mx='2' color={"blue.500"}>
        {prefix} with Google
      </Text>
    </Flex>
  );
};

export default GoogleAuth;