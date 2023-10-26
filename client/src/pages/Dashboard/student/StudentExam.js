import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import openEx from '../../../Styles/Dashboard/doctor/OpenExam.module.css'
import LoadingIndicator from '../../LoadingIndicator';
import { studetnAlreadySubmitted, submitAnswersReq } from '../../../store/studentSubmission';
import CountdownTimer from '../../../components/CountDown';


const StudentExam = (props) => {
  const [answers, setAnswers] = useState([])
  const [questionindex, setQuestionindex] = useState(0)
  const [questionNum, setQuestionNum] = useState(1)
  const { exam } = useSelector((state) => state.studentExam)
  const { openedExam, loading } = useSelector((state) => state.openExamDrSlice)
  const { timeRanOut } = useSelector((state) => state.studentSubmission)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const token = JSON.parse(localStorage.getItem('additional')).additional.user_token;
  const currentQuestion = openedExam?.questions && openedExam?.questions[questionindex]
  const dispatch = useDispatch();

  const nextQues = () => {
    if (questionindex <= exam?.questions?.length) {
      setQuestionindex((prev) => prev + 1)
    }
    if (questionNum === exam?.questions?.length) {
      setQuestionNum(exam?.questions?.length)
    } else {
      setQuestionNum((prev) => prev + 1)
    }
    setAnswers([...answers, selectedAnswer])
    setSelectedAnswer('')
  }

  const selectAns = (ans) => {
    setSelectedAnswer(ans)
  }


  const stuSubmit = { answers, token, examId: exam._id }
  const submitAns = () => {
    dispatch(submitAnswersReq(stuSubmit))
    dispatch(studetnAlreadySubmitted())
  }

  useEffect(() => {
    if (timeRanOut) {
      dispatch(submitAnswersReq(stuSubmit))
      dispatch(studetnAlreadySubmitted())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, timeRanOut])




  console.log(exam)
  return (
    <div>
      <div className={openEx.examTimeContainer}>
        {
          loading ? <LoadingIndicator /> : (
            <>
              <div className={openEx.examHeaderExaTime}>
                <div className={openEx.titleAndDes}>
                  <p>
                    {openedExam?.title}
                  </p>
                </div>
                <div className={openEx.examDataExamTime}>
                  <p>{openedExam?.category}</p>
                  <p>{currentQuestion?.type}</p>
                  <CountdownTimer />
                  {
                    answers.length === exam?.questions?.length ? (
                      <button onClick={submitAns}>Submit</button>
                    ) : (
                      <button onClick={nextQues} disabled={!selectedAnswer}>Next question</button>
                    )
                  }

                </div>
              </div>
              <div className={openEx.questionsContainerExaTime}>
                {
                  answers.length === exam?.questions?.length ? (
                    <p className={openEx.quesFinished}>Questions Are Finished!</p>
                  ) : (
                    <>
                      <div className={openEx.questionExamTime}>
                        <p>Question {questionNum} of {exam?.questions?.length}</p>
                        <p>{currentQuestion?.question}</p>
                      </div>
                      <div className={openEx.optionsExamTime}>

                        <ul>
                          {
                            currentQuestion?.type === 'open_ended' ? (
                              <textarea value={selectedAnswer} onChange={(e) => setSelectedAnswer(e.target.value)}></textarea>
                            ) : (
                              currentQuestion?.options?.map((option) => (
                                <li
                                  className={
                                    (selectedAnswer === option)
                                      ? openEx.selected : ''
                                  }
                                  key={option}
                                  onClick={() => selectAns(option)}
                                >
                                  {option}
                                </li>
                              )))
                          }
                        </ul>
                      </div>
                    </>
                  )
                }

              </div>
            </>
          )
        }
      </div>
    </div>
  )
}

export default StudentExam;