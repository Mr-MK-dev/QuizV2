import React, { useState } from 'react'
import signup from '../../Styles/Register/Signup.module.css';
import { Link } from 'react-router-dom';
import { authSignup, selectAuthType } from '../../store/auth';
import { useDispatch } from 'react-redux';
import { emailErrors } from '../../store/auth';

const Signup = (props) => {
  const [user, setUser] = useState({ firstName: '', lastName: '', email: '', password: '', role: props.identity, code : '' })

  const dispatch = useDispatch();
  dispatch(selectAuthType('signup'));

  const backward = () => {
    props.setFirstTime(true)
  }

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({
      ...user,
      [name]: value
    });
    dispatch(emailErrors(''));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(authSignup(user))
  }

  console.log(user)

  return (
    <div className={signup.signupContainer}>
      <div className={signup.logo}>
        <img src='assets/al-azhar.png' height="150" width="150" alt='' />
      </div>
      <img
        src='assets/Path 797.svg'
        title='Backward'
        className={signup.backward}
        onClick={backward}
        alt=''
      />
      <div className={signup.card}>
        <div className={signup.cardTitle}>
          Sign up as {props.identity === 'student' ? 'a' : 'an'} {props.identity}
        </div>
        <form className={signup.form} onSubmit={handleSubmit}>
          <label className={signup.firstName}>
            <input
              type='text'
              name='firstName'
              value={user.firstName}
              onChange={handleChange}
              placeholder='First Name'
              required
            />
          </label>
          <label className={signup.lastName}>
            <input
              type='text'
              name='lastName'
              value={user.lastName}
              onChange={handleChange}
              placeholder='Last Name'
              required
            />
          </label>

          <label className={signup.email}>
            <input
              type='email'
              name='email'
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              title='person123@gmail.com'
              value={user.email}
              onChange={handleChange}
              placeholder='Work email address'
              required
            />
          </label>

          <label className={signup.password}>
            <input
              type='password'
              name='password'
              value={user.password}
              onChange={handleChange}
              placeholder='Password ( 8 or more characters )'
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
              required
            />
          </label>
          <label className={signup.code}>
            <input
              type='number'
              name='code'
              value={user.code}
              onChange={handleChange}
              placeholder='College Code'
              title={props.identity === 'instructor' ? 'Instructor Code' : 'Student Code'}
              required
            />
          </label>
          {
            // props.identity === 'instructor' ? (
            //   <label className={signup.key}>
            //   </label>
            // ) : (
            //   <label className={signup.id}>
            //   </label>
            // )
          }
          <button
            type='submit'
            className={`${props.user_auth_error ? signup.userExists : (props.loading ? signup.loading : signup.submit)}`}
            disabled={props.user_auth_error || props.loading}
          >
            {
              props.user_auth_error ? (
                <>
                  &#9888;
                  {/* &#9888; {props.user_auth_error}...try again */}
                  {
                    props.user_auth_error === 'Operation `users.findOne()` buffering timed out after 10000ms' ? 'Server Is Down Now' :
                      props.user_auth_error
                  }
                </>
              ) : props.loading ? ('Loading...') : (
                'Create Acount'
              )
            }
          </button>
          <p>Already have an account? <Link to='/auth/login' onClick={() => props.setAuthType('login')}>Log In</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Signup