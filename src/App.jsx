
import { Navigate, Route, Routes } from "react-router-dom";

import { useAuthState } from "react-firebase-hooks/auth";
import AuthPage from "./Pages/AuthPage"
import Home from "./Pages/Home"
import PageLayout from "./PageLayout/PageLayout";

import ProfilePage from "./Pages/ProfilePage";
import { auth } from "./Firebase/firebase";



function App() {

  const [authUser] = useAuthState(auth);

  

    return (
      <PageLayout>
        <Routes>
          <Route path='/' element={authUser ? <Home /> : <Navigate to='/auth' />} />
          <Route path='/auth' element={!authUser ? <AuthPage /> : <Navigate to='/' />} />
          <Route path='/:username' element={<ProfilePage />} />
        </Routes>
      </PageLayout>
    );
  }
  

export default App;
