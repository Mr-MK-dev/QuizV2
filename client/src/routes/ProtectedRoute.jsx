import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {

  useEffect(() => {
    document.body.dir = "ltr";
    document.title = "Examinations Hub"
  }, [])

  let user_token = JSON.parse(localStorage.getItem('additional'))?.additional?.user_token;
  let localUserPath = JSON.parse(localStorage.getItem('dashboard-sub-path'));
  if (!user_token || !localUserPath) {
    return <Navigate to="/" />
  }
  return (
    <Outlet />
  )
}

export default ProtectedRoute