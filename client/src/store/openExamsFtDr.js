import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import openExamsDr from "../http/openExamsDr";
import { selectAuthType } from "./auth";



export const openExamDrReq = createAsyncThunk("openExamsDr/openExam", async (id, { rejectWithValue, dispatch }) => {
    const res = await openExamsDr(id);
    dispatch(selectAuthType(''))
    if (res.Error) return rejectWithValue(res.Error);
    return res.quiz;
})


const initialState = {
    examId: '',
    openedExam: {},
    loading: false,
    error: ''
}
const openExamDrSlice = createSlice({
    name: "openExamsDr",
    initialState,
    reducers: {
        getExamId: (state, action) => {
            state.examId = action.payload
        }
    },
    extraReducers: {
        [openExamDrReq.pending]: (state) => {
            state.loading = true;
        },
        [openExamDrReq.fulfilled]: (state, action) => {
            state.loading = false;
            state.openedExam = action.payload;
        },
        [openExamDrReq.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})
export const { getExamId } = openExamDrSlice.actions;
export default openExamDrSlice.reducer;