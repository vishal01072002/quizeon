import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaChevronDown,FaChevronUp } from "react-icons/fa";
import { toast } from 'react-toastify';
import { ShowQues } from '../../edit Quiz Steps/ShowQues';

export const QuizAnalysis = () => {
  const Categories = [
  {
    _id : 1,
    name: "cpp"
  },
  {
    _id : 2,
    name: "java"
  },
  {
    _id : 3,
    name: "c"
  },
];


  const {token} = useSelector((state) => state.auth);
  const {user} = useSelector((state) => state.profile);
  const {step, editMode, editQuiz} = useSelector((state) => state.quiz);
  const dispatch = useDispatch();
  const [showQues, setShowQues] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{

  });
  return (
    <div className='w-full h-full'>
      <div className='relative flex-col p-5 w-full gap-5 items-center flex min-h-full  bg-slate-300'>
      <p className='text-xl font-bold'>Make Quiz in very easy & efficient way</p>
        <form className='flex flex-col gap-5 p-4 items-start min-w-[756px]'>
            <label className="quiz-label">
              Quiz Name
            <input 
              id="quizName"
              type="text"
              className='quiz-input'
            />
            
            </label>

          <label className='quiz-label'>
            Duration of Quiz (in Minutes)
            <input 
              id="duration"
              type="number"
              
              className='quiz-input'
            />
            
          </label>
          
          <div className='quiz-label'>
            <p>
              Choosse the mode of quiz <span className='font-normal text-gray-700'> (private only access by link)</span>
            </p>
            <label className='font-normal'>
            <input 
              id="public"
              name="accessMode"
              type="radio"
              value={"Public"}
            />
            Public
            </label>

            <label className='font-normal'>
            <input 
              id="private"
              name="accessMode"
              type="radio"
              value={"Private"}
            />
            Private
            </label>
            
          </div>

          <div className="quiz-label">
          <label className="text-sm text-richblack-5" htmlFor="category">
            Category <sup className="text-pink-900">*</sup>
          </label>
          <select
            className="quiz-input"
          >
            <option value="" disabled>
              Choose a Category
            </option>
            {Categories?.map((category, indx) => (
              <option key={indx} value={category?.name}>
                {category?.name}
              </option>
            ))}
          </select>
          
          </div> 
            <button type='button' onClick={()=>{setShowQues(!showQues); scrolls();}} className={`w-max text-yellow-50 text-lg rounded-sm font-medium bg-blue-600 px-8 py-1 mt-2 hover:bg-blue-700 duration-150 ${!editMode && "hidden"}`}>{showQues ? <span className='flex items-center gap-2'><FaChevronUp/>Hide All Question</span> : <span className='flex items-center gap-2'><FaChevronDown/>Show All Question</span>}</button>
        </form>
        
        {
          showQues && <ShowQues/>
        }
      </div>
    </div>
  )
}
