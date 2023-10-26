import axios from "axios";
import { sharedUrl } from "./url-share";

const login = async (userData) => {
    const options = {
        method: 'POST',
        url: `${sharedUrl}/v1/login`,
        data: {
            password: userData.password,
            email: userData.email,
        }
    }

    try {
        let res = await axios.request(options);
        return res.data;
    } catch (error) {
        return error;
    }
}

export default login