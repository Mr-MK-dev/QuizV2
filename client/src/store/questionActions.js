import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addQuestion, deleteQuestion } from "../http/questionActions";


export const addQuestionUThunk = createAsyncThunk('questionActions/addQuestion',
    async (questionData, { rejectWithValue, getState, dispatch }) => {
        const type = getState().questionActions.question_type;
        const res = await addQuestion(questionData, type);
        if (res.msg) return rejectWithValue();
        console.log(type)
        return res;
    })
export const deleteQuestionUThunk = createAsyncThunk('questionActions/deleteQuestion', async (id, { rejectWithValue }) => {
    const res = deleteQuestion(id);
    if (res.msg) return rejectWithValue();
    return res;
})


const initialState = {
    question_type: '',
    deletion_is_done: false,
    addition_is_done: false,
}

const questionActions = createSlice({
    name: "questionActions",
    initialState,
    reducers: {
        getQuestionType: (state, action) => {
            state.question_type = action.payload
        },
        deleteQuestionPrompt: (state) => {
            state.deletion_is_done = false;
            state.addition_is_done = false;
        }
    },
    extraReducers: {
        [addQuestionUThunk.pending]: (state, action) => {
            state.addition_is_done = false
        },
        [addQuestionUThunk.fulfilled]: (state, action) => {
            state.addition_is_done = true;
        },
        [addQuestionUThunk.rejected]: (state, action) => {
            state.addition_is_done = false;
        },
        [deleteQuestionUThunk.pending]: (state, action) => {
            state.deletion_is_done = false;
        },
        [deleteQuestionUThunk.fulfilled]: (state, action) => {
            state.deletion_is_done = true;
        },
        [deleteQuestionUThunk.rejected]: (state, action) => {
            state.deletion_is_done = false;
        }
    }
})

export const { getQuestionType, deleteQuestionPrompt } = questionActions.actions;
export default questionActions.reducer;