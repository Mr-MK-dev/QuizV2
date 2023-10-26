import React, { useEffect, useState } from 'react'
import daBody from '../../../Styles/Dashboard/student/Dashboard.module.css'
import QuestionBank from '../QuestionBank'
import { useDispatch, useSelector } from 'react-redux'
import { totalStudentsExamsReq } from '../../../store/studentSubmission'
import Void from '../../Void'
import { useNavigate } from 'react-router-dom'
import identityPath from '../../../utils/helpers/identityPath'
import sortByDate from '../../../utils/helpers/sortByDate'
import UserProfile from '../UserProfile'

const DashboardStu = (props) => {

  const userAdditional = JSON.parse(localStorage.getItem('additional'));
  const userId = userAdditional?.id, user_token = userAdditional?.additional?.user_token
  const [questionBank, setQuestionBank] = useState(false)

  const { totalStuExams, studentSubmitted } = useSelector((state) => state.studentSubmission)
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(totalStudentsExamsReq(user_token))
    if (studentSubmitted) dispatch(totalStudentsExamsReq(user_token))
  }, [dispatch, studentSubmitted, user_token])



  const questionsBank = () => {
    setQuestionBank(true)
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  const naivgate = useNavigate();
  const openExam = (id) => {
    localStorage.setItem('openExamId', JSON.stringify(id))
    naivgate(`${identityPath(user_token, userId)}/exam`)
  }

  let sortedData = totalStuExams ? sortByDate(totalStuExams) : [];


  return (
    <>
      {
        <div className={daBody.container}>
          <div className={daBody.leftHand}>
            <UserProfile user_token={user_token} daBody={daBody} />
            <div className={daBody.leftHandBody}>
              <p className={daBody.stCode}>Student Code: {props.stCode}</p>
              <div className={daBody.otherShortHands}>
                <div className={daBody.line}></div>
                <ul>
                  <li onClick={questionsBank}>Questions Bank</li>
                </ul>
              </div>
            </div>
          </div>
          <div className={daBody.block}>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
          </div>
          <div className={daBody.studetnExams}>
            <div className={daBody.studetnExamsDataHeader}>
              <p>Exam</p>
              <p>Title</p>
              <p>Description</p>
              <p>Score</p>
            </div>
            {
              totalStuExams?.length ? (sortedData?.map((tse) => (
                <div onClick={() => openExam(tse._id)} className={daBody.studetnExamsDataBody}>
                  <p>{tse.category}</p>
                  <p>{tse.title}</p>
                  <p>{tse.description}</p>
                  <p>{tse.score}</p>
                </div>
              ))) : (
                <Void />
              )
            }
          </div>
          <div className={questionBank ? daBody.qbOn : daBody.qbOff}>
            <QuestionBank setQuestionBank={setQuestionBank} />
          </div>
        </div>
      }
    </>
  )
}

export default DashboardStu