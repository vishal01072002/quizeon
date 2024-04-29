import React, { memo, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "./Twice.css"
import { setPerks } from '../../../../../../slice/quizPlatformSlice'

export const Twice = memo(({streek, setStreek}) => {

  // (ones) (streek 3) (5 ques)
  // (two times) (streek 4) (10 ques)
  // (three times) (streek 5) (15 to 25 ques)
  // (four times) (streek 6) (25 to 40 ques)  
  // (five times) (streek 7) (quiz 40 to 70 ques)

  const {quizes,perks} = useSelector((state) => state.quizPlatform);
  const dispatch = useDispatch();
  
  const perksCountCalculate = useMemo(()=>{
      if(quizes.questions.length <= 5) return 1 ; 
      if(quizes.questions.length < 15) return 2 ;
      if(quizes.questions.length <= 25 ) return 3 ;
      if(quizes.questions.length <= 40 ) return 4 ;
      return 5;
  },[quizes]);

  const neededStreek = useMemo(()=>{
      if(quizes.questions.length <= 5) return 3 ;
      if(quizes.questions.length < 15) return 4 ;
      if(quizes.questions.length <= 25 ) return 5 ;
      if(quizes.questions.length <= 40 ) return 6 ;
      return 7;
  },[quizes]);

  // when this perk is used reduce it by 1 
  // left how many times 2X can be used
  const [perksCount, setPerksCount] = useState(perksCountCalculate);
  // how many 2X PowerUp user have
  const [totalActive, setTotalActive] = useState(0);
  const percent = (((streek/neededStreek)*100).toFixed(1));
  let arr = [];
  for(let i=0; i < totalActive; i++){
    arr.push(true);
  }
  const childs = {
    width : percent + "%",
  }
  
  const handlePerksCount = () => {
    if(perksCount && streek === neededStreek){
      setStreek(0);
      setTotalActive((state) => state + 1);
      setPerksCount((state) => state - 1);
    }
  }

  const handleActivatePerk = () => {
    let tempPerks = [false,false];
    if(perks[1] === true){
      // already activated
      return;
    }
    else{
      tempPerks[1] = true;
      tempPerks[0] = perks[0];
      dispatch(setPerks(tempPerks));
      setTotalActive((state) => state-1);
    }
  }

  useEffect(() => {
    handlePerksCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[streek])
  return (
    <div className='text-start w-[300px]'>
      {/* <p className='flex items-center gap-2'><FaChevronRight/> It can be activated {perksCountCalculate} times</p>
      <p className='flex items-center gap-2'><FaChevronRight/>Need to maintain the Streek of {neededStreek}</p>
      <p className='flex items-center gap-2'><FaChevronRight className='opacity-0'/>correct answers to Activate</p> */}
      {perksCount ? <>
        <p className='text-3xl text-center font-extrabold gradient bg-gradient-to-r from-red-600 to-orange-600 drop-shadow-[2px_0px_1.5px_rgba(0,0,0,1)] bg-clip-text text-transparent'>2X Power Up</p>
        <div className='parents w-[300px] mx-auto mt-3 h-6 rounded-xl bg-white'>
          <div style={childs} className={`progress2 h-full rounded-xl transition-all duration-[1500ms]`}></div>
        </div>
      </> : 
      <div className='text-center text-lg font-bold'>No 2X Power Up Left!</div>}
      {
        totalActive > 0 && arr.map((_,indx) => (
          <div key={indx} className='box w-max mt-3 mx-auto'>
            <button className='btn' onClick={handleActivatePerk}>Acivate 2X</button>
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
        ))
      }
    </div>
  )
})
