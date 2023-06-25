import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    search: '',
};

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setSearch(state, action) {
            state.search = action.payload.search;
        },
        removeSearch(state) {
            state.search = null;
        }
    },
});

export const {setSearch, removeSearch} = userSlice.actions;

export default userSlice.reducer;