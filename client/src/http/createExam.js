import axios from "axios";
import { sharedUrl } from "./url-share";

const createExam = async (examData, examQuestions, token) => {
    let options = {
        method: 'POST',
        url: `${sharedUrl}/v1/quiz`,
        data: {
            description: examData.description,
            title: examData.title,
            category: examData.category,
            status: examData.status,
            questions: examQuestions
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    try {
        let res = await axios.request(options);
        console.log(res.data)
        return res.data;
    } catch (error) {
        console.log(error);
    }
}


export default createExam;