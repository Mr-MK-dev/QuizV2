import React, { useState, useEffect } from 'react';
import moment from 'moment';
import 'react-moment';
import { getStudentExamReq } from '../store/studentExam'
import { useDispatch, useSelector } from 'react-redux'
import { isTimeRanOut } from '../store/studentSubmission';


const CountdownTimer = () => {
    const [countdown, setCountdown] = useState('');
    const [countdownStEx, setCountdownStEx] = useState('')
    const { exam } = useSelector((state) => state.studentExam)

    const givenDuration = moment(exam?.createdAt).add(30, 'minutes');
    const dispatch = useDispatch();

    let localUser = JSON.parse(localStorage.getItem('additional')).additional;
    let role = localUser.role

    useEffect(() => {
        const endDate = moment(givenDuration);
        const interval = setInterval(() => {
            const now = moment();
            const diff = endDate.diff(now);
            const duration = moment.duration(diff);
            const minutes = duration.minutes();
            const seconds = duration.seconds();
            const countdownText = `${minutes}m ${seconds}s`;
            const countdowExaText = `${minutes} : ${seconds}`
            setCountdown(countdownText);
            setCountdownStEx(countdowExaText)
            if (diff <= 0) {
                clearInterval(interval);
                setCountdown('');
                setCountdownStEx('00:00');
                dispatch(isTimeRanOut())
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [dispatch, givenDuration]);

    useEffect(() => {
        if (!countdown && role !== 'student') {
            dispatch(getStudentExamReq())
        }
    }, [countdown, dispatch, role])

    return <div>{role === 'student' ? countdownStEx : countdown}</div>;
};


export default CountdownTimer;