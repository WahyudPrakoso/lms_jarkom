import React, { useState } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader, AppSidebarMurid } from '../components/index'
import { Navigate, useNavigate } from 'react-router-dom';

const DefaultLayout = () => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [islogin, setislogin] = useState(
    JSON.parse(localStorage.getItem("islogin")) || null
  );
  const navigate = useNavigate()
  const layout = () => {
    return (
    <div>
      {currentUser.role === '0105' ? <AppSidebar /> : <AppSidebarMurid />}
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
    )
  }
  return (
    islogin ? layout() :  <Navigate to = "/login"/> 
    
  )
}

export default DefaultLayout
