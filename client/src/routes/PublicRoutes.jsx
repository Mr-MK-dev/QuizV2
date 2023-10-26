import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';


const PublicRoutes = () => {


  useEffect(()=>{
    document.body.dir = "ltr";
    document.title = "Examinations Hub"
  },[])


    const { auth_type } = useSelector((state) => state.auth);
    let localUser = JSON.parse(localStorage.getItem('additional'));
    let localUserPath = JSON.parse(localStorage.getItem('dashboard-sub-path'));
    let lockRoutes = JSON.parse(localStorage.getItem('lock-routes'))
    if (localUser) {
        if (lockRoutes && (auth_type === 'authorized' || localUser)) {
            return <Navigate to={`/v1/${localUserPath}/on-board`} />
        }
    }
    return (
        <Outlet />
    )
}

export default PublicRoutes