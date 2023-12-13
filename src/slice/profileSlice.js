import { createSlice } from "@reduxjs/toolkit";

// after login user contain information about user
const initialState = {
    user : localStorage.getItem("quizUser") ? 
            JSON.parse(localStorage.getItem("quizUser")) : null,
    loading : false,
};

const profileSlice = createSlice({
    name : "profile",
    initialState : initialState,
    reducers : {
        setUser(state,value){
            state.user = value.payload;
            localStorage.setItem("quizUser",JSON.stringify(value.payload));
        },
        setLoading(state,value){
            state.loading = value.payload;
        },
    }
});

export const {setUser, setLoading} = profileSlice.actions;
export default profileSlice.reducer;