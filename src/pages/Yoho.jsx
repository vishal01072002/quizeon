import React, { useMemo, useState } from 'react'
import './yoho.css'; // Import the CSS file
//import BG1 from "../assets/quizBG.jpg"
//import BG2 from "../assets/QuizBG2.jpg"
//import BG3 from "../assets/QuizBG3.jpg"
import { toast } from 'react-toastify';

export const Yoho = () => {
    const questions = [
        {
          question:"Choose my favourate Anime",
          options:["One Piece", "Naruto", "Bleach", "Death Note"],
          correct:"One Piece",
        },
        {
          question:"Choose my favourate Fast Food",
          options:["Noodles", "Burger", "Pizza", "Momos"],
          correct:"Burger",
        },
        {
          question:"Choose which one I love",
          options:["You", "sketching", "Code", "Flowers"],
          correct:"Flowers",
        },
      /*  {
          question:"Choose my favourate Chocolate",
          options:["KitKat", "Dark Fantisy", "Cadbury", "any Chocolate"],
          correct:"Cadbury",
        },
        {
          question:"Choose which thing I dislike in Person",
          options:["Talkative", "Cross my Boundries", "Arrogance", "Not Talkative"],
          correct:"Cross my Boundries",
        },
        {
          question:"Choose which one I like",
          options:["You", "Sketching", "Code", "Flowers"],
          correct:"Sketching",
        },
        {
          question:"What I do when I am in my low energy(feeling low) phase on day",
          options:["Walk", "Insta Reel", "Sleep", "Look Sky"],
          correct:"Look Sky",
        },
        {
          question:"How did i resolve my day problem(small)",
          options:["By Solving", "By Ignore", "Sleep", "Ask For Help"],
          correct:"Sleep",
        }, */
    ]

    //const [yourname, setYourName] = useState("");
    const [showScores, setShowScores] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState([null,0,false,true]);
    // [selcted option, score, quiz start, fade animation]

    const isCorrect = (option) =>{
      if(option === questions[currentQuestion].correct){
        return "bg-green-500";
      }
      else{
        return "bg-red-500";
      }
    }

    const startQuiz = () => {
      setSelectedOption([null,0,true,true])
    }


    const showScore = () => {
      const finalScore = selectedOption[1];
      setShowScores(finalScore)
    }

    const optionSelected = async(option) =>{
      let score = selectedOption[1];
      if(option === questions[currentQuestion].correct && currentQuestion < questions.length && score < questions.length){
        score = score+1;
      }
      const newData = [option,score,true,false];
      setSelectedOption(newData);
      
      setTimeout(()=>{
        if(currentQuestion < questions.length-1){
          setCurrentQuestion(currentQuestion => currentQuestion+1);
          const newData = [null,score,true,true];
          setSelectedOption(newData);
        }
        else{
          toast.success(`Your Score ${score}`)
        }

        // if last question end quiz
        console.log(currentQuestion, questions.length-1);
        if(currentQuestion == questions.length-1){
          const newData = [null,score,false,true];
          setSelectedOption(newData);
        }
        
      },1000);
    }

    // 'rgba(76, 175, 80, 0.7)' // Green for correct answer
    // 'rgba(244, 67, 54, 0.7)' // Red for wrong answer
    // 'rgba(33, 150, 243, 0.7)', // Blue for default state
  
  return (
    <div className='relative flex items-center flex-col h-screen overflow-x-hidden w-full bg-gradient-to-tr from-blue-600 via-purple-600 to-pink-500 to-60%'>
        <h1 className="text-3xl text-white mt-16 font-bold mb-0">Quiz about Me</h1>

        {!selectedOption[2] && currentQuestion < questions.length-1 && <div>
          <button type='button' onClick={()=>startQuiz()} className='px-4 py-1 rounded-md mt-5 bg-opacity-90 hover:bg-opacity-100 transition-opacity duration-200 bg-white'>Start</button>
        </div>}

        <div className='flex w-full justify-center'>
          {selectedOption[2] && <div className={`quiz-container ${selectedOption[3]? "fadeIn-card" : "fadeOut-card"} m-2 p-4 md:p-8 w-full md:w-1/2 lg:w-1/3 mt-10 mx-auto bg-gray-100 rounded shadow`}>
              <div className={`w-full`}>
                <p className={`mb-10 text-indigo-800 text-xl md:text-2xl font-semibold`}>{currentQuestion+1}. {questions[currentQuestion].question}</p>
                <div className='flex flex-col w-full'>
                  {questions[currentQuestion].options.map((option) => (
                    <p
                      key={option}
                      onClick={()=>optionSelected(option)}
                      className={`p-2 mb-2 cursor-pointer rounded ${
                        selectedOption[0] === option ? isCorrect(option) : 'bg-blue-500 hover:bg-blue-600'
                      } text-white transition-colors duration-100`}
                      >{option}
                    </p>
                  ))}
                </div>
              </div>
            </div>}
        </div>

        { currentQuestion >= questions.length-1 && !selectedOption[2] &&
          <div>
          <button type='button' onClick={()=>showScore()} className='px-4 py-1 rounded-md mt-5 bg-opacity-90 hover:bg-opacity-100 transition-opacity duration-200 bg-white'>See your Score</button>
          </div>
        }

        {
          showScores !== null && <div className='mt-8 text-white text-2xl'>
            {showScores}
          </div>
        }
    </div>
  )
}
