import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getStusDataReq } from '../../../store/studentsData'
import DashboardHeader from '../DashboardHeader'
import stuInfo from '../../../Styles/Dashboard/doctor/StudentsData.module.css'
import daBody from '../../../Styles/Dashboard/doctor/Dashboard.module.css'


const StudentsData = () => {
    const dispatch = useDispatch()
    const { studentsData, loading } = useSelector((state) => state.studentsData)


    console.log(studentsData)

    useEffect(() => {
        setTimeout(() => {
            dispatch(getStusDataReq())
        }, 2000)
    }, [dispatch])
    return (
        <div className={stuInfo.container}>
            <DashboardHeader header="Students Info" />
            <div className={stuInfo.infoContainer}>
                <div className={stuInfo.infoHeader}>
                    <p >Student Name</p>
                    <p >Score</p>
                    <p >Student Code</p>
                    <p >Student Email</p>
                </div>
                {
                    loading ? (
                        <div className={daBody.loader}></div>
                    ) : (
                        studentsData?.map((student, index) => (
                            <div className={stuInfo.dataContainer} key={index}>
                                <p className={stuInfo.name}> {student.first_name} {student.last_name}</p>
                                <p className={stuInfo.score}>4.5</p>
                                <p className={stuInfo.stuCode}>{student.stCode}</p>
                                <p className={stuInfo.email}>{student.email}</p>
                            </div>
                        ))
                    )
                }
            </div>
        </div>
    )
}

export default StudentsData