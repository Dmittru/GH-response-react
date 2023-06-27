import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    search: '',
    status:'',
};

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setSearch(state, action) {
            state.search = action.payload.search;
        },
        removeSearch(state) {
            state.search = '';
        },
        setStatus(state,action){
            state.status = action.payload.status;
        }
    },
});

export const {setSearch, removeSearch,setStatus} = userSlice.actions;

export default userSlice.reducer;