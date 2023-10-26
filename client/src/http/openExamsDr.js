import axios from 'axios';
import { sharedUrl } from './url-share';


const openExamsDr = async(id) =>{
    const options = {
        method:"GET",
        url : `${sharedUrl}/v1/quiz/${id}`, 
    }
    try {
        const res = await axios.request(options);
        console.log(res.data)
        return res.data; 
    } catch (error) {
     console.log(error);
     return error   
    }
}


export default openExamsDr;