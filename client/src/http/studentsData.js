import axios from "axios";
import { sharedUrl } from "./url-share";

export const stusData = async () => {
    const options = {
        method: 'GET',
        url: `${sharedUrl}/v1/get_students`
    }
    try {
        const res = await axios.request(options);
        return res.data
    } catch (error) {
        console.log("students Error", error)
    }
}