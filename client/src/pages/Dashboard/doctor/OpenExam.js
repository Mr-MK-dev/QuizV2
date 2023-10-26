import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openExamDrReq } from '../../../store/openExamsFtDr'
import DashboardHeader from '../DashboardHeader'
import openEx from '../../../Styles/Dashboard/doctor/OpenExam.module.css'
import Void from '../../Void'
import LoadingIndicator from '../../LoadingIndicator'
const OpenExam = (props) => {

    const dispatch = useDispatch()
    const { openedExam, loading } = useSelector((state) => state.openExamDrSlice)


    useEffect(() => {
        let localExamId = JSON.parse(localStorage.getItem('openExamId'));
        dispatch(openExamDrReq(localExamId))
    }, [dispatch])



    return (
        <div className={openEx.container}>
            {
                loading ? <LoadingIndicator /> : (
                    <>
                        <DashboardHeader header={openedExam.title} />
                        <div className={openEx.examHeader}>
                            <h1 title={openedExam.title}>{openedExam.title}</h1>
                            <div className={openEx.examData}>
                                <p>{openedExam.category}</p>
                                <p title={openedExam.description}>{openedExam.description}</p>
                                <p>{openedExam.createdAt}</p>
                            </div>
                        </div>
                        <div className={openEx.questionsContainer}>
                            {
                                openedExam?.questions?.length > 0 ? (openedExam?.questions?.map((question) => (
                                    <div className={openEx.question}>
                                        <h1>{question.question}</h1>
                                        {
                                            question.type === 'open_ended' ? '' : (
                                                <span><strong>Answer</strong>: `{question.correctAnswer + ''}`</span>
                                            )
                                        }
                                        <ul>
                                            {
                                                question.type === 'open_ended' ? (
                                                    <p className={openEx.openEndedAnswer}>{question.correctAnswer}</p>
                                                ) : (
                                                    question?.options.map((option) => (
                                                        <li className={question.correctAnswer + '' === option ? openEx.option : ''} key={option}>{option}</li>
                                                    )))
                                            }
                                        </ul>
                                    </div>
                                ))) : (
                                    <Void />
                                )
                            }
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default OpenExam