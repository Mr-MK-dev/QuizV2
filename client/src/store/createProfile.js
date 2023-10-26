import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createProfile, getProfile } from "../http/createProfile";


export const createProfileReq = createAsyncThunk("createProfile/createProfileReq", async (profileData, { rejectWithValue }) => {
    const res = await createProfile(profileData);
    return res
})

export const getProfileReq = createAsyncThunk("createProfile/getProfileReq", async (token, { rejectWithValue }) => {
    const res = await getProfile(token);
    return res.user;
})


const initialState = {
    userProfile: [],
    isProfileUpdated: false,
    loadingProfileData: false
}
const createProfileSlice = createSlice({
    name: "createProfile",
    initialState,
    reducers: {
        profileIsUpdated: (state) => {
            state.isProfileUpdated = !state.isProfileUpdated;
        }
    },
    extraReducers: {
        [createProfileReq.fulfilled]: (state, action) => {
        },
        [createProfileReq.rejected]: (state) => {

        },
        [getProfileReq.pending]: (state) => {
            state.loadingProfileData = true;
        },
        [getProfileReq.fulfilled]: (state, action) => {
            state.loadingProfileData = false;
            state.userProfile = action.payload
        },
        [getProfileReq.rejected]: (state) => {
            state.loadingProfileData = false;
        }
    }
})
export const { profileIsUpdated } = createProfileSlice.actions;
export default createProfileSlice.reducer;