import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    quizes : localStorage.getItem("platformQuiz") ? 
    JSON.parse(localStorage.getItem("platformQuiz")) : null,
    quizStatus: "None", // None,Start,End
    submitLoading : false,
    // [50:50, twice Bonus] which can be activated
    perks : [false,false],
}

const platformQuizSlice = createSlice({
    name: "quizPlatform",
    initialState: initialState,
    reducers : {
        setPlatformQuiz(state,value){
            state.quizes = value.payload;
            localStorage.setItem("platformQuiz",JSON.stringify(value.payload));
        },
        setQuizPlatformLoading(state,value){
            state.submitLoading = value.payload;
        },
        setQuizStatus(state,value){
            state.quizStatus = value.payload;
        },
        setPerks(state,value){
            state.perks = value.payload;
        },
    }
});

export const {setQuizPlatformLoading, setPlatformQuiz, setQuizStatus, setPerks} = platformQuizSlice.actions;
export default platformQuizSlice.reducer;

