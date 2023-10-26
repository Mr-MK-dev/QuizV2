import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createProfileReq, profileIsUpdated } from '../../store/createProfile'

const UserProfile = (props) => {
    const { user_token, daBody } = props;
    const initialState = () => {
        return { userName: '', bio: '', userPic: '', user_token: user_token }
    }
    const [editProfileData, setEditProfileData] = useState(initialState)
    const [editProfile, setEditProfile] = useState(false)
    const { userProfile } = useSelector((state) => state.createProfile)
    const dispatch = useDispatch();

    useEffect(() => {
        if (!editProfile) {
            setEditProfileData((prev) => ({
                ...prev,
                userName: userProfile?.username,
                bio: userProfile?.bio,
                userPic: userProfile?.userPic,
            }))
        }
    }, [editProfile, userProfile?.bio, userProfile?.userPic, userProfile?.username])

    const editProfileMode = () => {
        setEditProfile(!editProfile)
    }


    const handleChange = (e) => {
        let { name, value } = e.target;
        setEditProfileData({
            ...editProfileData,
            [name]: value
        })
    }


    const profileData = {
        photo: editProfileData.userPic,
        bio: editProfileData.bio,
        userName: editProfileData.userName,
        token: editProfileData.user_token
    }

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setEditProfileData({
                ...editProfileData,
                userPic: URL.createObjectURL(event.target.files[0])
            });
        }
    }

    const handleSubmit = () => {
        dispatch(createProfileReq(profileData))
        dispatch(profileIsUpdated())
        setEditProfile(false)
        setEditProfileData(initialState)
    }

    return (
        <>
            <div className={daBody.photo}>
                {
                    editProfile ? (
                        <input
                            type='file'
                            name='userPic'
                            placeholder='Choose a photo'
                            onChange={onImageChange}
                        />
                    ) : (
                        <img
                            src={
                                userProfile?.role === 'instructor'
                                    ?
                                    '/assets/placeholder-doctor.jpg'
                                    :
                                    '/assets/placeholder-stu.jpg'
                            }
                            height="80"
                            width="80"
                            alt='!!'
                            title={userProfile?.email}
                        />
                    )}
                <p
                    title={userProfile?.email}
                >
                    {userProfile?.first_name} {userProfile?.last_name} <br />
                    {
                        editProfile ?
                            <input
                                type='text'
                                name='userName'
                                value={editProfileData.userName}
                                onChange={handleChange}
                            /> : <span>{userProfile?.username}</span>
                    }
                </p>
                <div
                    onClick={editProfileMode}
                    title='Edit Profile'
                >
                    {
                        editProfile ? <>&#128473;</> : <>&#x270E;</>
                    }
                </div>
            </div>
            <div className={daBody.leftHandBody}>
                <div className={daBody.bio}>
                    {
                        editProfile ?
                            <textarea
                                name="bio"
                                value={editProfileData.bio}
                                onChange={handleChange}
                                maxLength="419"
                            ></textarea> : <p>
                                {userProfile?.bio}
                            </p>
                    }
                    {
                        editProfile && <button onClick={handleSubmit}>Submit</button>
                    }
                </div>
            </div>
        </>
    )
}

export default UserProfile