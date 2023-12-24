import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slice/authSlice";
import profileReducer from "../slice/profileSlice";
import viewQuizReducer from "../slice/viewQuizSlice";
import quizReducer from "../slice/quizSlice";

const rootReducer = combineReducers({
    auth : authReducer,
    profile: profileReducer,
    viewQuiz: viewQuizReducer,
    quiz: quizReducer,
});

export default rootReducer;