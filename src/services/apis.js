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