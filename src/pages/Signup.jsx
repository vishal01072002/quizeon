import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import cool from "../assets/coolbackground-1-1@2x.png";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setSignupData } from "../slice/authSlice";
import { sendOTP } from "../services/operations/auth";


export const Signup = () => {

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const[accountType,setAccountType] = useState("Student");
  const submitHandler = async(data)=> {

      // either we can access from data or getValues()
      const currData = getValues();
      // console.log(data);
      // console.log(currData);
      // console.log(currData.YourName,currData.YourEmail,currData.YourPassword,currData.confirmPassword);

      // split name
      const fullname = data.YourName.split(" ");
      console.log(fullname);

      //match password
      if(data.YourPassword !== data.confirmPassword){
        toast.error("Password Not Match");
        return;
      }

      // create object variable to store that all data
      const newForm = {
        firstName : fullname[0],
        lastName : fullname[1],
        account : accountType,
        email : data.YourEmail,
        password : data.YourPassword,
        confirmPassword : data.confirmPassword,
      };

      // store in slice
      console.log(newForm);
      dispatch(setSignupData(newForm));

      // call send otp function
      dispatch(sendOTP(data.YourEmail,navigate,setSignupData,newForm));
    }

  return (
    <div className="relative max-h-screen">
      <div className="max-h-screen flex w-full">
        <img
          loading="lazy"
          className="max-h-[90vh] rounded-8xs w-1/2 object-cover"
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

      <div className="absolute bg-slate-50 top-0 left-1/2 -translate-x-1/2 mx-auto min-w-[512px] px-16 py-4 mt-5 rounded-md flex flex-col gap-5 items-center justify-between">
        <p className="text-5xl font-bold text-blue-800">Welcome Back</p>

        {/* student and instructor switch tab */}
      <div className="p-1 bg-blue-100 text-lg font-medium rounded-full flex justify-between max-w-max mb-4 gap-2">
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
        <form onSubmit={handleSubmit(submitHandler)} className="w-full flex flex-col gap-5">
          <div className=" w-full">
              <input 
              id='Name'
              type="text"
              placeholder='Enter Your Full Name'
              {...register("YourName", {required:true})}
              className='w-full form-style'
          />
              {errors.YourName && (<span>Name is required</span>)}
          </div>

          <div className=" w-full">
              <input 
              id='email'
              type="email"
              placeholder='Enter Your Email'
              {...register("YourEmail", {required:true})}
              className='w-full form-style'
          />
              {errors.YourEmail && (<span>Email is required</span>)}
          </div>
        
        <div className=" w-full">
              <input 
              id='password'
              type="password"
              placeholder='Enter Your Password'
              {...register("YourPassword", {required:true})}
              className='w-full form-style'
          />
              {errors.YourPassword && (<span>Password is required</span>)}
          </div>

        <div className=" w-full">
              <input 
              id='confirmPassword'
              type="password"
              placeholder='Enter Confirm Password'
              {...register("confirmPassword", {required:true})}
              className='w-full form-style'
          />
              {errors.confirmPassword && (<span>confirmPassword is required</span>)}
          </div>

        <button type="submit" className='w-full text-yellow-50 text-xl rounded-lg font-bold bg-blue-700 px-4 py-2 mt-2 hover:bg-blue-800 duration-150'>Sign Up</button>

        <Link to={"/login"} className="text-blue-600 hover:text-blue-800 font-medium">
        Already Have an Account? Login  
        </Link>
      </form>

      </div>
    </div>
  );
};
