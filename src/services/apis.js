const BASE_URL = "http://127.0.0.1:4000/api/v1";

// AUTH ENDPOINTS
export const authEndpoints = {
    SENDOTP_API: BASE_URL + "/user/sendotp",
    SIGNUP_API: BASE_URL + "/user/signup",
    LOGIN_API: BASE_URL + "/user/login",
    FORGOTPASWORD_API: BASE_URL + "/user/forgotmail",
    UPDATEPASSWORD_API: BASE_URL + "/user/updatepassword",
}

//PROFILE ENDPOINTS
export const profileEndpoints = {
    EDIT_PROFILE : BASE_URL + "/user/auth/editprofile",
    RESET_PASSWORD : BASE_URL + "/user/auth/resetpassword",
}

// QUIZ ENDPOINTS
export const quizEndpoints = {
    MAKE_QUIZ : BASE_URL + "/quiz/makequiz",
    UPDATE_QUIZ : BASE_URL + "/quiz/updatequiz",
    DELETE_QUIZ : BASE_URL + "/quiz/deletequiz",
    FETCH_ALL_QUIZ : BASE_URL + "/quiz/fetchallquiz",
    FETCH_ONE_QUIZ : BASE_URL + "/quiz/fetchonequiz",
}

// QUESTION ENDPOINTS
export const questionEndpoints = {
    ADD_QUES : BASE_URL + "/quiz/addQuizQues",
    REMOVE_QUES : BASE_URL + "/quiz/removeQuizQues",
    EDIT_QUES : BASE_URL + "/quiz/editQuizQues",
}