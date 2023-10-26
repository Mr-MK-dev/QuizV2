import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { studentExam } from "../http/studentExam";

export const getStudentExamReq = createAsyncThunk("studentExam/getStudentExamReq", async (_, { rejectWithValue }) => {
    const res = await studentExam();
    return res;
})

const initialState = {
    exam: [],
}
const studentExamSlice = createSlice({
    name: 'studentExam',
    initialState,
    extraReducers: {
        [getStudentExamReq.pending]: (state) => {

        },
        [getStudentExamReq.fulfilled]: (state, action) => {
            state.exam = action.payload;
        },
        [getStudentExamReq.rejected]: (state) => {

        }
    }
})

export default studentExamSlice.reducer;