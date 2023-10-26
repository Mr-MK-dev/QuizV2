import React, { useState } from 'react'
import addExam from '../../../Styles/Dashboard/doctor/AddExam.module.css'
import QuestionBank from '../QuestionBank';
import ExamForm from './ExamForm';
import { useNavigate } from 'react-router-dom';
import identityPath from '../../../utils/helpers/identityPath';
import { closeCreatedSuccessfully, setCategory } from '../../../store/createExams';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';

const AddExams = () => {
  const [, setDim] = useState(false)
  const [questionBank, setQuestionBank] = useState(false)
  const additional = JSON.parse(localStorage.getItem('additional'))
  const id = additional?.id, user_token = additional?.additional?.user_token;
  const getCurrentThemeDark = Cookies.get('dim')
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cancelCreatingExam = () => {
    localStorage.removeItem('examMode')
    localStorage.removeItem('draftData')
    localStorage.removeItem('loadingDraftData')
    dispatch(setCategory(''))
    navigate(identityPath(user_token, id))
  }


  const { createdSuccefully } = useSelector((state) => state.createExams)


  const afterCreatedSuccessfully = () => {
    dispatch(closeCreatedSuccessfully())
    navigate(identityPath(user_token, id))
  }

  const setTheme = () => {
    const currentTheme = Cookies.get('dim');
    if (!currentTheme) {
      Cookies.set('dim', true);
      setDim(true)
    } else {
      Cookies.remove('dim');
      setDim(false)
    }
  }

  return (
    <>
      {
        createdSuccefully && (
          <div className={addExam.successfully}>
            <p>
              Exam Is Created Successfully!
            </p>
            <button
              type='button'
              onClick={afterCreatedSuccessfully}
            >
              DONE!
            </button>
          </div>
        )}
      <div className={`${addExam.container} ${getCurrentThemeDark ? addExam.containerDark : addExam.containerNorm}`}>
        {
          createdSuccefully && <div className={addExam.belongToSuccessed}></div>
        }
        <div className={`${addExam.leftControls} ${getCurrentThemeDark ? addExam.leftControlsDark : addExam.leftControlsNorm}`}>
          <img src='/assets/al-azhar.png' height="70" width="70" alt='' />
          <div
            className={getCurrentThemeDark ? addExam.themeDark : addExam.theme}
            onClick={setTheme}
          >
            &#9728;
          </div>
          <div
            title='Questions Bank'
            className={getCurrentThemeDark ? addExam.openQBDark : addExam.openQB}
            onClick={() => setQuestionBank(!questionBank)}
          >
            &#128462;
          </div>
          <img
            src="/assets/Group 1440.svg"
            title='Cancel Creating Exam'
            onClick={cancelCreatingExam}
            alt='Exit'
          />
        </div>
        <div className={`${questionBank ? addExam.qbIsOpen : addExam.exForm} ${getCurrentThemeDark ? addExam.exFormDark : addExam.exFormNorm}`}>
          {
            questionBank ? <QuestionBank setQuestionBank={setQuestionBank} /> : <ExamForm />
          }
        </div>
      </div>
    </>
  )
}

export default AddExams