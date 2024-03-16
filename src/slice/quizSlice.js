// for editing and creating quiz till draft
import { createSlice } from "@reduxjs/toolkit";

// shown in my Quiz page
const initialState = {
    editQuiz : localStorage.getItem("editQuiz") ? 
            JSON.parse(localStorage.getItem("editQuiz")) : null,
    editQues : localStorage.getItem("editQues") ? 
            JSON.parse(localStorage.getItem("editQues")) : null,
    editMode: false,
    viewMode : false,
    editQuesMode: false,
    editQuizLoading : false,
    step: 1,
};


const quizSlice = createSlice({
    name: "quiz",
    initialState: initialState,
    reducers: {
        setQuiz(state,value){
            state.editQuiz = value.payload;
            localStorage.setItem("editQuiz",JSON.stringify(value.payload));
        },
        setQues(state,value){
            state.editQues = value.payload;
            localStorage.setItem("editQues",JSON.stringify(value.payload));
        },
        setEditQuizLoading(state,value){
            state.editQuizLoading = value.payload;
        },
        setStep(state,value){
            state.step = value.payload;
        },
        setEditMode(state,value){
            state.editMode = value.payload;
        },
        setViewMode(state,value){
            state.viewMode = value.payload;
        },
        setEditQuesMode(state,value){
            state.editQuesMode = value.payload;
        },
    }
});

export const {setEditMode,setViewMode,setEditQuizLoading,setQuiz,setQues,setStep,setEditQuesMode} = quizSlice.actions;
export default quizSlice.reducer;