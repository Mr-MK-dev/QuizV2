import React, { useEffect, useRef, useState } from 'react'
import exFoStyle from '../../../Styles/Dashboard/doctor/ExamForm.module.css';
import qbStyle from '../../../Styles/Dashboard/QestionsBank.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { questionsBankData } from '../../../store/questionsBank';
import Void from '../../Void';
import { createExamReq, removeError } from '../../../store/createExams';
import identityPath from '../../../utils/helpers/identityPath';
import { useNavigate } from 'react-router-dom';
import { updateDraftReq } from '../../../store/drafts';
import Cookies from 'js-cookie';


const ExamForm = () => {
  const fromDraft = JSON.parse(localStorage.getItem('draftData'))

  const handleDefaultQuestions = () => {
    if (fromDraft) {
      return [...fromDraft?.questions]
    } else {
      return []
    }
  }
  const handleDefaultExamsData = () => {
    if (fromDraft) {
      return {
        title: fromDraft?.title,
        description: fromDraft?.description,
        category: fromDraft?.category,
        status: fromDraft?.status
      }
    } else {
      return {
        title: '',
        description: '',
        category: '',
        status: 'publish',
      }
    }
  }
  const [innerError, setInnerError] = useState('')
  const [lectureNum, setLectureNum] = useState(1)
  const [questionsIDs, setQuestionsIDs] = useState(handleDefaultQuestions)
  const [examsData, setExamsData] = useState(handleDefaultExamsData)
  const checkDraft = useRef(null);


  const { error, createdSuccefully } = useSelector((state) => state.createExams)
  const { questions } = useSelector((state) => state.qbState)



  const examMode = JSON.parse(localStorage.getItem('examMode'))
  const examType = examMode?.category

  const additional = JSON.parse(localStorage.getItem('additional'))
  const id = additional?.id, user_token = additional?.additional?.user_token;


  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      dispatch(questionsBankData(lectureNum))
    }, 1000)
  }, [dispatch, lectureNum])


  const handleLecNumChange = (e) => {
    setLectureNum(e.target.value)
  }


  // create New Exam
  let ids = [];
  const handleCheckedboxes = (e) => {
    ids = [...questionsIDs]
    if (e.target?.checked) {
      ids = [...questionsIDs, e.target.value]
    } else {
      ids.splice(questionsIDs.indexOf(e.target.value), 1);
    }
    setQuestionsIDs(ids)
  }

  console.log(questionsIDs)

  // create New Exam
  const handleChange = (e) => {
    const { value, name } = e.target;
    setExamsData({
      ...examsData,
      category: examType,
      status: 'publish',
      [name]: value
    })
  }

  // create New Exam
  const handleDraftChange = (e) => {
    setExamsData({
      ...examsData,
      category: examType,
      status: checkDraft.current.value,
    })
    if (!checkDraft.current.checked) {
      setExamsData({
        ...examsData,
        category: examType,
        status: 'publish',
      })
    }
  }



  console.log(examsData)

  // Submit New Exam
  const token = JSON.parse(localStorage.getItem('additional'))?.additional?.user_token;
  const allExamData = { examsData, questionsIDs, token }
  const handleSubmit = () => {
    dispatch(createExamReq(allExamData))
  }



  useEffect(() => {
    if (examMode) {
      if (error) {
        setInnerError(error)
      }
    }
  }, [examMode, error, navigate, fromDraft])


  console.log(innerError, error)


  const matchSelected = (questionId) => {

    let fitlered = fromDraft?.questions.filter((qId) => questionId === qId)
    if (fitlered?.length > 0) return true;
    else return false;

  }

  const updateData = {
    id: fromDraft?._id,
    updatedDate: {
      status: examsData.status,
      questions: questionsIDs
    },
    token,
  }

  const handleSubmitDraft = () => {
    dispatch(updateDraftReq(updateData))
    navigate(identityPath(user_token, id))
  }

  const getCurrentTheme = Cookies.get('dim');

  return (
    <div className={exFoStyle.container}>
      <div className={`${exFoStyle.controls} ${getCurrentTheme ? exFoStyle.controlsDark : null}`}>
        <p>{fromDraft?.category ? 'Exam Type: ' + fromDraft?.category : 'Create Exam : ' + examType}</p>
        <p>
          Questions: {questionsIDs?.length}
        </p>
        <input
          value={lectureNum}
          type='number'
          placeholder='Lecture Number'
          min="1"
          name='lectureNumber'
          id="lectureNumber"
          className={exFoStyle.lecNum}
          onChange={handleLecNumChange}
        />
        <input
          placeholder='Exam Title'
          name="title"
          defaultValue={fromDraft?.title}
          disabled={fromDraft?.title}
          onChange={handleChange}
          className={exFoStyle.title}
        />
        <input
          placeholder='Description'
          name="description"
          defaultValue={fromDraft?.description}
          disabled={fromDraft?.description}
          onChange={handleChange}
          className={exFoStyle.description}
        />
        {
          createdSuccefully && <div className={exFoStyle.belongToSuccessfully}></div>
        }
        {
          error && (
            <div className={exFoStyle.errorPrompt}>
              {error}
              <button onClick={() => dispatch(removeError())}>Got It</button>
            </div>
          )
        }
        <div className={exFoStyle.actions}>

          <label
            htmlFor='draft'
          >
            <input
              type="checkbox"
              name='status'
              id="draft"
              defaultChecked={fromDraft?.status === 'draft' ? 'draft' : ''}
              ref={checkDraft}
              value='draft'
              onChange={handleDraftChange}
            />
            Draft
          </label>
          <button
            type='button'
            onClick={fromDraft ? handleSubmitDraft : handleSubmit}
          >
            {checkDraft.current?.checked ? 'Submit' : 'Publish'}
          </button>
        </div>
      </div>
      <div className={qbStyle.questions}>

        {
          questions?.length > 0 ? (
            questions.map((question) => (
              <div className={qbStyle.question} key={question._id}>
                <div className={getCurrentTheme ? exFoStyle.questionHeadDark : exFoStyle.questionHead}>
                  {
                    <label
                      className={exFoStyle.selected}
                      htmlFor={question._id}
                    >
                      <input
                        type='checkbox'
                        name='checked'
                        id={question._id}
                        value={question._id}
                        defaultChecked={matchSelected(question._id)}
                        onChange={(e) => handleCheckedboxes(e)}
                      />
                      <span>
                        Add This Question
                      </span>
                    </label>
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
            <div style={{ "backgroundColor": "greenyellow" }}>
              <Void />
            </div>
          )
        }
      </div>
    </div>
  )
}

export default ExamForm