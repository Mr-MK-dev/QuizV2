import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { stusData } from "../http/studentsData";

export const getStusDataReq = createAsyncThunk('/studentsData/getStusData', async (_, { rejectWithValue }) => {
    const res = await stusData();
    return res.students;
})

const initialState = {
    studentsData: [],
    loading: false
}

const studentsDataSlice = createSlice({
    name: 'studentsData',
    initialState,
    extraReducers: {
        [getStusDataReq.pending]: (state) => {
            state.loading = true;
        },
        [getStusDataReq.fulfilled]: (state, action) => {
            state.loading = false;
            state.studentsData = action.payload;
        },
        [getStusDataReq.rejected]: (state) => {
            state.loading = false;
        }
    }
})

export default studentsDataSlice.reducer;