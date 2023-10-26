import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import identityPath from '../utils/helpers/identityPath';
import indicator from '../Styles/LoadingIndicator.module.css'
import { endIndicator } from '../store/auth';

const LoadingIndicator = () => {
    const { auth } = useSelector((state) => state);
    const navigate = useNavigate();
    const dispatch = useDispatch();



    useEffect(() => {
        if (auth.auth_type === 'login')
            setTimeout(() => {
                dispatch(endIndicator())
                navigate(identityPath(auth.user_token, auth.user._id));
            }, 2000)
    }, [auth.auth_type, auth.user._id, auth.user_token, dispatch, navigate])


    return (
        <div className={indicator.container}>
            <div className="logo">
                <img src='/assets/al-azhar.png' height="150" width="150" alt='' />
            </div>
            <div className={indicator.loaderContainer}>
                <div className={indicator.loader}>
                </div>
            </div>
        </div>
    )
}

export default LoadingIndicator