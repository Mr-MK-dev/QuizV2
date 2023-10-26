import Cookies from 'js-cookie';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Header = (props) => {
  const { setAuthSignUp, header, imageHeight, imageWidth, title, lang } = props;
  const navigate = useNavigate();
  const currentLang = Cookies.get('i18next') || 'en';

  const register = () => {
    navigate('/signup');
    setAuthSignUp('signup');
  }

  const login = () => {
    setAuthSignUp('login');
  }
  return (
    <div className={header.headerContainer}>
      <div className={header.logo}>
        <img src='assets/al-azhar.png' height={imageHeight} width={imageWidth} alt='' />
      </div>
      <div className={header.title}>
        <p>
          {title}
        </p>
      </div>
      <div className={`${header.login} ${currentLang === 'ar' ? header.loginAr : header.loginEn}`}>
        <Link to="/auth/login" onClick={login} className={header.link}>{lang ? lang('log-in') : 'Log In'}</Link>
        <button onClick={register}>{lang ? lang('sign-up') : 'Sign Up'}</button>
      </div>
    </div>
  )
}

export default Header