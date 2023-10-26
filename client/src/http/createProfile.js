import axios from 'axios'
import { sharedUrl } from './url-share';


export const createProfile = async (profileData) => {
    const options = {
        method: 'PUT',
        url: `${sharedUrl}/v1/complete_sign_up`,
        data: {
            // profileImageUrl : "profileImageUrl",                   // String
            profileImageUrl: profileData.photo,                   // String
            // "username": "mewIser",
            username: profileData.userName,
            bio: profileData.bio
        },
        headers: {
            Authorization: `Bearer ${profileData.token}`
        }
    }
    try {
        const res = await axios.request(options);
        console.log(res)
        return res.data
    } catch (error) {
        console.log(error)
        return error
    }
}


export const getProfile = async (token) => {
    const options = {
        method: 'GET',
        url: `${sharedUrl}/v1/complete_sign_up`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    try {
        const res = await axios.request(options);
        console.log(res.data.user)
        return res.data
    } catch (error) {
        console.log(error)
        return error
    }
}