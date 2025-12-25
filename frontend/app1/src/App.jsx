
import Home from './pages/Home';
import Profile from './pages/Profile';
import Courses from './pages/Courses';
import { Navigate, Route,Routes } from 'react-router';
import Login from './pages/Login';
import Register from './pages/Register';
import { ToastContainer } from 'react-toastify';
import LandingPage from './pages/LandingPage';
import { createContext, useState } from 'react';
import ChangePassword from './pages/ChangePassword';

export const loginContext=createContext()
function App() {
  const [loginStatus,setLoginStatus]=useState(false)
  return (
      <>
      <loginContext.Provider value={{loginStatus,setLoginStatus}}>
        <Routes>
          <Route path='/*' element={<LandingPage />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/home' element={loginStatus ? <Home /> : <Navigate to="/" />}/>
          <Route path='/profile' element={loginStatus ? <Profile /> : <Navigate to="/" />}/>
          <Route path='/Courses' element={loginStatus ? <Courses /> : <Navigate to="/" />}/>
          <Route path='/change-password' element={loginStatus ? <ChangePassword /> : <Navigate to="/" />}/>
        </Routes>

        </loginContext.Provider>
         {/* <h1>hello from react</h1>
          <Home></Home>
          <Profile></Profile>
          <Courses></Courses> */}
          <ToastContainer theme='colored'/> 
      </>
  )
}

export default App
