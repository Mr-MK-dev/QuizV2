import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { submitAnswers, totalStudentsExams } from "../http/studentSubmission";

export const submitAnswersReq = createAsyncThunk('/studentSubmission/submitAnswers', async (stuSubmit, { rejectWithValue }) => {
    const { answers, token, examId } = stuSubmit
    const res = await submitAnswers(answers, token, examId)
    return res
})

export const totalStudentsExamsReq = createAsyncThunk('/studentSubmission/totalStudentsExamsReq', async (token, { rejectWithValue }) => {
    const res = await totalStudentsExams(token);
    return res;
})


const initialState = {
    totalStuExams: [],
    studentSubmitted: false,
    timeRanOut: false
}
const studentSubmission = createSlice({
    name: 'studentSubmission',
    initialState,
    reducers: {
        studetnAlreadySubmitted: (state) => {
            state.studentSubmitted = true;
        },
        isTimeRanOut: (state) => {
            state.timeRanOut = true;
        },
        logoutStudentSubmission: (state) => {
            return initialState
        }
    },
    extraReducers: {
        [submitAnswersReq.pending]: (state) => {

        },
        [submitAnswersReq.fulfilled]: (state, action) => {
            state.studentSubmitted = true;
        },
        [totalStudentsExamsReq.pending]: (state) => {

        }, [totalStudentsExamsReq.fulfilled]: (state, action) => {
            state.totalStuExams = action.payload;
        }
    }
})
export const { studetnAlreadySubmitted, isTimeRanOut, logoutStudentSubmission } = studentSubmission.actions;
export default studentSubmission.reducer;