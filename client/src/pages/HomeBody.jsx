import React from 'react'
import about from '../Styles/HomeBody.module.css'
import { Link } from 'react-router-dom'
import LazyImage from '../components/lazyLoading/LazyImage'


let styles = {
    sectionOne: about.section + " " + about.one,
    sectionTwo: about.section + " " + about.two,
    sectionThree: about.section + " " + about.three
}
const HomeBody = (props) => {
    const register = () => {
        props.setAuthSignUp('signup');
    }
    return (
        <div className={about.aboutContainer}>
            <div className={styles.sectionOne}>
                <div className={about.ex}>
                    <h1>Ultimate Online Tests Hub!</h1>
                    <p>
                        Welcome to our examination website, where success awaits your journey. We understand that examinations can be both exciting and challenging, and that's why we've crafted an intuitive platform to support your academic endeavors.
                    </p>
                    <Link to='/signup' onClick={register}>
                        <p className={about.explore}>
                            Explore Now
                        </p>
                    </Link>
                </div>
                <LazyImage url='assets/online-exam.png' height="300" width="500" />
            </div>
            <div className={styles.sectionTwo}>
                <LazyImage url='assets/doctormarked.jpg' height="300" width="500" />
                <div className={about.ex}>
                    <h1>Take The Advantages Of That Community!</h1>
                    <p>
                        We have strived to create an inclusive
                        learning environment by offering comprehensive explanations and
                        supplemental resources alongside each quiz question.
                        This way,
                        you can deepen your understanding of the concepts and principles
                        behind Electrical Engineering,
                        making your learning experience more enriching and rewarding.
                    </p>
                </div>
            </div>
            <div className={styles.sectionThree}>
                <div className={about.ex}>
                    <h1>Reliable Secure & Supportive!</h1>
                    <p>
                        As you embark on this transformative experience,
                        rest assured that our website is secure, reliable, and built to support your success. So, dive in, explore, and let our examination website be your trusted companion in your pursuit of knowledge and achievement.
                        Happy learning!
                    </p>
                    <Link to='/signup' onClick={register}>
                        <p className={about.explore}>
                            Start Here
                        </p>
                    </Link>
                </div>
                <LazyImage url='assets/1000_F_569845170_QLp8dKvnDGKTDx1SKRBmB0EAk6fb8sCR.jpg' height="400" width="600" />
            </div>
        </div>
    )
}

export default HomeBody