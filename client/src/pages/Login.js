import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../Styles/Login-module.css'
import { useDispatch, useSelector } from 'react-redux'
import { resetUserProps, selectAuthType, letUserLoggedIn, emailErrors } from '../store/auth'
import { authLogin } from '../store/auth'
import LoadingIndicator from './LoadingIndicator'



const Login = (props) => {
    const [user, setUser] = useState({ email: '', password: '' })
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Set auth-type automatically
    dispatch(selectAuthType('login'));

    const { user_auth_error, loading, indicator } = useSelector((state) => state.auth);

    const backward = () => {
        navigate('/')
    }

    const handleChange = (e) => {
        const { value, name } = e.target;
        setUser({
            ...user,
            [name]: value
        })
        dispatch(emailErrors(''));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(authLogin(user));
    }

    const setUserProps = () => {
        dispatch(selectAuthType('signup'))
        dispatch(resetUserProps())
    }

    return (
        <>
            {
                indicator ? (
                    <LoadingIndicator />
                ) : (
                    <div className="loginContainer">
                        <div className="logo">
                            <img src='/assets/al-azhar.png' height="150" width="150" alt='' />
                        </div>
                        <img
                            src='/assets/Path 797.svg'
                            title='Backward'
                            className="backward"
                            onClick={backward}
                            alt=''
                        />
                        <div className="card">
                            <div className="cardTitle">
                                Log In
                            </div>
                            <form className="form" onSubmit={handleSubmit}>
                                <label className="email">
                                    <input
                                        type='email'
                                        name='email'
                                        title='person123@gmail.com'
                                        placeholder='Work email address'
                                        onChange={handleChange}
                                        required
                                    />
                                </label>
                                <label className="password">
                                    <input
                                        type='password'
                                        name='password'
                                        placeholder='Password ( 8 or more characters )'
                                        title='at least one number and one uppercase and lowercase letter, and at least 8 or more characters'
                                        onChange={handleChange}
                                        required
                                    />
                                </label>
                                <label className='checkLogin'>
                                    <input
                                        type='checkbox'
                                        name='keepLogged'
                                        onClick={() => dispatch(letUserLoggedIn())}
                                    />
                                    <span>
                                        Keep me logged in
                                    </span>
                                </label>
                                <button
                                    type='submit'
                                    className={`${user_auth_error ? "userError" : "submit"}`}
                                    disabled={user_auth_error}
                                >
                                    {
                                        user_auth_error ? (
                                            user_auth_error === 'Operation `users.findOne()` buffering timed out after 10000ms' ? 'Server Is Down Now' :
                                                user_auth_error
                                        ) : loading ? (
                                            'Loading...'
                                        ) : (
                                            'Log In'
                                        )
                                    }
                                </button>

                                <p>Don't have an account?  <Link to='/signup' onClick={setUserProps}>Sign Up</Link></p>
                            </form>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default Login