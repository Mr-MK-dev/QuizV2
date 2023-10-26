import React, { useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import { useDispatch } from 'react-redux';
import { selectAuthType } from '../store/auth';
import about from '../Styles/About.module.css'
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';

const About = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation()
  const currentLang = Cookies.get('i18next') || 'en'

  const setAuthSignUp = (type) => {
    dispatch(selectAuthType(type))
  }
  const handleChangeLang = (lang) => {
    i18n.changeLanguage(lang);
  }
  useEffect(() => {
    if (currentLang === 'ar') {
      document.body.dir = "rtl";
    } else {
      document.body.dir = "ltr";
    }
  }, [currentLang])
  useEffect(() => {
    document.title = t('title')
  }, [t])

  return (
    <div className={about.aboutContainer}>
      <Header
        setAuthSignUp={setAuthSignUp}
        header={about}
        imageHeight="80"
        imageWidth="80"
        title=""
        lang={t}
      />
      <div className={about.aboutBody}>
        <div className={about.controls}>
        <button disabled={currentLang === "ar"} onClick={() => handleChangeLang('ar')}>Arabic</button>
        <button disabled={currentLang === "en"} onClick={() => handleChangeLang('en')}>English</button>
        </div>
        <div>
        <h1 className={about.title}>{t('ex-hub')}</h1>
        <h1>
          {t('h1')}
        </h1>
        </div>
        {/* Section 1 */}
        <section>
          <span className={`${about.sectionHead} ${currentLang === 'ar' ? about.sectionHeadAr : about.sectionHeadEn}`}>
            {t('first-section-first-span')}
          </span>
          <span className={about.sectionBody}>
            {t('first-section-sec-span-p1')}
          </span>
          <span className={about.sectionBody}>
          {t('first-section-sec-span-p2')}
          </span>
        </section>
        {/* Section 2 */}
        <section className={about.sec2}>
          <span className={`${about.sectionHead} ${currentLang === 'ar' ? about.sectionHeadAr : about.sectionHeadEn}`}>
            {t('sec-setion-first-span')}
          </span>
          <span className={about.sectionBody}>
            {t('sec-section-sec-span-p1')}
          </span>
          <span className={about.sectionBody}>
            {t('sec-section-sec-span-p2')}
          </span>
        </section>
        {/* Section3 */}
        <section className={about.section34}>
          <span className={`${about.sectionHead} ${currentLang === 'ar' ? about.sectionHeadAr : about.sectionHeadEn}`}>
            {t('3rd-section-first-span')}
          </span>
          <span className={about.sectionBody}>
            {t('3rd-section-sec-span')}
          </span>
        </section>
        {/* Section 4 */}
        <section className={about.section34}>
          <span className={`${about.sectionHead} ${currentLang === 'ar' ? about.sectionHeadAr : about.sectionHeadEn}`}>
            {t('4th-section-first-span')}
          </span>
          <span className={about.sectionBody}>
            {t('4th-section-sec-span')}

          </span>
        </section>
      </div>
      <Footer footer={about} />
    </div>
  )
}

export default About