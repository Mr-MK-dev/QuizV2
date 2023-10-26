import axios from "axios";
import { sharedUrl } from "./url-share";


const examsTypes = async (examType,tokenExamsTypes) => {
    const options = {
        method: 'GET',
        url: `${sharedUrl}/v1/quizbycategory`,
        params: {
            category: examType
        },
        headers: {
            Authorization: `Bearer ${tokenExamsTypes}`,
        }
    }
    try {
        return await axios.request(options);
    } catch (error) {
        return 'error';
    }
}

export default examsTypes