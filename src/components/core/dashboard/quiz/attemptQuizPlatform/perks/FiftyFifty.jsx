import React, { memo, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import "./Fiftyfifty.css"
import { setPerks } from '../../../../../../slice/quizPlatformSlice';

export const FiftyFifty = memo(({score}) => {
  // (ones) (score 80) (5 ques)
  // (ones) (score 70) (10 ques)
  // (two times) (score 50 - 75) (15 to 25 ques)
  // (two times) (score 50 - 75) (25 to 40 ques)  
  // (three times) (score 40 - 60 - 80) (quiz 40 to 70 ques)

  const {quizes,perks} = useSelector((state) => state.quizPlatform);
  const dispatch = useDispatch();
  
  const perksCountCalculate = useMemo(()=>{
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

  // left how many times 50-50 can be used
  const [perksCount, setPerksCount] = useState(perksCountCalculate);
  // how many 50-50 PowerUp user have
  const [totalActive, setTotalActive] = useState(0);
  let arr = [];
  for(let i=0; i < totalActive; i++){
    arr.push(true);
  }

  const percent = (((score/((quizes.questions.length)*100))*100).toFixed(1));
  const childs = {
    width : percent + "%",
  }

  // 3 times | 3-3 | 3-2 | 3-1
  const handleScoreCount = () => {
    if(perksCount > 0){
      if(percent > neededScore[perksCountCalculate - perksCount]){
        setTotalActive((state) => state + 1);
        setPerksCount((state) => state - 1);
      }
    }
  }

  const handleActivatePerk = () => {
    let tempPerks = [false,false];
    if(perks[0] === true){
      // already activated
      return;
    }
    else{
      tempPerks[0] = true;
      tempPerks[1] = perks[1];
      dispatch(setPerks(tempPerks));
      setTotalActive((state) => state-1);
    }
  }

  useEffect(() => {
    handleScoreCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[score]);
  return (
    <div className='text-white'>
      {/* <p className='flex items-center gap-2'><FaChevronRight/> It can be activated {perksCountCalculate} times</p>
      <p className='flex items-center gap-2'><FaChevronRight/>Need to maintain the Score of {neededScore[perksCountCalculate - perksCount]}%</p>
      <p className='flex items-center gap-2'><FaChevronRight className='opacity-0'/>correct answers to Activate</p> */}
      {perksCount ? <>
        <p className='text-3xl text-center font-extrabold gradient bg-gradient-to-r from-fuchsia-600 to-purple-600 drop-shadow-[2px_0px_1.5px_rgba(0,0,0,1)] bg-clip-text text-transparent'>50-50 Power Up</p>
        <div className='parents relative w-[300px] mx-auto mt-3 h-6 rounded-xl bg-white'>
        {
          neededScore.map((need,index) => (<div key={index} style={{left : need + "%"}} className='h-full absolute w-1 bg-gray-500 rounded-lg z-[1]'>
          </div>))
        }
        <div style={childs} className={`progress absolute z-[2] h-full rounded-xl transition-all duration-[1500ms]`}></div>
      </div> 
      </>: 
      <div className='text-center text-lg font-bold text-white'>No 50-50 Power Up Left!</div>}
      {
        totalActive > 0 && arr.map((_,indx) => (
          <div key={indx} className='box w-max mt-3 mx-auto'>
            <button className='btn' onClick={handleActivatePerk}>Acivate 50-50</button>
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
