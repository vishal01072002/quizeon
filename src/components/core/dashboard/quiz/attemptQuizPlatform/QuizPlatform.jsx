import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { IoWarning} from "react-icons/io5"
import { toast } from 'react-toastify';
import { setPlatformQuiz, setQuizStatus } from '../../../../../slice/quizPlatformSlice';
import { fetchAttemptQuiz } from '../../../../../services/operations/quiz';
import isTabOpen from "./useIsTabOpen";
import {Loader} from "../../../../common/Loader"
import { QuizSection } from './QuizSection';
import trophy1 from "../../../../../assets/trophy-1-imgs.png"

export const QuizPlatform = ({docu = document}) => {

    const {quizes, quizStatus, submitLoading} = useSelector((state) => state.quizPlatform);
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const location = useLocation();
    const {quizId} = useParams();
    const [showScores, setShowScores] = useState([null,0]);
    const [loading, setLoading] = useState(true);
    const [warningCount, setWarningCount] = useState(0);
    const [warn, setWarn] = useState(false);

    // reffernce for make full screen
    const fullScreenMode = useRef(null);

    // if current tab is close/Change to another so its value will be false
    const isOpen = isTabOpen();
    

    const startQuiz = () => {
      dispatch(setQuizStatus("Start"));
      enterFullScreen();
    }

    const showScore = () => {
      // exitFullScreen();
      dispatch(setQuizStatus("None"));
      const finalScore = showScores[1];
      setShowScores([true,finalScore]);
    }

    const fetchQuiz = async() =>{
        setLoading(true);
        const data = {quizId : quizId};
        const result = await fetchAttemptQuiz(data,token);
        dispatch(setPlatformQuiz(result));
        // console.log(result);
        setLoading(false);
    }

// ================ make full screen toggles on quiz time ============
    const enterFullScreen = () =>{
        const ele = fullScreenMode.current;
        if(ele.requestFullscreen){
            ele.requestFullscreen();
        }
        else if(ele.webkitRequestFullscreen){
            // for chrome, safari, opera
            ele.webkitRequestFullscreen();
        }
        else if(ele.mozRequestFullScreen){
            // mozila
            ele.mozRequestFullScreen();
        }
    }

    const exitsFullScreen = () => {
        // const ele = fullScreenMode.current;
        if(docu.exitFullscreen){
          docu.exitFullscreen();
        }
        else if(docu.webkitExitFullscreen){
            // for chrome, safari, opera
            docu.webkitExitFullscreen();
        }
        else if(docu.mozCancelFullScreen){
            // mozila
            docu.mozCancelFullScreen();
        }
    }

    useEffect(() => {
        fetchQuiz();
    },[]);

// ======================= Cheating test  ======================

// generate warning
const generateWarning = () => {
  if(quizStatus === "Start"){
    setWarn(true);
    setWarningCount((state) => state + 1);
  }
}

// if exit full screen mode 3 times then auto submit
    useEffect(() => {
      const onFullScreenChange = () => {
        // console.log(document.fullscreenElement);
        if(document.fullscreenElement){
          // means full screen window is open
        }
        else{
          // full Screen window is close
          generateWarning();
        }
      }

      document.addEventListener("fullscreenchange", onFullScreenChange);

      return () => {
        document.removeEventListener("fullscreenchange", onFullScreenChange);
      }
    },[quizStatus]);

    useEffect(() => {
      if(isOpen === false){
        generateWarning();
      }
    },[isOpen])

    useEffect(()=>{
      dispatch(setQuizStatus("None"));
      // Todos auto submit Quiz 
    },[location.pathname])

    // 'rgba(76, 175, 80, 0.7)' // Green for correct answer
    // 'rgba(244, 67, 54, 0.7)' // Red for wrong answer
    // 'rgba(33, 150, 243, 0.7)', // Blue for default state
  
  return (
    <>
      {
        loading ? <Loader/> : 
         <div ref={fullScreenMode} className='relative flex items-center justify-center flex-col min-h-[88.5vh] overflow-x-hidden w-full bg-gradient-to-tr from-blue-600 via-purple-600 to-pink-500 to-60%'>
          {
            quizStatus === "None" && quizes && showScores[0] === null && <div>
              {
                 <div className='px-4 rounded-sm py-3 bg-white flex flex-col gap-5 -mt-20 text-lg bg-opacity-80 drop-shadow-lg'>
                  <p className='text-2xl'>Quiz Information</p>
                  <div className='flex gap-3 text-start pb-4'>
                    <div>
                      <p>Quiz Name</p>
                      <p>Quiz Time</p>
                      <p>Questions</p>
                    </div>
                    <div>
                      <p>:</p>
                      <p>:</p>
                      <p>:</p>
                    </div>
                    <div>
                      <p>{quizes.quizName}</p>
                      <p>{quizes.duration} Min</p>
                      <p>{quizes.questions.length}</p>
                    </div>
                  </div>
                 </div>
              }
              <button type='button' onClick={()=>startQuiz()} className='px-4 py-1 rounded-md mt-5 bg-opacity-90 hover:bg-opacity-100 transition-opacity duration-200 bg-white'>Start</button>
            </div>
          }

            <QuizSection setShowScores={setShowScores}/>
          

          { quizStatus === "End" && showScores[0] === null && 
            <div>
              <button type='button' onClick={()=>{exitsFullScreen(); showScore()}} className='px-4 py-1 rounded-md mt-5 bg-opacity-90 hover:bg-opacity-100 transition-opacity duration-200 bg-white'>{submitLoading ? "Calculating Score..." : "See your Score"}</button>
            </div>
          }

          {
            showScores[0] !== null && <div className='w-[300px] px-2 bg-white rounded-md text-black flex flex-col py-4 items-center text-2xl'>
              <img src={trophy1} loading='lazy'/>
              <div className='mt-3 flex flex-col items-center gap-4'>
                <p className='font-extrabold text-blue-950'>Congrats!</p>
                <p className='font-bold text-green-500 text-[2rem]'>Score {(showScores[1])} Points</p>
                <p className='text-xl'>Quiz completed sucessfully.</p>
              </div>  
            </div>
          }

          {
            warn && <div className='inset-0 flex flex-col items-center justify-center absolute bg-red-200 bg-opacity-70 z-10'>
              <p className='text-3xl text-red-700 font-semibold mb-3'>Warning</p>
              <p className='text-lg'>*This is warning for change Tab or exit full screen. Next Time You will be Disqualifying*</p>
              <button type='button' 
                className='bg-red-600 mt-3 px-4 py-1 rounded-md text-white text-2xl'
                onClick={()=>{enterFullScreen(); setWarn(false);}} >
                Ok
              </button>
            </div>
          }

          {
            // if warning
            warningCount > 0 && quizStatus !== "End" && <div className='text-2xl flex items-center gap-3 absolute top-2 right-2 rounded-sm shadow-sm font-medium py-[2px] px-4 text-black bg-yellow-400'>
              <IoWarning/>
              <span>{warningCount} Warning</span>
            </div>
          }
        </div>
      }
      
    </>
  )
}
