import { createSlice } from "@reduxjs/toolkit";




const identitSlice = createSlice({
    name : "identity-selection",
    initialState : {
        identity : ''
    },
    reducers : {
        setIdentity: (state,action)=>{
            state.identity = action.payload;
        }
    }
})

export const  { setIdentity } = identitSlice.actions;

export default identitSlice.reducer;