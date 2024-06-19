import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { IoWarning } from "react-icons/io5"
import { MdOutlineZoomOutMap, MdLaptopMac} from "react-icons/md"
import { BsPersonX } from "react-icons/bs"
import { setPlatformQuiz, setQuizStatus } from '../../../../../slice/quizPlatformSlice';
import { fetchAttemptQuiz } from '../../../../../services/operations/quiz';
import isTabOpen from "./useIsTabOpen";
import {Loader} from "../../../../common/Loader"
import { QuizSection } from './QuizSection';
import trophy1 from "../../../../../assets/trophy-1-imgs.png"
import "./perks/Fiftyfifty.css"

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
    const navigate = useNavigate();

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
        // eslint-disable-next-line
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
    // eslint-disable-next-line
    },[quizStatus]);

    // quiz Instructions data
    const perks2XCount = useMemo(()=>{
      if(quizes?.questions?.length <= 5) return 1 ; 
      if(quizes?.questions?.length < 15) return 2 ;
      if(quizes?.questions?.length <= 25 ) return 3 ;
      if(quizes?.questions?.length <= 40 ) return 4 ;
      return 5;
    },[quizes]);

    const neededStreek = useMemo(()=>{
      if(quizes?.questions?.length <= 5) return 3 ;
      if(quizes?.questions?.length < 15) return 4 ;
      if(quizes?.questions?.length <= 25 ) return 5 ;
      if(quizes?.questions?.length <= 40 ) return 6 ;
      return 7;
    },[quizes]);

    const perks50_50Count = useMemo(()=>{
      if(quizes?.questions?.length < 15) return 1 ;
      if(quizes?.questions?.length <= 40 ) return 2 ;
      return 3;
    },[quizes]);

    const neededScore = useMemo(()=>{
      if(quizes?.questions?.length <= 5) return [80] ;
      if(quizes?.questions?.length < 15) return [70] ;
      if(quizes?.questions?.length <= 40 ) return [50,75] ;
      return [40,60,80];
    },[quizes]);

    useEffect(() => {
      if(isOpen === false){
        generateWarning();
      }
    // eslint-disable-next-line
    },[isOpen])

    useEffect(()=>{
      dispatch(setQuizStatus("None"));
      // Todos auto submit Quiz 
    // eslint-disable-next-line
    },[location.pathname])

    // 'rgba(76, 175, 80, 0.7)' // Green for correct answer
    // 'rgba(244, 67, 54, 0.7)' // Red for wrong answer
    // 'rgba(33, 150, 243, 0.7)', // Blue for default state
    // gradient bg-gradient-to-tr from-blue-400 via-purple-400 to-pink-400 to-60%
  
  return (
    <>
      {
        loading ? <Loader/> : 
         <div ref={fullScreenMode} className={`relative flex items-center flex-col min-h-[88.5vh] overflow-x-hidden w-full ${quizStatus === "Start" ? "bg-violet-500" : "bg-violet-950"}`}>
          {/* <div className='h-32 w-32 left-0 bg-amber-400 absolute rounded-full'></div> */}
          {
            quizStatus === "None" && quizes && showScores[0] === null && <div className='text-white w-11/12 lg:w-3/4'>
              {
                <>
                  <div className='px-1 xs:px-4 mt-5 rounded-sm py-3 flex flex-col gap-5 text-lg drop-shadow-lg'>
                    <p className='py-1 border-purple-400 xs:w-max px-2 rounded-sm border-t-2 border-b-2 text-xl text-center mx-auto mb-5'>Let's Know something about this Quiz.</p>
                    <div className='flex flex-col md:flex-row gap-5 items-center text-start pb-4'>      
                      <p className='relative w-11/12 xs:w-10/12 xxs:w-[60%] md:w-auto text-xl font-semibold text-gray-100 group flex-1 bg-violet-800 rounded-sm border text-center px-1 py-3'>Quiz Name : {quizes.quizName} <span className='z-[-1] top-0 left-0 group-hover:translate-x-3 group-hover:translate-y-3 duration-300 h-full w-full absolute bg-white rounded-sm'></span></p>
                      <p className='relative w-11/12 xs:w-10/12 xxs:w-[60%] md:w-auto text-xl font-semibold text-gray-100 group flex-1 bg-violet-800 rounded-sm border text-center px-1 py-3'>Quiz Time : {quizes.duration} Min <span className='z-[-1] top-0 left-0 group-hover:translate-x-3 group-hover:translate-y-3 duration-300 h-full w-full absolute bg-white rounded-sm'></span></p>
                      <p className='relative w-11/12 xs:w-10/12 xxs:w-[60%] md:w-auto text-xl font-semibold text-gray-100 group flex-1 bg-violet-800 rounded-sm border text-center px-1 py-3'>Questions : {quizes.questions.length} <span className='z-[-1] top-0 left-0 group-hover:translate-x-3 group-hover:translate-y-3 duration-300 h-full w-full absolute bg-white rounded-sm'></span></p>
                    </div>
                  </div>

                  <div className='bg-white rounded-md text-violet-800 my-10 pt-10 pb-14 px-5'>
                    <div className='flex flex-col gap-8 px-2 sm:px-5 text-start'>
                      <p className='text-3xl gradient bg-gradient-to-b from-fuchsia-600 to-violet-600 bg-clip-text text-transparent font-extrabold'>Instructions</p>
                      <div className='flex flex-col md:flex-row gap-1 md:gap-5 lg:gap-2 justify-between'>
                        <div className='flex flex-col gap-1'>
                          <p> <span className='font-semibold text-xl mr-2 text-violet-900'>1.</span>Complete quiz in time duration or it will be automatic submit.</p>
                          <p> <span className='font-semibold text-xl mr-2 text-violet-900'>2.</span>You will get 100 Point for each correct question.</p>
                          <p> <span className='font-semibold text-xl mr-2 text-violet-900'>3.</span>No negative marking on wrong Question.</p>
                        </div>
                        <div className='flex flex-col gap-1'>
                          <p> <span className='font-semibold text-xl mr-2 text-violet-900'>4.</span>Switching tab and or exiting full screen generate warning.</p>
                          <p> <span className='font-semibold text-xl mr-2 text-violet-900'>5.</span>You can not go to previous Or skip the question.</p>
                          <p> <span className='font-semibold text-xl mr-2 text-violet-900'>6.</span>More than 3 warning make you Disqualify.</p>
                        </div>
                      </div>
                    </div>
                    <div className='flex flex-col gap-8 px-2 sm:px-5 mt-8 text-start'>
                      <p className='text-3xl gradient bg-gradient-to-b from-fuchsia-600 to-violet-600 bg-clip-text text-transparent font-extrabold text-start'>Power Up</p>
                      <div className='flex flex-col gap-1'>
                        <p><span className='font-semibold text-xl mr-2 text-violet-900'>1.</span>There are two types of Power-Up.</p>
                        <p><span className='font-semibold text-xl mr-2 text-violet-900'>2.</span>You can activate one type Power-Up for a particular Question.</p>
                        <p><span className='font-semibold text-xl mr-2 text-violet-900'>3.</span>Both type of Power-Up also can be apply at single time.</p>
                      </div>
                      <div className='flex flex-col md:flex-row gap-5 lg:gap-2'>
                        <div className='flex-1 flex flex-col gap-1 items-start'>
                          <div className='box gradient bg-gradient-to-tr from-fuchsia-900 to-violet-900 w-max my-4'>
                            <button className='btn'>Acivate 2X</button>
                            <div className="space">
                              <span style={{"--i": 31}} className="star"></span>
                              <span style={{"--i": 12}} className="star"></span>
                              <span style={{"--i": 57}} className="star"></span>
                              <span style={{"--i": 93}} className="star"></span>
                              <span style={{"--i": 23}} className="star"></span>
                              <span style={{"--i": 70}} className="star"></span>
                              <span style={{"--i": 6}} className="star"></span>
                            </div>
                          </div>
                          <p><span className='font-semibold text-xl mr-2 text-violet-900'>1.</span>It will give you 2X Point for correct answer.</p>
                          <p><span className='font-semibold text-xl mr-2 text-violet-900'>2.</span>To activate 2X Power-Up you need to maintain the <span className='text-white bg-fuchsia-500 text-lg px-2 rounded-md'>streek of {neededStreek}</span> correct question.</p>
                          <p><span className='font-semibold text-xl mr-2 text-violet-900'>3.</span>You can activate 2X Power-Up <span className='text-white bg-fuchsia-500 text-lg px-2 rounded-md'>{perks2XCount} times</span> in this quiz.</p>
                        </div>
                        <div className='flex-1 flex flex-col gap-1 items-start'>
                        <div className='box gradient bg-gradient-to-tr from-fuchsia-900 to-violet-900 w-max my-4'>
                            <button className='btn'>Acivate 50-50</button>
                            <div className="space">
                              <span style={{"--i": 31}} className="star"></span>
                              <span style={{"--i": 12}} className="star"></span>
                              <span style={{"--i": 57}} className="star"></span>
                              <span style={{"--i": 93}} className="star"></span>
                              <span style={{"--i": 23}} className="star"></span>
                              <span style={{"--i": 70}} className="star"></span>
                              <span style={{"--i": 6}} className="star"></span>
                            </div>
                          </div>
                          <p><span className='font-semibold text-xl mr-2 text-violet-900'>1.</span>It will give 1 wrong & correct option to select.</p>
                          <p><span className='font-semibold text-xl mr-2 text-violet-900'>2.</span>To activate 50-50 Power-Up you need to cross <span className='text-white bg-fuchsia-500 text-lg px-2 rounded-md'>{neededScore?.join("%, ")}% score(s)</span>for this quiz.</p>
                          <p><span className='font-semibold text-xl mr-2 text-violet-900'>3.</span>You can activate 50-50 Power-Up <span className='text-white bg-fuchsia-500 text-lg px-2 rounded-md'>{perks50_50Count} times</span> in this quiz.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-col items-center'>
                    <p className='text-3xl font-semibold mb-5 pt-2'>Rules of the Quiz</p>
                    <div className='flex gap-5 xxs:gap-10 flex-col xxs:flex-row text-violet-800 text-lg font-semibold leading-5'>
                      <div className='flex flex-col items-center gap-4 py-3 bg-white rounded-md w-[250px]  xxs:w-[150px] md:w-[250px] group'>
                        <div className='flex items-center justify-center bg-pink-400 text-white p-3 rounded-full'><MdLaptopMac className='group-hover:scale-150 duration-300' fontSize={30}/></div>
                        <p><span>Do Not </span><span> Switch Tab</span></p>
                      </div>
                      <div className='flex flex-col items-center gap-4 py-3 bg-white rounded-md w-[250px]  xxs:w-[150px] md:w-[250px] group'>
                        <div className='flex items-center justify-center bg-amber-400 text-white p-3 rounded-full'><MdOutlineZoomOutMap className='group-hover:scale-150 duration-300' fontSize={30}/></div>
                        <p>Do Not Exit FullScreen</p>
                      </div>
                      <div className='flex flex-col items-center gap-4 py-3 bg-white rounded-md w-[250px]  xxs:w-[150px] md:w-[250px] group'>
                        <div className='flex items-center justify-center bg-purple-400 text-white p-3 rounded-full'><BsPersonX className='group-hover:scale-150 duration-300' fontSize={30}/></div>
                        <p>3 Warning Disqualify</p>
                      </div>
                    </div>
                  </div>
                </>
              }
              <button type='button' onClick={()=>startQuiz()} className='px-10 py-2 rounded-[30px] mt-16 font-semibold mb-5 text-2xl gradient bg-gradient-to-br from-violet-600 to-fuchsia-600 text-violet-50 hover:scale-95 duration-150'>Start Quiz</button>
            </div>
          }

          <QuizSection setShowScores={setShowScores} warningCount={warningCount} setWarningCount={setWarningCount}/>
          

          { quizStatus === "End" && showScores[0] === null && 
            <div className='absolute top-1/3 w-full mx-auto'>
              <button type='button' onClick={()=>{exitsFullScreen(); showScore()}} className='px-4 py-1 rounded-md mt-5 bg-opacity-90 hover:bg-opacity-100 transition-opacity duration-200 bg-white'>{submitLoading ? "Calculating Score..." : "See your Score"}</button>
            </div>
          }

          {
            showScores[0] !== null && <>
            <div className='w-[300px] h-full my-8 px-2 bg-white rounded-md text-black flex flex-col py-4 items-center text-2xl'>
              <img src={trophy1} alt='trophy' loading='lazy'/>
              <div className='mt-3 flex flex-col items-center gap-4'>
                <p className='font-extrabold text-blue-950'>Congrats!</p>
                <p className='font-bold text-green-500 text-[2rem]'>Score {(showScores[1])} Points</p>
                <p className='text-xl'>Quiz completed sucessfully.</p>
              </div>  
            </div>
            <button onClick={() => navigate(`/leaderBoard/quiz/${quizes?._id}/page/1`)} className='px-8 py-[6px] rounded-sm bg-purple-500 text-white text-lg font-semibold hover:bg-purple-600 duration-300'>Go To LeaderBoard</button>
            </>
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
