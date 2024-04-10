import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import cool from "../assets/coolbackground-1-1@2x.png";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../services/operations/auth";

export const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const[accountType,setAccountType] = useState("Student");
  const submitHandler = async (data) => {
    console.log(accountType,data);
    const newdata = {
      email :  data.yourEmail,
      password : data.yourPassword,
      account : accountType,
    }

    // make api call
    dispatch(login(newdata,navigate));
  }

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

      <div className="absolute bg-slate-50 top-0 left-1/2 -translate-x-1/2 w-[95vw] sm:max-w-[400px] sm:min-w-[512px] px-5 xs:px-8 sm:px-16 py-4 mt-5 rounded-md flex flex-col gap-3 sm:gap-5 items-center justify-between">
        <p className="text-4xl md:text-5xl font-bold text-blue-800">Welcome Back</p>

        {/* student and instructor switch tab */}
      <div className="p-1 bg-blue-100 text-lg font-medium rounded-full flex justify-between max-w-max mt-4 mb-2 gap-2">
        <button
          className={`${
            accountType === "Student"
              ? "bg-blue-600 text-blue-50"
              : "bg-tranparent text-blue-600"
          } py-2 px-5 rounded-full transition-all duration-300`}
          onClick={() => {
            setAccountType("Student");
          }}
        >
          Student
        </button>

        <button
          className={`${
            accountType === "Instructor"
              ? "bg-blue-600 text-blue-50"
              : "bg-tranparent text-blue-600"
          } py-2 px-5 rounded-full transition-all duration-300`}
          onClick={() => {
            setAccountType("Instructor");
          }}
        >
          Instructor
        </button>
      </div>
        <form onSubmit = {handleSubmit(submitHandler)} className="w-full flex flex-col gap-4 sm:gap-6">
        <div className=" w-full">
              <input 
              id='email'
              type="email"
              placeholder='Enter Your Email'
              {...register("yourEmail", {required:true})}
              className='w-full form-style'
          />
              {errors.yourEmail && (<span className="absolute w-max -translate-x-full -ml-4 mt-3 text-pink-700">Email is required</span>)}
          </div>
        
        <div className=" w-full">
              <input 
              id='password'
              type="password"
              placeholder='Enter Your Password'
              {...register("yourPassword", {required:true})}
              className='w-full form-style'
          />
              {errors.yourPassword && (<span className="absolute w-max -translate-x-full -ml-4 mt-3 text-pink-700">Password is required</span>)}
          </div>

        <Link to={"/forgotpassword"} className="text-blue-600 hover:text-blue-800 font-medium">
          Forgot password ?
        </Link>

        <button type="submit" className='w-full text-yellow-50 text-xl rounded-lg font-bold bg-blue-700 px-4 py-2 mt-4 hover:bg-blue-800 duration-150'>Sign In</button>

        <Link to={"/signup"} className="text-blue-600 hover:text-blue-800 font-medium">
          Don’t Have an Account? Sign Up
        </Link>
        </form>

      </div>
    </div>
  );
};
