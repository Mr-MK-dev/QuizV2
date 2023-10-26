import axios from 'axios'
import { sharedUrl } from './url-share'

export const submitAnswers = async (answers, token, examId) => {
    const options = {
        method: 'POST',
        url: `${sharedUrl}/v1/${examId}/answer`,
        data: {
            answers: answers
        },
        headers: {
            Authorization: `Bearer ${token}`
        },
    }
    try {
        const res = await axios.request(options)
        console.log('User just submitted answwers',res.data)
        return res.data;
    } catch (error) {
        console.log(error)
        return error
    }
}

export const totalStudentsExams = async (token) => {
    const options = {
        method: 'GET',
        url: `${sharedUrl}/v1/user_degress`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    try {
        const res = await axios.request(options);
        console.log('from http total stu exams ', res.data.degress)
        return res.data.degress
    } catch (error) {
        return error
    }
}