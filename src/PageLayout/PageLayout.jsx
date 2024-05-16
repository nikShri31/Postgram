
import { Box, Flex, Spinner } from "@chakra-ui/react";
import Sidebar from "../Components/Sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import Navbar from '../Components/Navbar/Navbar';
import { auth } from '../Firebase/firebase';


const PageLayout = ({ children }) => {
  
  const { pathname } = useLocation();  //The path of the current URL.
  const [user, loading] = useAuthState(auth);
  const renderSidebar = pathname !== "/auth" &&  user;   // SideBar

  const renderNavbar = !user && !loading && pathname !== "/auth"; // Navbar

  const checkAuthLoading = !user && loading;
  if (checkAuthLoading) return <PageLayoutSpinner />
  
  return (
    <Flex flexDir={renderNavbar ? "column" : "row"}>

      {/* SIDEBAR on the left */}
      {renderSidebar ? (
        <Box w={{ base: "70px", md: "240px" }}>
          <Sidebar />
        </Box>
      ) : null}

      { /* NAVBAR */}
      {renderNavbar ? <Navbar /> : null}

      {/* PAGE & USERS CONTENT on right */}
      <Box flex={1} w={{ base: "calc(100% - 70px)", md: "calc(100% - 240px)" }} mx={"auto"}>
        {children}
      </Box>
    </Flex>
  )
}

export default PageLayout;

const PageLayoutSpinner = () => {

  return (
    <Flex flexDir='column' h='100vh' alignItems='center' justifyContent='center'>
      <Spinner size='xl' />
    </Flex>
  );
};