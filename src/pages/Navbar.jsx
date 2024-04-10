import React from "react";
import quizon from "../assets/photo-20230918-114700removebgpreview-1@2x.png";
import signin from "../assets/sign-1@2x.png";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {setToken,setTokenExpires,logOut} from "../slice/authSlice"
import {setUser} from "../slice/profileSlice"
import { toast } from "react-toastify";
import {FiMenu} from "react-icons/fi"

export const Navbar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {token} = useSelector((state)=> state.auth);
  const {user} = useSelector((state)=> state.profile);
  // console.log(token);

  // logout function
  const logout = () =>{
    dispatch(logOut());
    dispatch(setUser(null));
    toast.success("Log Out Successful");
    navigate("/");
  }
  
  return (
    <div className="mx-auto py-0 max-w-[100vw]">
    <div className="bg-gradient-to-r from-[#5B32B5] via-[#5b36a5] to-[#8169b3] shadow-lg w-full relative z-10">
      <div className="w-[98vw] xs:w-11/12 mx-auto max-w-[1600px] px-0 py-2 text-richblack-100 flex items-center justify-between">
        <Link to={"/"}><img className="w-[130px] xs:w-[155px] md:w-[188px] md:h-[58.93px]" alt="logo" src={quizon} /></Link>
        <div className="text-white font-medium text-lg gap-3 xs:gap-5 lg:gap-10 flex items-center group">
          <Link to={"/"} className="cursor-pointer hidden lg:block">Home</Link>

          {(!token || (user && user.account === "Student")) && <Link to={"/dashboard/AttemptQuiz/page/1"} className="cursor-pointer hidden lg:block">Attempt quiz</Link>}

          {(!token || (user && user.account === "Instructor")) && <Link to={"/dashboard/MakeQuiz"} className="cursor-pointer hidden lg:block">Create Quiz</Link>}

          {
            token ? <Link to={"/dashboard/profile"} className="cursor-pointer border-2 py-1 xs:py-[6px] px-3 xs:px-5 rounded-md">Profile</Link> :
            <Link to={"/login"} className="cursor-pointer border-2 py-1 xs:py-[6px] px-3 xs:px-5 rounded-md">Log In</Link>
          }

          {
            token ? <button onClick={logout} className="text-blue-400 bg-white py-1 xs:py-[6px] px-3 xs:px-5 rounded-md border-2 hover:text-blue-500 duration-150">Log Out</button> :
            <Link to={"/signup"}>
            <img
              loading="lazy"
              className="cursor-pointer w-24 xs:w-28"
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
