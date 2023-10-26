import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import daHome from '../../Styles/Dashboard/DashboardHome.module.css'
import DashboardHeader from './DashboardHeader'
import Dashboard from './doctor/Dashboard'
import DashboardStu from './student/DashboardStu'
import { selectAuthType } from '../../store/auth'
import { getProfileReq, profileIsUpdated } from '../../store/createProfile'
import { getStudentExamReq } from '../../store/studentExam'
import StudentExam from './student/StudentExam'
import { openExamDrReq } from '../../store/openExamsFtDr'
import { studetnAlreadySubmitted } from '../../store/studentSubmission'


const DashboardHome = () => {

    const { totalStuExams, studentSubmitted } = useSelector((state) => state.studentSubmission)
    const dispatch = useDispatch();
    dispatch(selectAuthType('authorized'));
    let localUser = JSON.parse(localStorage.getItem('additional')).additional;
    let role = localUser.role

    /** */
    // Tied Route
    localStorage.setItem('lock-routes', JSON.stringify('pop'))
    /** */

    const { exam } = useSelector((state) => state.studentExam)
    const { userProfile, isProfileUpdated } = useSelector((state) => state.createProfile)
    const { timeRanOut } = useSelector((state) => state.studentSubmission)

    useEffect(() => {
        dispatch(getProfileReq(localUser.user_token))
        if (isProfileUpdated === true) {
            dispatch(getProfileReq(localUser.user_token));
            dispatch(profileIsUpdated());
        }
    }, [dispatch, localUser.user_token, isProfileUpdated])


    useEffect(() => {
        dispatch(getStudentExamReq())
        if (timeRanOut) dispatch(getStudentExamReq())
    }, [dispatch, timeRanOut])

    console.log(userProfile)


    useEffect(() => {
        if (exam) {
            dispatch(openExamDrReq(exam?._id))
        }
    }, [dispatch, exam])


    const stuSubmitted = useCallback(() => {
        for (let ex of totalStuExams) {
            if (ex?._id === exam?._id) {
                return dispatch(studetnAlreadySubmitted())
            }
        }

    }, [dispatch, exam?._id, totalStuExams])


    useEffect(() => {
        stuSubmitted()
    }, [stuSubmitted])


    console.log(studentSubmitted)

    return (
        <div className={daHome.container}>
            {
                (role === 'student' && (exam?._id && !studentSubmitted)) ? '' :
                    <DashboardHeader header='DASHBOARD' />
            }
            {
                role === 'instructor' ?
                    <Dashboard />
                    : (
                        (exam?._id && !studentSubmitted) ? (
                            <StudentExam />
                        ) : (
                            <DashboardStu
                                stCode={userProfile?.stCode}
                                studentSubmitted={studentSubmitted}
                            />

                        )
                    )
            }
        </div>
    )
}

export default DashboardHome