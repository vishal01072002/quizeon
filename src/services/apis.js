const BASE_URL = process.env.REACT_APP_BASE_URL;

// AUTH ENDPOINTS
export const authEndpoints = {
    SENDOTP_API: BASE_URL + "/user/sendotp",
    SIGNUP_API: BASE_URL + "/user/signup",
    LOGIN_API: BASE_URL + "/user/login",
    CHECK_AUTH: BASE_URL + "/user/checkAuth",
    FORGOTPASWORD_API: BASE_URL + "/user/forgotmail",
    UPDATEPASSWORD_API: BASE_URL + "/user/updatepassword",
}

//PROFILE ENDPOINTS
export const profileEndpoints = {
    EDIT_PROFILE : BASE_URL + "/user/auth/editprofile",
    RESET_PASSWORD : BASE_URL + "/user/auth/resetpassword",
    UPLOAD_PROFILE_PICTURE : BASE_URL + "/user/auth/uploadProfile",
    DELETE_ACCOUNT : BASE_URL
}

// QUIZ ENDPOINTS
export const quizEndpoints = {
    MAKE_QUIZ : BASE_URL + "/quiz/makequiz",
    UPDATE_QUIZ : BASE_URL + "/quiz/updatequiz",
    PUBLISH_QUIZ : BASE_URL + "/quiz/publishquiz",
    DELETE_QUIZ : BASE_URL + "/quiz/deletequiz",
    FETCH_ALL_QUIZ : BASE_URL + "/quiz/fetchallquiz",
    FETCH_ONE_QUIZ : BASE_URL + "/quiz/fetchonequiz",
    FETCH_QUIZES : BASE_URL + "/quiz/fetchquizes",
    FETCH_ATTEMPT_QUIZ : BASE_URL + "/quiz/fetchAttemptQuiz",
    SUBMIT_QUIZ : BASE_URL + "/quiz/submitQuiz",
    ANALYSE_QUIZ : BASE_URL + "/quiz/quizAnalytic",
    QUIZ_LEADERBOARD : BASE_URL + "/quiz/quizLeaderBoard",
}

// QUESTION ENDPOINTS
export const questionEndpoints = {
    ADD_QUES : BASE_URL + "/quiz/addQuizQues",
    REMOVE_QUES : BASE_URL + "/quiz/removeQuizQues",
    EDIT_QUES : BASE_URL + "/quiz/editQuizQues",
}