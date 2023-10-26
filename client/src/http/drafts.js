import axios from 'axios'
import { sharedUrl } from './url-share';


export const getDrafts = async (tokenGetDraft) => {
    const options = {
        method: 'GET',
        url: `${sharedUrl}/v1/archive/all`,
        headers: {
            Authorization: `Bearer ${tokenGetDraft}`,
        }
    }

    try {
        const res = await axios.request(options);
        return res.data.msg;

    } catch (error) {
        return error
    }
}

export const getDraft = async (id) => {
    const options = {
        method: "GET",
        url: `${sharedUrl}/v1/archive/one/${id}`
    }
    try {
        const res = await axios.request(options);
        return res.data.findQuiz;
    } catch (error) {
        return error
    }
}

export const updateDraft = async (id, updatedData, token) => {
    const options = {
        method: "PUT",
        url: `${sharedUrl}/v1/archive/change_status/${id}`,
        data: {
            "status": updatedData.status,
            "questions": updatedData.questions
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    try {
        const res = await axios.request(options);
        return res.data;
    } catch (error) {
        return error
    }
}