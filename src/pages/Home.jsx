import React from "react";
import logo from "../assets/rectangle-11.svg";
import group5 from "../assets/group-5.svg";
import rect15 from "../assets/rectangle-15.svg";
import rect16 from "../assets/rectangle-16.svg";
import rect17 from "../assets/rectangle-17.svg";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <>
    <div className="m-0 p-0 w-[100vw] ">
      {/* bg-gradient-to-r from-[#5B32B5] via-[#5b36a5] to-[#8169b3] */}
      <div className="w-full h-full overflow-hidden pt-10 min-h-[88.5vh] relative z-10">

        <img loading="lazy" className="max-w-[100vw] top-0 left-0 absolute -z-10" src={logo}/>

        {/* {purple part} */}
        <div className="w-11/12 mx-auto max-w-[1600px] h-full justify-between flex text-white items-center">
          
          {/* {left part} */}
          <div className="width-[40%] text-white flex flex-col text-left ">
            <p className="font-extrabold text-5xl">Daily Quiz</p>
            <p className="font-extrabold text-5xl">Bonus- Play Today !</p>
            <p className="mt-8 font-medium text-2xl w-[70%]">
            Join now to create & attempt quizzes, and test your skills with
            public and private quizzes. Engage, learn, and have fun!
          </p>
            <Link to={"/login"} className="text-xl font-medium text-black w-[200px] mt-10">
              <div className=" w-full px-4 font-[400] h-[50px] flex items-center justify-center text-left gap-2 border-pure-greys-25 border-r-[1px] border-b-[1.2px] rounded-md hover:scale-90 transition-all duration-200 cursor-pointer bg-yellow-500 text-black ">
                <img loading="lazy" className="w-[25px] h-[25px]" alt="" src={group5} />PLAY TODAY</div>
            </Link>
          </div>

          {/* {right part} */}
          <div className="flex w-1/2 gap-5 items-end ">
            <img loading="lazy"
            className="bg-contain"
            alt=""
            src={rect15}
            />
            <img loading="lazy"
          className="bg-contain"
          alt=""
          src={rect16}
        />
            <img loading="lazy"
          className="bg-contain"
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
