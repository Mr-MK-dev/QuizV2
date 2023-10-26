import React from 'react'
import resPop from '../../Styles/Register/RegisterPopup.module.css';
import { Link } from 'react-router-dom';
import { setIdentity } from '../../store/identity';
import { useDispatch } from 'react-redux';


const RegisterPopup = (props) => {
  const dispatch = useDispatch();

  const selected = () => {
    props.setFirstTime(false);
  }

  return (
    <div className={resPop.respopContainer}>
      <div className={resPop.logo}>
        <img src='assets/al-azhar.png' height="150" width="150" alt='' />
      </div>
      <div className={resPop.popup}>
        <div className={resPop.cardTitle}>
          Join as a doctor or student
        </div>
        <div className={resPop.choose}>
          <label htmlFor="doctor">
            <div className={resPop.doctor}>
              <input
                type='radio'
                id="doctor"
                name="choice"
                value="instructor"
                onChange={e => dispatch(setIdentity(e.target.value))}

              />
              <p>I'm a Doctor &#x1F9D1;&#x200D;&#x1F3EB;</p>
            </div>
          </label>
          <label htmlFor="student">
            <div className={resPop.student}>
              <input
                type='radio'
                id="student"
                name="choice"
                value="student"
                onChange={e => dispatch(setIdentity(e.target.value))}
              />
              <p>I'm a Student &#x1F9D1;&#x200D;&#x1F393;</p>
            </div>
          </label>
        </div>
        <div className={resPop.actions}>
          <button onClick={selected} disabled={!props.identity}>Create Account</button>
          <p>Already have an account? <Link to='/auth/login' onClick={()=>props.setAuthType('login')}>Log In</Link></p>
        </div>
      </div>
    </div>
  )
}

export default RegisterPopup