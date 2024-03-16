import React, { memo, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FaRegCircleCheck, FaRegCircleXmark} from "react-icons/fa6"
import { QuizTimer } from './QuizTimer';
import { setPerks, setQuizStatus } from '../../../../../slice/quizPlatformSlice';
import { Twice } from './perks/Twice';
import { FiftyFifty } from './perks/FiftyFifty';
import { submitQuiz } from '../../../../../services/operations/quiz';

export const QuizSection = memo(({setShowScores }) => {

  const {quizes, quizStatus, perks} = useSelector((state) => state.quizPlatform);
  const {user} = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const [questions, _] = useState(quizes.questions) 
  const [score, setScore] = useState(0);
  const [correctOrNot,setCorrectOrNot] = useState([0,0]);
  const [remainTime,setRemainTime] = useState([0,0]);
  const [fadeTransition, setFadeTransition] = useState("fadeIn-card")
  const [selectedOption, setSelectedOption ] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  
  // continue correct answers 
  const [streek, setStreek] = useState(0);
  // [options, is this used or not]
  const [fiftyOption, setFiftyOption] = useState([null,true]);

  // perks while playing quiz 5 ques
  // 1. 50 50 (ones) (score 80%)
  // 2. twice point for next (ones) (streek 3)
  
  // perks while playing quiz 10 ques
  // 1. 50 50 (ones) (score 70%)
  // 2. twice point for next (two times) (streek 4)
  
  // perks while playing quiz 15 to 25 ques
  // 1. 50 50 (twice) (score 50% - 75%)
  // 2. twice point for next (three times) (streek 5)

  // perks while playing quiz 25 - 40 ques
  // 1. 50 50 (twice) (score 50% - 75%)
  // 2. twice point for next (four times) (streek 6)
  
  // perks while playing quiz 40 - 70 ques
  // 1. 50 50 (Thrice) (score 40% - 60% - 80%)
  // 2. twice point for next (five times) (streek 7)

  const isCorrect = (option) =>{
    if(option === questions[currentQuestion].correct){
        return "bg-green-500";
    }
    else{
        return "bg-red-500";
    }
  }
  
  const optionSelected = (option) =>{
    setSelectedOption(option);
    if(option === questions[currentQuestion].correct){
      if(perks[1] === true){
        // 2X activated
        setScore((state) => state + 200);
        let tempPerks = [false,false];
        tempPerks[1] = false;
        tempPerks[0] = perks[0];
        dispatch(setPerks(tempPerks));
      }
      else{
        setScore((state) => state + 100);
      }
      setStreek((state) => state + 1);
      let temp = correctOrNot;
      temp[0] = temp[0] + 1;
      setCorrectOrNot(temp);
    }
    else{
      let temp = correctOrNot;
      temp[1] = temp[1] + 1;
      setCorrectOrNot((state) => temp);
      setStreek(0);
    }

    // already 50-50 active then choose option 
    if(perks[0] === true && fiftyOption[0] !== null && fiftyOption[1] === false){
      let tempPerks = [false,false];
      tempPerks[0] = false;
      tempPerks[1] = perks[1];
      dispatch(setPerks(tempPerks));
    }
  }

  const handleFiftyPerks = () =>{
    if(perks[0] === true && fiftyOption[0] === null && fiftyOption[1] === true){
      // 50-50 activated
      console.log("called 2");
      const currOptions = questions[currentQuestion].options;
      const correctOption = questions[currentQuestion].correct;
      const newOptions = currOptions.filter((oneOption) => oneOption !== correctOption);
      let filteredOption = [];
      filteredOption.push(correctOption);
      if(newOptions.length > 0){
        filteredOption.push(newOptions[0]);
      }
      setFiftyOption([filteredOption,false]); 
    }
    if(perks[0] == false){
      setFiftyOption([null,true]);
    }
  }
  const nextQuestion = () => {
    setFadeTransition("fadeOut-card");
    setTimeout(() => {
      // handle 50-50
      handleFiftyPerks();

      if(currentQuestion === questions.length-1){
        // last question
        
        handleSubmitQuiz();
      }
      else if(currentQuestion < questions.length-1){
        // not last question
        setCurrentQuestion((state) => state + 1);
      }
      setSelectedOption("");
      setFadeTransition("fadeIn-card");
    }, 1000);
  }

  const handleSubmitQuiz = async() => {
    dispatch(setQuizStatus("End"));
    setShowScores([null,score]);
    console.log(remainTime);
    const completedTimeSec = (remainTime[1] !== 0) ? 60 - remainTime[1] : 0;
    const completedTimeMin = (remainTime[1] === 0) ? quizes.duration - remainTime[0] : quizes.duration - remainTime[0] - 1;
    const data = {
      quizId : quizes._id,
      studentId : user._id, 
      studentName : user?.firstName + " " + user?.lastName,
      completedTime : [completedTimeMin,completedTimeSec], 
      score : score, 
      gender: user?.additionalDetail?.gender,
      correct : correctOrNot[0], 
      wrong : correctOrNot[1],
      unAttempted : (quizes.questions.length - correctOrNot[0] - correctOrNot[1]),
      totalQuestion : quizes.questions.length,
      totalTime : [quizes.duration,0],
    }
    console.log(data);
    await submitQuiz(data,dispatch);
  }

  useEffect(() => {
    if(selectedOption === ""){
      handleFiftyPerks();
    }
  },[perks])

  return (
    <div className='flex w-full justify-center text-lg'>
      {
        quizStatus === "Start" && 
        <div className='flex w-full items-center px-5'>
          <div>
            <Twice streek={streek} setStreek={setStreek} perks={perks}/>
          </div>
          <div className={`${fadeTransition} relative m-2 p-4 md:px-5 md: py-2  w-11/12 sm:w-10/12 md:w-1/2 lg:w-1/3 mt-10 mx-auto bg-gray-100 rounded-sm shadow`}>
            {/* upper header */}
            <div className='flex items-center mb-2 justify-between'> 
              <p className='font-semibold'>{quizes.quizName}</p>
              <p>Points {score}</p>
              <QuizTimer duration={quizes.duration} setRemainTime={setRemainTime} isLastQuesSelected={currentQuestion === questions.length-1 && selectedOption !== ""} handleSubmitQuiz={handleSubmitQuiz}/>
            </div>

            <div className='absolute h-[2px] left-0 bg-black bg-opacity-50 w-full'></div>
            
            {/* middle section for question and options */}
            <div className='mb-4'>
              <p className='text-xl text-start my-3 w-full font-medium'>{currentQuestion+1}. {questions[currentQuestion].question}</p>
              <div className='flex flex-col w-full mt-4'>
                {(fiftyOption[0] !== null ? fiftyOption[0] : questions[currentQuestion].options).map((option) => (
                  <button type='button'
                    key={option}
                    disabled={selectedOption !== ""}
                    onClick={()=>optionSelected(option)}
                    className={`px-4 py-[6px] mb-2 relative cursor-pointer rounded 
                    ${selectedOption === option ? isCorrect(option) : 'bg-blue-500 hover:bg-blue-600'} text-white text-start transition-colors duration-100`}>
                      <p>{option}</p>
                      {
                        selectedOption === option && <span className='absolute right-2 top-2'>
                          {isCorrect(option) === "bg-green-500" ? <FaRegCircleCheck fontSize={24}/> : <FaRegCircleXmark fontSize={24}/>}
                        </span>
                      }
                  </button>))
                }
              </div>
            </div>

            {/* fotter of quiz */}
            <div className='absolute h-[2px] left-0 bg-black bg-opacity-50 w-full'></div>
            <div className='flex items-center justify-between mt-6'>
              <p>{currentQuestion+1} of {quizes.questions.length} Question</p>
              {
                selectedOption !== "" && <button type='button' 
                  onClick={nextQuestion}
                  className='py-[2px] px-3 rounded-sm bg-blue-500 text-white hover:bg-blue-600'>
                  {currentQuestion < questions.length-1 ? "Next" : "Finish"}
                </button>
              }
            </div>
          </div>
          <div><FiftyFifty score={score} perks={perks}/></div>
        </div>
      }
    </div>
  )
});
