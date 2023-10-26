import React, { useEffect } from 'react'
import Header from './Header'
import HomeBody from './HomeBody'
import home from '../Styles/Home.module.css'
import header from '../Styles/Header.module.css'
import footer from '../Styles/Footer.module.css'
import Footer from './Footer'
import { useDispatch } from 'react-redux'
import { selectAuthType } from '../store/auth'



const Home = () => {
  const dispatch = useDispatch();

  const setAuthSignUp = (type) => {
    dispatch(selectAuthType(type))
  }

  useEffect(() => {
    const removeItem = () => {
      localStorage.removeItem('__expiredTime')
    }
    removeItem();
    return () => {
      localStorage.removeItem('__expiredTime')
    }
  }, [])


  return (
    <div className={home.homeContainer}>
      <Header
        setAuthSignUp={setAuthSignUp}
        header={header}
        imageHeight="150"
        imageWidth="150"
        title="Examinations Hub"
      />
      <HomeBody setAuthSignUp={setAuthSignUp} />
      <Footer footer={footer} />
    </div>
  )
}

export default Home