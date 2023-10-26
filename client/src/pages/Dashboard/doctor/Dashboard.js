import React, { useEffect, useState } from 'react'
import daBody from '../../../Styles/Dashboard/doctor/Dashboard.module.css'
import DiffExams from './DiffExams'
import QuestionBank from '../QuestionBank'
import { useNavigate } from 'react-router-dom'
import identityPath from '../../../utils/helpers/identityPath'
import { useDispatch, useSelector } from 'react-redux'
import { setCategory, setExamMode } from '../../../store/createExams'
import { getDraftReq, getDraftsReq, setDraftEditor, turnOnLoading } from '../../../store/drafts'
import UserProfile from '../UserProfile'
const ExamTimer = React.lazy(() => import('./ExamTimer'));

const userAdditional = JSON.parse(localStorage.getItem('additional'))
const id = userAdditional?.additional?.id, user_token = userAdditional?.additional?.user_token;


const Dashboard = (props) => {

    const { userProfile } = useSelector((state) => state.createProfile)
    console.log(userProfile)
    const [questionBank, setQuestionBank] = useState(false)
    const [publishedExam, setPublishedExam] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { drafts, loading } = useSelector((state) => state.draftsSlice)
    const { exam } = useSelector((state) => state.studentExam)

    const questionsBank = () => {
        setQuestionBank(true)
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }

    const createExam = (category) => {
        dispatch(setCategory(category))
        dispatch(setExamMode(true))
        navigate(`${identityPath(user_token, id)}/createExam`)
        // navigate(`/createExam`)
    }

    const editDraft = (draftId) => {
        dispatch(getDraftReq(draftId))
        dispatch(setDraftEditor())
        dispatch(turnOnLoading())
    }

    const additional = JSON.parse(localStorage.getItem('additional'))?.additional;
    const token = additional?.user_token;
    const openStudentsData = () => {
        navigate(`${identityPath(user_token, id)}/students-data`)
    }

    useEffect(() => {
        setTimeout(() => {
            if (JSON.parse(localStorage.getItem('draftData'))) {
                navigate(`${identityPath(user_token, id)}/createExam`)
            }
        }, 2000)
        return () => {
            if (JSON.parse(localStorage.getItem('dD'))) {
                navigate(`${identityPath(user_token, id)}`)
            }
        }
    }, [navigate])


    useEffect(() => {
        if (exam?.createdBy === userProfile._id) setPublishedExam(true);
        else setPublishedExam(false);
    }, [exam, userProfile._id])

    console.log(drafts)


    useEffect(() => {
        setTimeout(() => {
            dispatch(getDraftsReq(token))
        }, 1000)
    }, [dispatch, token])


    return (
        <div className={daBody.container}>
            <div className={daBody.leftHand}>
                <UserProfile user_token={user_token} daBody={daBody} />
                <div className={daBody.leftHandBody}>
                    <div className={daBody.otherShortHands}>
                        <div className={daBody.line}></div>
                        <ul>
                            <li onClick={questionsBank}>Questions Bank</li>
                            <li onClick={openStudentsData}>Students</li>
                        </ul>
                    </div>
                </div>
            </div>
            <React.Suspense fallback={<div></div>}>
                {
                    publishedExam && <ExamTimer />
                }
            </React.Suspense>
            <div className={daBody.addExams}>
                <div>
                    <h2>Create &#128073;
                    </h2>
                    <small>
                        Note you won't be able to create one if there's the same type in drafts
                    </small>
                </div>
                <button onClick={() => createExam('quiz')}>Quiz</button>
                <button onClick={() => createExam('mid_term')}>Mid-Term</button>
                <button onClick={() => createExam('final')}>Final</button>
            </div>
            <div className={daBody.archive}>
                <div className={daBody.draftsHeader}>Drafts &#9203;</div>
                {
                    drafts?.length ?
                        (
                            loading ? (
                                <div className={daBody.loader}></div>
                            ) : (

                                drafts?.length > 0 && drafts?.map((draft) => (
                                    <button className={daBody.draft} disabled={loading} onClick={() => editDraft(draft._id)}>
                                        <p className={daBody.draftTitle}>{draft.title}</p>
                                        <p className={daBody.draftCategory}>{draft.category}</p>
                                        <p className={daBody.draftDesc}>{draft.description}</p>

                                    </button>
                                ))
                            )
                        ) : (<p className={daBody.noArch}>No Drafts</p>)
                }
            </div>
            <div className={questionBank ? daBody.qbOn : daBody.qbOff}>
                <QuestionBank setQuestionBank={setQuestionBank} />
            </div>
            <DiffExams />

        </div >
    )
}

export default Dashboard