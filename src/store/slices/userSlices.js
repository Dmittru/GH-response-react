import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    search: '',
    status:'',
    page:1,
};

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setSearch(state, action) {
            state.search = action.payload.search;
        },
        setStatus(state,action){
            state.status = action.payload.status;
        },
        setPage(state,action){
            state.page = action.payload.page;
        }
    },
});

export const {setSearch,setStatus,setPage} = userSlice.actions;

export default userSlice.reducer;