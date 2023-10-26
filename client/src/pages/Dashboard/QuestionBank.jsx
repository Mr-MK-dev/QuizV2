import React, { useEffect, useRef, useState } from 'react'
import { questionsBankData } from '../../store/questionsBank'
import { useDispatch, useSelector } from 'react-redux'
import qbStyle from '../../Styles/Dashboard/QestionsBank.module.css'
import Void from '../Void'
import QuestionForm from './doctor/QuestionForm'
import { deleteQuestionUThunk } from '../../store/questionActions'


const QuestionBank = (props) => {

  const [lectureNum, setLectureNum] = useState(1)
  const [addQuestion, setAddQuestion] = useState(false)
  const [choised, setchoised] = useState(false)
  const [questionIsAdded, setQuestionIsAdded] = useState(false)  //instant response
  const [deleteQuestion, setDeleteQuestion] = useState(false)
  const [questionsIDs, setQuestionsIDs] = useState([])
  const [questionIsDeleted, setQuestionIsDeleted] = useState(false)  //instant response
  const inputValue = useRef(null)
  const dispatch = useDispatch();
  const { questions } = useSelector((state) => state.qbState)
  const { createExamMode } = useSelector((state) => state.createExams) || JSON.parse(localStorage.getItem('createExamMode'))?.examMode
  console.log(createExamMode)

  const { role } = JSON.parse(localStorage.getItem('additional'))?.additional;

  console.log(role)

  useEffect(() => {
    setTimeout(() => {
      dispatch(questionsBankData(lectureNum))
    }, 1000)
  }, [dispatch, lectureNum, questionIsAdded, questionIsDeleted])


  const exit = () => {
    props.setQuestionBank(false);
    setAddQuestion(false)
    setchoised(false)
  }

  const handleChange = () => {
    setLectureNum(inputValue.current.value)
  }

  const addQuestionSwitch = () => {
    setAddQuestion(!addQuestion)
    if (choised) setchoised(false)
    window.scrollTo(0, 0)
  }

  console.log(typeof lectureNum)
  console.log(questionIsAdded)


  const deleteSwitch = () => {
    setDeleteQuestion(true);
    if (deleteQuestion) setDeleteQuestion(false);
  }


  console.log(questionsIDs)

  let ids = [];
  const handleCheckedboxes = (e) => {
    ids = [...questionsIDs]
    if (e.target.checked) {
      ids = [...questionsIDs, e.target.value]
    } else {
      ids.splice(questionsIDs.indexOf(e.target.value), 1);
    }
    setQuestionsIDs(ids)
    setQuestionIsDeleted(true)
  }

  const deleteQuestions = () => {
    for (let id of questionsIDs) {
      dispatch(deleteQuestionUThunk(id))
    }
    setQuestionsIDs([])
    setQuestionIsDeleted(false)
  }

  console.log(ids)

  return (
    <div className={qbStyle.container}>
      <div className={qbStyle.qbHead}>
        <h1>
          Questions Bank
        </h1>
        <div className={qbStyle.lecNum}>
          Lecture Number:
          <input
            ref={inputValue}
            type='number'
            min="1"
            name='lectureNumber'
            id="lectureNumber"
            value={lectureNum}
            onChange={handleChange}
            disabled={addQuestion || choised}
          />
        </div>
        {/* Instructor */}
        {
          role === 'instructor' ? (
            <>
              {
                !deleteQuestion &&
                <button onClick={addQuestionSwitch}>
                  {
                    addQuestion || choised ? 'Cancel' : 'Add'
                  }
                </button>
              }
              <button onClick={deleteSwitch}>
                {
                  deleteQuestion ? 'Cancel' : 'Delete'
                }
              </button>
              {
                deleteQuestion ? <button
                  onClick={deleteQuestions}
                  disabled={!questionIsDeleted || questionsIDs.length === 0}
                >Delete</button> : ''
              }
            </>
          ) : ('')
        }
        {
          (!deleteQuestion || !createExamMode) &&
          <img
            src="/assets/Group 1440.svg"
            title='close Questions Bank'
            className={qbStyle.exit}
            onClick={exit}
            alt='Exit'
          />
        }
      </div>

      <div className={qbStyle.questions}>
        {
          addQuestion || choised ? (
            <QuestionForm
              choised={choised}
              setchoised={setchoised}
              addQuestion={addQuestion}
              setAddQuestion={setAddQuestion}
              lectureNum={lectureNum}
              questionIsAdded={questionIsAdded}
              setQuestionIsAdded={setQuestionIsAdded}
            />

          ) : (

            questions?.length > 0 ? (
              questions.map((question) => (
                <div className={qbStyle.question} key={question?._id}>
                  <div className={qbStyle.questionHead}>

                    {
                      deleteQuestion ?
                        <label
                          className={qbStyle.deleteQuestion}
                          htmlFor={question?._id}
                        >
                          <input
                            type='checkbox'
                            name='checked'
                            id={question?._id}
                            value={question?._id}
                            onChange={(e) => handleCheckedboxes(e)}
                          />
                          <span>
                            Delete This Question
                          </span>
                        </label>
                        : ''
                    }

                    <p>{question.question}</p>
                    {
                      question.type === 'open_ended' ? '' : (
                        <span><strong>Answer</strong>: `{question.correctAnswer + ''}`</span>
                      )
                    }
                  </div>
                  <div className={qbStyle.questionBody}>
                    <ul>
                      {
                        question.type === 'open_ended' ? (
                          <p className={qbStyle.openEndedAnswer}>{question.correctAnswer}</p>
                        ) : (
                          question?.options.map((option) => (
                            <li className={question.correctAnswer + '' === option ? qbStyle.option : ''} key={option}>{option}</li>
                          )))
                      }
                    </ul>
                  </div>
                </div>
              ))
            ) : (
              <Void />
            )
          )
        }
      </div>
    </div >
  )
}

export default QuestionBank



