import { createSlice } from "@reduxjs/toolkit";

// shown in my Quiz page
const initialState = {
    allQuiz : localStorage.getItem("allQuiz") ? 
            JSON.parse(localStorage.getItem("allQuiz")) : null,
    loading : false,
};

const viewQuizSlice = createSlice({
    name: "viewQuiz",
    initialState : initialState,
    reducers: {
        setViewQuiz(state,value){
            state.allQuiz = value.payload;
            localStorage.setItem("allQuiz",JSON.stringify(value.payload));
        },
        setLoading(state,value){
            state.loading = value.payload;
        },
    }
});

export const {setViewQuiz,setLoading} = viewQuizSlice.actions;
export default viewQuizSlice.reducer;
