import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import examsTypes from "../http/examsTypes";

export const selectExamType = createAsyncThunk('examsType/selectType', async (typeRequiredData, thunkAPI) => {
    const { choice, token } = typeRequiredData
    const { rejectWithValue } = thunkAPI;
    let res = await examsTypes(choice, token);
    if (res === 'error') rejectWithValue();
    return res.data.quiz;
})

const initialState = { examsTypeData: [], loading: false };

const examsType = createSlice({
    name: 'examsType',
    initialState,
    reducers: {
        logoutDashboard: (state) => {
            return initialState;
        }
    },
    extraReducers: {
        [selectExamType.pending]: (state, action) => {
            state.loading = true;
        },
        [selectExamType.fulfilled]: (state, action) => {
            state.loading = false;
            state.examsTypeData = action.payload;
        },
        [selectExamType.rejected]: (state, action) => {
            state.loading = false;
            state.examsTypeData = 'Error';
        }
    }
});
export const { logoutDashboard } = examsType.actions;
export default examsType.reducer;