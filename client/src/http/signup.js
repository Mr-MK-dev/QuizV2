import axios from "axios";
import { sharedUrl } from "./url-share";

const signup = async (userData) => {
    const options = {
        method: 'POST',
        url: `${sharedUrl}/v1/signup`,
        data: {
            first_name: userData.firstName,
            last_name: userData.lastName,
            password: userData.password,
            email: userData.email,
            role: userData.role,
            stCode : userData.code
        }
    }

    try {
        let res = await axios.request(options);
        return res.data;
    } catch (error) {
        return error;
    }
}

export default signup