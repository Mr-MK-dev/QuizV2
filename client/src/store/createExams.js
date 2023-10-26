import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import createExam from "../http/createExam";

export const createExamReq = createAsyncThunk('createExams/createExamReq', async (allExamData, { rejectWithValue }) => {
    const { examsData, questionsIDs, token } = allExamData
    let res = await createExam(examsData, questionsIDs, token);
    if (res.Error) return rejectWithValue(res.Error);
    return res;
})


const initialState = {
    createExamMode: false,
    category: '',
    createdSuccefully: false,
    error: ''
}

const createExams = createSlice({
    name: "createExams",
    initialState,
    reducers: {
        setExamMode: (state, action) => {
            state.createExamMode = action.payload
            // In order to guarantee enforcing create exam mode
            localStorage.setItem('examMode', JSON.stringify({ createExamMode: action.payload, category: state.category }))
        },
        setCategory: (state, action) => {
            state.category = action.payload
        },
        removeError: (state) => {
            state.error = ''
        },
        closeCreatedSuccessfully: (state) => {
            state.createdSuccefully = false;
        }
    },
    extraReducers: {
        [createExamReq.pending]: (state, action) => {
            state.createdSuccefully = false;
        },
        [createExamReq.fulfilled]: (state, action) => {
            state.createdSuccefully = true;
            localStorage.removeItem('examMode')
        },
        [createExamReq.rejected]: (state, action) => {
            state.createdSuccefully = false;
            state.error = action.payload;
        }
    }
})

export const { setExamMode, setCategory, removeError, closeCreatedSuccessfully } = createExams.actions;
export default createExams.reducer;