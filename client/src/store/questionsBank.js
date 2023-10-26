import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import questionsBank from '../http/questionsBank';



export const questionsBankData = createAsyncThunk('questionsBank/qbData', async (lecture_num, { rejectWithValue }) => {
    const res = await questionsBank(lecture_num);
    return res.questions
})


const initialState = {
    questions: []
}
const qkSlice = createSlice({
    name: 'questionsBank',
    initialState,
    extraReducers: {
        [questionsBankData.pending]: (state, action) => {

        },
        [questionsBankData.fulfilled]: (state, action) => {
            state.questions = action.payload;

        },
        [questionsBankData.rejected]: (state, action) => {

        }
    }
})

export default qkSlice.reducer;