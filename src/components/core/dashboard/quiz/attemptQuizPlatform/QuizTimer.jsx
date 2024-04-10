import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

export const QuizTimer = ({duration,setRemainTime,isLastQuesSelected,handleSubmitQuiz}) => {
  const {quizStatus} = useSelector((state) => state.quizPlatform)
  const [sec, setSec] = useState(59);
  const [min, setMin] = useState(duration-1);

  const run = () => {
    if(min === 0 && sec === 0){
        return;
    }

    setSec((states) => states-1);

    if(sec === 0){
      setSec(59);
      setMin((state) => state-1);
    }

  }

  useEffect(() => {
    if((min !== 0 || sec !== 0) && quizStatus === "Start" && !isLastQuesSelected){
      const interval = setInterval(()=>{ 
        run();    
      },1000);
  
      return () => clearInterval(interval);
    }
    if(min === 0 && sec === 0){
      handleSubmitQuiz();
    }
  },[sec]);

  useEffect(() => {
    if(isLastQuesSelected){
      setRemainTime([min,sec])
    }
  },[isLastQuesSelected]);
  return (
    <div className='flex flex-col xs:flex-row items-center gap-0 xs:gap-2 bg-slate-300 py-2 xs:py-[4px] px-1 xs:pl-2 rounded-sm'>
      <p>Time Left</p>
      <div className='bg-black bg-opacity-80 text-white pb-2 xs:pb-0 px-[6px] rounded-sm h-7'>{min < 10 ? "0" + min : min} : {sec <10 ? "0" + sec : sec}</div>
    </div>
  )
}
