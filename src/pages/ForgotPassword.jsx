import React, { useState } from "react";
import cool from "../assets/coolbackground-1-1@2x.png";
import hand from "../assets/otp-1.svg"
import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Loader } from "../components/common/Loader";
import { useForm } from "react-hook-form";
import { forgotMail } from "../services/operations/auth";

export const ForgotPassword = () => {
  const {register, handleSubmit, formState : {errors}} = useForm();
  
  const { loading } = useSelector((state) => state.auth);
  const [sentEmail, setsentEmail] = useState(false);

  function submitHandler(data) {
    const tempdata = {
      email: data.youremail,
    };

    forgotMail(tempdata,sentEmail);
    // console.log(data,tempdata);
  }
  return (
        <div className="relative min-h-screen">{
        loading ? <Loader/> :
         <>
         <div className="max-h-[90vh] flex w-full">
                <img
                loading="lazy"
                className="min-h-[90vh] sm:max-h-[90vh] rounded-8xs w-1/2 object-cover"
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

            <div className="absolute bg-slate-50 left-1/2 -translate-x-1/2 w-[95vw] sm:max-w-[560px] px-4 sm:px-8 mb-3 py-8 top-[160px] sm:top-[175px] rounded-md flex flex-col gap-5 items-center justify-between">

              <p className="text-4xl sm:text-5xl font-bold text-blue-700">{!sentEmail ? "Reset Your Password" : "Check Email"}</p>
              <p className="text-lg -mt-2 mb-3 text-sky-900">{!sentEmail ? "Have no fear. We will email you instructions to reset your password.If you dont have access to your email we can try account recovery." : `We have sent the reset email to Your email} `}</p>

                
              <form onSubmit = {handleSubmit(submitHandler)} className="w-full flex flex-col gap-6">
                    <div className=" w-full">
                    <input 
                    id='email'
                    type="email"
                    placeholder='Enter Your email'
                    {...register("youremail", {required:true})}
                    className='w-full form-style'
                    />
                    {errors.youremail && (<span className="absolute w-max -translate-x-full -ml-4 mt-3 text-pink-700">email is required</span>)}
                    </div>

                <div className="flex flex-col gap-3 sm:gap-0 sm:flex-row justify-between items-center">
                  
                <button type="submit" className='w-max text-yellow-50 text-lg rounded-lg font-semibold bg-blue-600 px-4 py-2 mt-3 hover:bg-blue-700 duration-150'>Reset Password</button>

                <Link to={"/login"} className="flex gap-2 items-center text-blue-500 font-bold"><span><BsArrowLeft/></span> Back to Login</Link>
                </div>

              </form>

            </div>
            
            
         </>
        }</div>);
};
