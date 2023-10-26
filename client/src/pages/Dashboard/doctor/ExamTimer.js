import React from 'react'
import daBody from '../../../Styles/Dashboard/doctor/Dashboard.module.css'
import { useSelector } from 'react-redux'
import CountdownTimer from '../../../components/CountDown'

const ExamTimer = () => {
    const { exam } = useSelector((state) => state.studentExam)
    return (
        <div className={daBody.published}>
            <div className={daBody.publishedInner}>
                <h4>Published Exam</h4>
                <div className={daBody.relation}></div>
                <p className={daBody.title}>
                    {exam?.title}
                </p>
                <p className={daBody.description}>
                    {exam?.description}
                </p>
                <p className={daBody.category}>
                    {exam?.category}
                </p>
                <p className={daBody.countdown}>
                    <CountdownTimer />
                </p>
            </div>
        </div>
    )
}

export default ExamTimer