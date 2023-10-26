import React, { useState } from 'react'
import RegisterPopup from './RegisterPopup';
import Signup from './Signup';
import { useSelector, useDispatch } from 'react-redux';
import { resetUserProps, selectAuthType } from '../../store/auth';
import CreateProfile from './CreateProfile';

const RegisterHome = () => {
    const [firstTime, setFirstTime] = useState(true);
    const dispatch = useDispatch();
    const { identity } = useSelector((state) => state.identity);
    const { user_auth_error, loading, auth_type } = useSelector((state) => state.auth);


    const setAuthType = (type) => {
        dispatch(selectAuthType(type))
        dispatch(resetUserProps())
    }
    return (
        <div>
            {
                auth_type === 'createProfile' ? (
                    <CreateProfile
                        setAuthType={setAuthType}
                    />
                ) : (
                    firstTime ? (
                        <RegisterPopup
                            setFirstTime={setFirstTime}
                            identity={identity}
                            setAuthType={setAuthType}
                        />
                    ) : (
                        <Signup
                            identity={identity}
                            setFirstTime={setFirstTime}
                            user_auth_error={user_auth_error}
                            loading={loading}
                            setAuthType={setAuthType}
                        />
                    )
                )
            }
            {

            }
        </div>
    )
}

export default RegisterHome