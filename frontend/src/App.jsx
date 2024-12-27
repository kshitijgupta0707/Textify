
import Navbar from "./components/Navbar"
import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import SignUpPage from "./pages/SignUpPage"
import LoginPage from "./pages/LoginPage"
import SettingsPage from "./pages/SettingsPage"
import ProfilePage from "./pages/ProfilePage"
import { Navigate } from "react-router-dom"
import { Loader } from "lucide-react"
import { Toaster } from "react-hot-toast"
import ExtremeSideBar from "./components/ExtremeSideBar"
import { useAuthStore } from "./store/useAuthStore"
import { useThemeStore } from "./store/useThemeStore"
import { useEffect } from "react"
import { useState } from "react"
import { useNotification } from "./store/useNotification"
const App = () => {
 
 

 const {isVisible , setIsVisible , message } = useNotification()

  const { authUser, checkAuth, isCheckingAuth, onlineUsers , socket } = useAuthStore()
  const { theme, setTheme } = useThemeStore()
  useEffect(() => {
    console.log("onlineUsers : ", onlineUsers)
  }, [onlineUsers])
  //when the appliation start it is called
  useEffect(() => {
    console.log("i am checking that you are authenticated or not")
    checkAuth()
  }, [checkAuth])

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );


   


  return (
    <div data-theme={theme} className="flex flex-col  self-center content-center m-auto"  >
      <Navbar />

      {isVisible && (
        <div className="z-50 fixed left-[50%] -translate-x-1/2 lg:w-[600px]">
          <div role="alert" className="alert shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-info h-6 w-6 shrink-0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <div>
              <h3 className="font-bold">Notification</h3>
              <div className="text-xs">{message}</div>
            </div>
            <button className="btn btn-sm" onClick={() => setIsVisible(false)}>
              Close
            </button>
          </div>
        </div>
      )}




     

      <Routes>


        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>
      <Toaster />


    </div>
  )
}

export default App