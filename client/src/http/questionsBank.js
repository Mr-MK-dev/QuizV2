import axios from 'axios'
import { sharedUrl } from './url-share';

const questionsBank = async (lecture_num) => {
    const options = {
        method: 'GET',
        url: `${sharedUrl}/v1/questionsbank`,
        params: {
            "no": lecture_num
        }
    }
    try {
        let res = await axios.request(options);
        return res.data;
    } catch (error) {
        return error
    }
}

export default questionsBank