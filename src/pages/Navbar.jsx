import React from "react";
import quizon from "../assets/photo-20230918-114700removebgpreview-1@2x.png";
import signin from "../assets/sign-1@2x.png";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {setToken,setTokenExpires} from "../slice/authSlice"
import {setUser} from "../slice/profileSlice"
import { toast } from "react-toastify";

export const Navbar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {token} = useSelector((state)=> state.auth);
  // console.log(token);

  // logout function
  const logout = () =>{
    dispatch(setToken(null));
    dispatch(setTokenExpires(null));
    dispatch(setUser(null));
    toast.success("Log Out Successful");
    navigate("/");
  }
  
  return (
    <div className="mx-auto py-0 max-w-[100vw] ">
    <div className="bg-gradient-to-r from-[#5B32B5] via-[#5b36a5] to-[#8169b3] shadow-lg w-full relative z-10">
      <div className="w-11/12 mx-auto max-w-[1600px] px-0 py-2 text-richblack-100 flex items-center justify-between">
        <img className="w-[188px] h-[58.93px]" alt="" src={quizon} />
        <div className="text-white font-medium text-lg gap-14 flex items-center justify-between group">
          <Link to={"/"} className="cursor-pointer hidden lg:block">Home</Link>
          <Link to={"/signup"} className="cursor-pointer hidden lg:block">Attempt quiz</Link>
          <Link to={"/makeQuiz"} className="cursor-pointer hidden lg:block">Create Quiz</Link>

          {
            token ? <Link to={"/dashboard/profile"} className="cursor-pointer hidden lg:block">Profile</Link> :
            <Link to={"/login"} className="cursor-pointer hidden lg:block">Log In</Link>
          }

          {
            token ? <button onClick={logout} className="text-blue-400 bg-white p-2 rounded-md px-4 hover:text-blue-500 duration-150">Log Out</button> :
            <Link to={"/signup"}>
            <img
              loading="lazy"
              className="cursor-pointer w-28"
              alt=""
              src={signin}
            />
          </Link>
          }
          
        </div>
      </div>
    </div>
    </div>
    
  );
};
