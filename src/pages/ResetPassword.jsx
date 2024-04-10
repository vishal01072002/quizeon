import React, { useEffect, useState } from "react";
import cool from "../assets/coolbackground-1-1@2x.png";
import hand from "../assets/otp-1.svg"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Loader } from "../components/common/Loader";
import { resetPassword } from "../services/operations/profile";

export const ResetPassword = () => {

  const {loading, user} = useSelector((state) => state.profile);
  const {token} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {register, handleSubmit, formState : {errors}} = useForm();
  
  const submitHandler = async(data)=> {
    const newData = {...data, email:user.email};
    dispatch(resetPassword(newData,token,navigate));
  }

  return (
    
    <div className="relative">
        <div className="relative max-h-screen">{
        loading ? <Loader/> :
         <>
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

                <p className="text-4xl sm:text-5xl font-bold text-blue-700">Reset Your Password</p>
                <p className="text-lg sm:text-xl -mt-2 mb-3 text-blue-800">we will Update your password to new One</p>

                
                <form onSubmit = {handleSubmit(submitHandler)} className="w-full flex flex-col gap-6">
                    <div className=" w-full">
                    <input 
                    id='password'
                    type="password"
                    placeholder='Enter Your Old Password'
                    {...register("oldPassword", {required:true})}
                    className='w-full form-style'
                    />
                    {errors.oldPassword && (<span className="absolute w-max -translate-x-full -ml-4 mt-3 text-pink-700">Password is required</span>)}
                    </div>
                    
                    <div className=" w-full">
                    <input 
                    id='newpassword'
                    type="password"
                    placeholder='Enter Your New Password'
                    {...register("newPassword", {required:true})}
                    className='w-full form-style'
                />
                    {errors.newPassword && (<span className="absolute w-max -translate-x-full -ml-4 mt-3 text-pink-700">Password is required</span>)}
                </div>

                <button type="submit" className='w-full text-yellow-50 text-xl rounded-lg font-bold bg-blue-700 px-4 py-2 mt-3 hover:bg-blue-800 duration-150'>Reset Password</button>
                </form>

            </div>
         </>
        }</div>
    </div>    
  );
};
