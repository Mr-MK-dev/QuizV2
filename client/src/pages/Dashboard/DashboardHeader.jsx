import React, { useEffect, useState } from 'react'
import daHeader from '../../Styles/Dashboard/Dash_Header.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteQuestionPrompt } from '../../store/questionActions';
import logoutUser from '../Logout';

const DashboardHeader = ({ header }) => {
    const [logoutPopup, setLogoutPopup] = useState(false)
    const { deletion_is_done, addition_is_done } = useSelector((state) => state.questionActions)
    const additional = JSON.parse(localStorage.getItem('additional'))
    const role = additional?.additional.role;
    const name = additional?.additional.name
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const setUserName = (name) => {
        let op = name.split(" ");
        return `${op[0][0]}${op[1][0]}`.toUpperCase()
    }


    useEffect(() => {
        setTimeout(() => {
            if (deletion_is_done || addition_is_done) {
                dispatch(deleteQuestionPrompt())
            }
        }, 1000)
    }, [addition_is_done, deletion_is_done, dispatch])

    const importedlogout = () => {
        logoutUser(dispatch, navigate)
    }

    return (
        <div className={daHeader.container}>
            <div className={daHeader.logo}>
                <img src='/assets/al-azhar.png' height="55" width="55" alt='' />
            </div>
            <div className={daHeader.middle}>
                <p>
                    {header}
                    <span>
                        {
                            role === "instructor" ? 'instructor' : 'student'
                        }
                    </span>
                </p>
            </div>
            <div className={daHeader.profile}>
                {
                    logoutPopup &&
                    <div className={daHeader.logout}>
                        <button
                            onClick={importedlogout}
                        >
                            LOGOUT
                        </button>
                    </div>
                }
                <p onClick={() => setLogoutPopup(!logoutPopup)}>
                    {/* MA */}
                    {setUserName(name)}
                </p>
            </div>
            {
                deletion_is_done &&
                <div className={daHeader.response}>
                    <p>
                        Question's Deleted Successfully!
                    </p>
                </div>
            }
            {
                addition_is_done &&
                <div className={daHeader.response}>
                    <p>
                        Question's Added Successfully!
                    </p>
                </div>
            }
        </div>
    )
}

export default DashboardHeader
