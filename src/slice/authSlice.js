import { createSlice } from "@reduxjs/toolkit";

// signup data is used when we go on otp verify page
// so we need to maintain that signup form data
const initialState = {
    token : localStorage.getItem("quizToken") ? 
            JSON.parse(localStorage.getItem("quizToken")) : null,
    tokenExpires: localStorage.getItem("tokenExpires") ? 
                JSON.parse(localStorage.getItem("tokenExpires")) : null,
    loading : false,
    signupData: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers:{
        setLoading(state,value){
            state.loading = value.payload;
        },
        setToken(state,value){
            state.token = value.payload;
            localStorage.setItem("quizToken",JSON.stringify(value.payload));
        },
        setTokenExpires(state,value){
            state.tokenExpires = value.payload;
            localStorage.setItem("tokenExpires", JSON.stringify(value.payload));
        },
        setSignupData(state,value){
            state.signupData = value.payload;
        },
        logOut(state){
            state.token = null;
            localStorage.setItem("quizToken",null);
            state.tokenExpires = null;
            localStorage.setItem("tokenExpires", null);
            state.signupData = null;
        }
        
    }
});

export const {setLoading, setToken, setSignupData, setTokenExpires, logOut} = authSlice.actions;
export default authSlice.reducer;