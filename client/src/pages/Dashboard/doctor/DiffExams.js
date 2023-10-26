import React, { useEffect, useState } from 'react'
import daBody from '../../../Styles/Dashboard/doctor/Dashboard.module.css'
import diff from '../../../Styles/Dashboard/doctor/DiffExams.module.css'
import Void from '../../Void'
import { useDispatch, useSelector } from 'react-redux'
import { selectExamType } from '../../../store/examsTypes'
import { Link, useNavigate } from 'react-router-dom'
import sortByDate from '../../../utils/helpers/sortByDate'
import identityPath from '../../../utils/helpers/identityPath'



const DiffExams = () => {
    const [choice, setChoise] = useState('quiz')
    let choices = ["quiz", "mid_term", "final"]
    const dispatch = useDispatch();
    const naivgate = useNavigate();


    const userAdditional = JSON.parse(localStorage.getItem('additional'))
    const userId = userAdditional?.id, user_token = userAdditional?.additional?.user_token

    const examType = (type) => {
        setChoise(type)
        dispatch(selectExamType(type))
    }
    let { examsTypeData, loading } = useSelector(state => state.examsType)


    const token = JSON.parse(localStorage.getItem('additional'))?.additional?.user_token;
    useEffect(() => {
        setTimeout(() => {
            const typeRequiredData = { choice, token }
            dispatch(selectExamType(typeRequiredData))
        }, 1000)
    }, [choice, dispatch, token])


    let sortedData = examsTypeData ? sortByDate(examsTypeData) : [];


    const openIndividual = (id) => {
        localStorage.setItem('openExamId', JSON.stringify(id))
        naivgate(`${identityPath(user_token, userId)}/exam`)
    }





    return (
        <div className={diff.container}>
            <div className={diff.choices}>
                <ul>
                    {
                        choices.map((item) => (
                            <li onClick={() => examType(item)} className={`${choice === item ? diff.item : ''}`}>
                                {item === 'quiz' ? item + 'zes' : item + 's'}
                            </li>
                        ))
                    }
                </ul>
                <Link className={diff.all}>
                    View all {choice === ' quiz' ? choice + 'zes' : choice + 's'} <img src='/assets/Path 796.svg' alt='' />
                </Link>
            </div>
            {
                loading ? (
                    <div className={daBody.loader}></div>
                ) : (
                    examsTypeData?.length > 0 ? (sortedData?.map((data) => (
                        <div onClick={() => openIndividual(data?._id)} className={diff.choiceData} key={data?._id}>
                            <p className={diff.title}>{data.title}</p>
                            <p> {data.description}</p>
                            <p className={diff.createdAt}> {data.createdAt} </p>
                        </div>
                    ))) : (
                        <Void />
                    )
                )
            }
        </div>
    )
}

export default DiffExams
