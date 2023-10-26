import axios from 'axios'
import { sharedUrl } from './url-share'

export const studentExam = async () => {
    const options = {
        method: 'GET',
        url: `${sharedUrl}/v1/last_exam`
    }
    try {
        const res = await axios.request(options)
        console.log(res);
        return res.data.lastestExam
    } catch (error) {
        return error
    }
}