import React, { useEffect } from "react";
import logo from "../assets/rectangle-11.svg";
import group5 from "../assets/group-5.svg";
import rect15 from "../assets/rectangle-15.svg";
import rect16 from "../assets/rectangle-16.svg";
import rect17 from "../assets/rectangle-17.svg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {logOut} from '../slice/authSlice'
import { toast } from "react-toastify";

export const Home = () => {

  const {tokenExpires} = useSelector((state)=> state.auth);
  const dispatch = useDispatch();

  useEffect( ()=> {
    // console.log(token,tokenExpires,Date.now());
    // console.log(tokenExpires - Date.now());
    if(tokenExpires - Date.now() < 0){
      //logOut
      dispatch(logOut());
      // toast.success("Token Expires");
      // toast.success("Logout Sucessful");
    }
  });

  return (
    <>
    <div className="m-0 p-0 w-[100vw] ">
      {/* bg-gradient-to-r from-[#5B32B5] via-[#5b36a5] to-[#8169b3] */}
      <div className="w-full h-full overflow-hidden pt-10 min-h-[88.5vh] relative z-10">

        {/* <img loading="lazy" className="max-w-[100vw] inset-0 absolute -z-10" src={logo}/> */}
        <div className="inset-0 absolute -z-10 bg-gradient-to-r from-[#5B32B5] to-[#7452bd]"></div>
        {/* {purple part} */}
        <div className="w-11/12 mx-auto max-w-[1600px] h-full justify-between flex text-white items-end bg-cover">
          
          {/* {left part} */}
          <div className="text-white w-full sm:w-[75%] md:w-[60%] flex flex-col text-left ">
            <p className="font-extrabold text-4xl lg:text-5xl">Daily Quiz</p>
            <p className="font-extrabold text-4xl lg:text-5xl">Play Today !</p>
            <p className="mt-8 font-medium text-xl md:text-2xl w-[100%] sm:w-[70%]">
            Join now to create & attempt quizzes, and test your skills with
            public and private quizzes. Engage, learn, and have fun!
          </p>
            <Link to={"/login"} className="text-lg md:text-xl font-medium text-black w-[170px] md:w-[200px] mt-10">
              <div className=" w-full px-2 md:px-4 font-[400] h-[45px] md:h-[50px] flex items-center justify-center text-left gap-2 border-pure-greys-25 border-r-[1px] border-b-[1.2px] rounded-md hover:scale-90 transition-all duration-200 cursor-pointer bg-yellow-500 text-black ">
                <img loading="lazy" className="w-[25px] h-[25px]" alt="" src={group5} />PLAY TODAY</div>
            </Link>
          </div>

          {/* {right part} */}
          <div className="hidden sm:flex sm:w-[35%] lg:w-1/2 gap-5 items-end justify-end">
            <img loading="lazy"
            className="bg-contain w-[35%] lg:w-[25%]"
            alt=""
            src={rect15}
            />
            <img loading="lazy"
            className="bg-contain w-[35%] lg:w-[25%]"
            alt=""
            src={rect16}
            />
            <img loading="lazy"
            className="bg-contain w-[35%] lg:w-[25%]"
            alt=""
            src={rect17}
            />
          </div>
        </div>
      </div>
    </div>
    </>
  );
};
