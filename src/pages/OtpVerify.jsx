import React, { useEffect, useState } from "react";
import cool from "../assets/coolbackground-1-1@2x.png";
import OTPInput from "react-otp-input";
import hand from "../assets/otp-1.svg"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendOTP, signup } from "../services/operations/auth";
import { setSignupData } from "../slice/authSlice";

export const OtpVerify = () => {

  const {loading, signupData} = useSelector((state) => state.auth);
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const submitHandler = async(event)=> {
    event.preventDefault();

    console.log(otp);
    const signupUpdated = {...signupData,otp:otp}
    console.log(signupUpdated);

    dispatch(signup(signupUpdated,navigate));
  }

  const resendOtp = async() => {
    dispatch(sendOTP(signupData.email,navigate,setSignupData,signupData));
  }

  // first check signUp data is available in slice or not
  useEffect(()=>{
    if(!signupData){
      navigate("/signup")
    }
  },[]);

  return (
    <div className="relative max-h-screen">
      <div className="max-h-screen flex w-full">
        <img
          loading="lazy"
          className="min-h-screen sm:max-h-[90vh] rounded-8xs w-1/2 object-cover"
          alt=""
          src={cool}
        />

        <div className="relative overflow-hidden w-1/2">
          <div className="absolute -top-16 -right-16 rounded-[50%] bg-[#242B7A] w-36 h-36" />

          <div className="absolute top-[16%] right-[35%] rounded-[50%] bg-[#D1941B] w-8 h-8" />

          <div className="absolute top-[32%] right-[18%] rounded-[50%] bg-[#242B7A] w-16 h-16" />

          <div className="absolute -bottom-[8%] -left-[10%] rounded-[50%] bg-[#D1941B] w-36 h-36" />

          <div className="absolute top-[60%] right-[20%] rounded-[50%] bg-[#D1941B] w-32 h-32" />

          <div className="absolute -bottom-16 -right-10 rounded-[50%] bg-[#242B7A] w-36 h-36" />

          <div className="absolute top-[70%] left-[40%] rounded-[50%] bg-[#242B7A] w-8 h-8" />
        </div>
      </div>
     <img loading="lazy" className="absolute left-1/2 mt-6 -translate-x-1/2 w-28 sm:w-36 top-0" src={hand} alt="background"/>
      <div className="absolute bg-slate-50 left-1/2 -translate-x-1/2 w-[95vw] sm:max-w-[512px] px-4 xs:px-8 sm:px-16 py-8 top-[160px] sm:top-[175px] rounded-md flex flex-col gap-5 items-center justify-between">

        <p className="text-4xl sm:text-5xl font-bold text-blue-700">OTP verification</p>
        <p className="text-lg sm:text-xl text-blue-800">we will send you a one-time password to Your Email</p>

        
        <form onSubmit={submitHandler} className="w-full flex flex-col gap-6 my-2">
        <div className=" w-full">
        <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              containerStyle={{
                justifyContent: "space-between",
                gap: "0 6px",
              }}
              inputStyle={{width: "2.8rem", height:"2.8rem"}}
              // renderSeparator={<span>-</span>}
              renderInput={(props) => (
                <input {...props} placeholder="-" className="border-0 bg-blue-500  text-blue-50 aspect-square text-center text-2xl font-medium focus:border-0 focus:outline-1 focus:outline-yellow-50" />
              )}
            ></OTPInput>
          </div>

          <button onClick={resendOtp} className="text-black mt-4 font-medium">
          Didn’t receive the OTP? <span className="text-blue-600 hover:text-blue-800 font-semibold text-lg">Resend OTP</span>
          </button>

          <button type="submit" className='w-full text-yellow-50 text-lg sm:text-xl rounded-lg font-bold bg-blue-700 px-4 py-2 mt-0 hover:bg-blue-800 duration-150'>Verify OTP</button>
        </form>

      </div>
    </div>
  );
};
