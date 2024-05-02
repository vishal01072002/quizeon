import { toast } from "react-toastify"
import {apiConnector} from "../apiConnector"
import {authEndpoints} from "../apis"
import { setLoading, setToken, setTokenExpires } from "../../slice/authSlice";
import { setUser } from "../../slice/profileSlice";


// SEND OTP API
export function sendOTP(email,navigate,setSignupData,newForm){
  return async(dispatch) => {
      const toastId = toast.loading("Loading");
      dispatch(setLoading(true));

      try {
          const response = await apiConnector("POST",authEndpoints.SENDOTP_API, {email});
          // console.log("SENDOTP API RESPONSE............", response);

          if(! response.data.success){
            throw new Error(response.data.message);
          }

          // add otp token
          dispatch(setSignupData({...newForm, otpToken:response.data.otpToken}));
          toast.success("OTP Sent Successfully");

          navigate("/otpverify");
      } catch (error) {
          // console.log("SENDOTP API ERROR............", error);
          toast.error("Could Not Send OTP");
          // console.log(error);
      }
      dispatch(setLoading(false));
      toast.dismiss(toastId);
  }
}


// SIGNUP API
export const signup = (signupUpdated,navigate)=>{
  return async(dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST",authEndpoints.SIGNUP_API,signupUpdated);
        // console.log("SENDOTP API RESPONSE............", response);

        if(! response.data.success){
          throw new Error(response.data.message);
        }

        toast.success("Signup Successfully");
        navigate("/login");
    } catch (error) {
      // console.log("SIGNUP API ERROR............", error);
      toast.error(error.data.message);
      // console.log(error);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  }
}


// LOGIN API
export const login = (data,navigate) => {
  return async(dispatch)=>{    
    const toastId = toast.loading("Loading...");
    
    try {
      const response = await apiConnector("POST",authEndpoints.LOGIN_API,data);
      // console.log("LOGIN API RESPONSE \n", response);
      
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      
      toast.success("Login Successful");

      // set token in slice and local storage
      dispatch(setToken(response.data.token));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      
      // set token expires
      dispatch(setTokenExpires(response.data.tokenExpires));
      localStorage.setItem("tokenExpires", JSON.stringify(response.data.tokenExpires));
      
      // set user info in profile slice
      dispatch(setUser(response.data.user));
      navigate("/dashboard/profile");
      
    } catch (error) {
      // console.log("LOGIN API ERROR............", error);
      toast.error(error.response.data.message);
    }
    
    toast.dismiss(toastId);
  }
}

export const forgotMail = async(data,sentEmail)=>{
  const toastId = toast.loading("Loading");
  try {
    const response = await apiConnector("POST",authEndpoints.FORGOTPASWORD_API,data);
      // console.log("FORGOT PASWORD API RESPONSE \n", response);
      
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      
      // console.log(response.data.url);
      toast.success("Check Your Email");

  } catch (error) {
    // console.log("FORGOT PASWORD API ERROR............", error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
}

export const updatePassword = async(data,navigate)=>{
  const toastId = toast.loading("Loading");
  try {
    const response = await apiConnector("POST",authEndpoints.UPDATEPASSWORD_API,data);
      // console.log("UPDATE PASWORD API RESPONSE \n", response);
      
      if (!response.data.success) {
        toast.error(response.data.message);
        throw new Error(response.data.message);
      }
      navigate("/login");
      toast.success("Password Updated Sucessful");

  } catch (error) {
    // console.log("UPDATE PASWORD API ERROR............", error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
}