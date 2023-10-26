import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDraft, getDrafts, updateDraft } from "../http/drafts";


export const getDraftsReq = createAsyncThunk("/draftsSlcie/getDraftsReq", async (token, { rejectWithValue }) => {
    const res = await getDrafts(token);
    return res;
})

export const getDraftReq = createAsyncThunk("/draftsSlcie/getDraftReq", async (id, { rejectWithValue }) => {
    const res = await getDraft(id);
    return res;
})


export const updateDraftReq = createAsyncThunk("/draftsSlcie/updateDraftReq", async (dataIsUpdated, { rejectWithValue }) => {
    const { id, updatedDate, token } = dataIsUpdated;
    const res = await updateDraft(id, updatedDate, token);
    return res
})


const initialState = {
    drafts: [],
    loading: false,
    isDrafted: false,
}
const draftsSlice = createSlice({
    name: "draftsSlcie",
    initialState,
    reducers: {
        setDraftEditor: (state) => {
            state.isDrafted = true;
        },
        turnOnLoading: (state) => {
            state.loading = true;
        }
    },
    extraReducers: {
        [getDraftsReq.pending]: (state) => {
            state.loading = true;
        },
        [getDraftsReq.fulfilled]: (state, action) => {
            state.loading = false;
            state.drafts = action.payload;
        },
        [getDraftsReq.rejected]: (state, action) => {
            state.loading = false;
        },
        [getDraftReq.fulfilled]: (state, action) => {
            state.loading = false;
            localStorage.setItem("draftData", JSON.stringify(action.payload))
        },
        [getDraftReq.rejected]: (state, action) => {
            state.loading = false;
        },
        [updateDraftReq.pending]: (state) => {
        },
        [updateDraftReq.fulfilled]: (state, action) => {
            localStorage.removeItem('draftData')
        }
    }
})
export const { setDraftEditor, turnOnLoading } = draftsSlice.actions;
export default draftsSlice.reducer;