import axios from 'axios'
import { sharedUrl } from './url-share'



const token = JSON.parse(localStorage.getItem('additional'))?.additional?.user_token


export const addQuestion = async (questionData, type) => {

    const multi_data = {
        type: questionData.type,
        question: questionData.question,
        correctAnswer: questionData.correctAnswer,
        options: questionData.options,
        lecture_no: questionData.lectureNumber,
    }

    const open_ended = {
        type: questionData.type,
        question: questionData.question,
        correctAnswer: questionData.correctAnswer,
        lecture_no: questionData.lectureNumber
    }

    const options = {
        method: 'POST',
        url: `${sharedUrl}/v1/questions`,
        data: type === 'open_ended' ? open_ended : multi_data,
        headers: {
            Authorization: `Bearer ${token}`
        },
    }
    try {
        let res = await axios.request(options);
        console.log(res);
        console.log(token)
        return res.data;
    } catch (e) {
        console.log(`Bearer ${token}`)
        console.log(e)
    }
}

export const deleteQuestion = async (id) => {
    const options = {
        method: 'DELETE',
        url: `${sharedUrl}/v1/question/${id}`,
    }
    try {
        let res = await axios.request(options);
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.log(error)
    }
}