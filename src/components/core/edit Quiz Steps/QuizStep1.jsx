import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { makeQuiz, publishQuiz, updateQuiz } from '../../../services/operations/quiz';
import { useNavigate } from 'react-router-dom';
import { FaChevronDown,FaChevronUp } from "react-icons/fa";
import { toast } from 'react-toastify';
import { setStep } from '../../../slice/quizSlice';
import { ShowQues } from './ShowQues';

export const QuizStep1 = () => {
  const Categories = [
  {
    _id : 1,
    name: "Cpp"
  },
  {
    _id : 2,
    name: "Java"
  },
  {
    _id : 3,
    name: "C"
  },
  {
    _id : 4,
    name: "General"
  },
  ];

  const {
    register,
    setValue,
    handleSubmit,
    getValues,
    formState : {errors},
  } = useForm();

  const {token} = useSelector((state) => state.auth);
  const {user} = useSelector((state) => state.profile);
  const {step, editMode, viewMode, editQuiz} = useSelector((state) => state.quiz);
  const dispatch = useDispatch();
  const [showQues, setShowQues] = useState(false);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const isChange = (newData,oldData) =>{
    console.log(newData,oldData);
    if(newData.quizName !== oldData.quizName) return true;
    if(newData.category !== oldData.category) return true;
    if(newData.duration !== oldData.duration) return true;
    if(newData.access !== oldData.access) return true
    return false;
  }

  const submitHandler = (data)=>{
    if(!editMode){
      //first time quiz is created 
      console.log(data);
      const newData = {...data,email:user.email};
      console.log(newData);
      dispatch(makeQuiz(newData,token));
    }
    else{
      // this is for update quiz
      if(isChange(data,editQuiz)){
        // api call for update
        const newData = {...data,quizId:editQuiz._id,status:editQuiz.status};
        console.log(newData);
        dispatch(updateQuiz(newData,token));
      }
      else{
        toast.error("No Changes happen");
      }
    }
  }

  const scrolls = () =>{
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  }

  const publishingQuiz = () => {
    dispatch(publishQuiz({quizId:editQuiz._id},token))
  }

  useEffect(()=>{
    // if edit mode fill the form
    //console.log(editQuiz);
    console.log(viewMode,editMode);
    if((viewMode || editMode) && editQuiz){
      setValue("quizName", editQuiz.quizName);
      setValue("category", editQuiz.category);
      setValue("duration", editQuiz.duration);
      setValue("access", editQuiz.access);
    }
  });
  return (
    <div className='w-full h-full'>
      <div className='relative flex-col p-5 pr-0 lg:pr-5 w-full gap-5 items-center flex min-h-full  bg-slate-300'>
      <p className='text-xl pl-8 lg:p-0 font-bold'>Make Quiz in very easy & efficient way</p>
        <form onSubmit={handleSubmit(submitHandler)} className='flex flex-col gap-5 p-4 pl-8 lg:pl-4 items-start w-full lg:max-w-[756px]'>
          <label className="quiz-label">
              Quiz Name
            <input 
              id="quizName"
              disabled={viewMode}
              type="text"
              placeholder='Enter Quiz Name'
              {...register("quizName",{require:true, minLength:1,
                validate:{always: (value)=> value !== "" || "QuizName is required"},
              })}
              className='quiz-input'
            />
            {errors.quizName && (<span className="ml-2 text-base font-normal tracking-wide text-pink-800">*Quiz Name required</span>)}
          </label>

          <label className='quiz-label'>
            <p className='text-start'>Duration of Quiz (in Minutes)</p>
            <input 
              id="duration"
              disabled={viewMode}
              type="number"
              placeholder='duration in Minutes'
              {...register("duration",{require: true,
              valueAsNumber: true,
              validate:{always: (value)=> value >= 1 || "Duration is required"},
              max :{ value: 120, message: "maximum duration can be 2 Hour"},
              min :{ value: 5, message: "minimum duration can be 5 minutes"},
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/, message:"Enter only number"
              },})}
              className='quiz-input'
            />
            {errors.duration && (<span className="ml-2 text-base font-normal tracking-wide text-pink-800">*{errors.duration.message}</span>)}
          </label>
          
          <div className='quiz-label'>
            <p className='text-start'>
              Choosse the mode of quiz <span className='font-normal text-gray-700'> (private only access by link)</span>
            </p>
            <label className='font-normal'>
            <input 
              id="public"
              disabled={viewMode}
              name="accessMode"
              type="radio"
              value={"Public"}
              {...register("access",{required:true})}
            />
            Public
            </label>

            <label className='font-normal'>
            <input 
              id="private"
              name="accessMode"
              type="radio"
              value={"Private"}
              {...register("access",{required:true})}
            />
            Private
            </label>
            {errors.access && (
            <span className="ml-2 text-base font-normal tracking-wide text-pink-800">*Quiz access mode is required
            </span>
          )}
          </div>

          <div className="quiz-label">
          <label className="text-lg text-richblack-5" htmlFor="category">
            Category <sup className="text-pink-900">*</sup>
          </label>
          <select
            {...register("category", { required: true })}
            defaultValue=""
            id="category"
            className="quiz-input"
            disabled={viewMode}
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
          {errors.category && (
            <span className="ml-2 text-base font-normal tracking-wide text-pink-800">*Category is required
            </span>
          )}
          </div>

          {((viewMode || editMode) && editQuiz) && <label className="quiz-label">
              <p>Quiz Link</p>
              <div className='flex w-full gap-4'>
                <p className='text-blue-500 xs:hidden cursor-pointer underline hover:text-blue-600'>{(`http://localhost:3000/attemptquiz/quiz/${editQuiz?._id}`).slice(0,27)}...</p>
                <p className='text-blue-500 hidden xs:block cursor-pointer underline hover:text-blue-600'>{(`http://localhost:3000/attemptquiz/quiz/${editQuiz?._id}`).slice(0,40)}...</p>
                <span className='float-left relative cursor-pointer' onClick={() =>{  navigator.clipboard.writeText(`http://localhost:3000/attemptquiz/quiz/${editQuiz?._id}`);
                setCopied(true);
                setTimeout(()=> setCopied(false) , 3000)}}>Copy <p className={`absolute ${copied ? "opacity-100" : "opacity-0"} duration-300 transition-opacity text-white -top-9 -left-2 px-1 py-[1px] rounded-md bg-blue-400`}>Copied</p></span>
              </div>
          </label>}

          <div className='flex flex-wrap w-full items-center justify-between'>
            {!viewMode && <button type='submit' className='w-max text-yellow-50 text-lg rounded-sm font-medium bg-blue-600 px-8 py-1 mt-2 hover:bg-blue-700 duration-150'>{editMode && editQuiz.status === "Draft"? "Save Changes" : "Next"}</button>}

            {editMode && editQuiz.status === "Draft" && <button type='button' onClick={()=>dispatch(setStep(2))} className={`w-max text-yellow-50 text-lg rounded-sm font-medium bg-blue-600 px-8 py-1 mt-2 hover:bg-blue-700 duration-150 ${!editMode && "hidden"}`}>Add question</button>}
            
            {!viewMode && <button type='button' disabled={editMode && editQuiz.status === "Publish"} onClick={()=> publishingQuiz()} className={`w-max text-yellow-50 text-lg rounded-sm font-medium bg-blue-600 px-8 py-1 mt-2 hover:bg-blue-700 duration-150 ${!editMode && "hidden"}`}>{editMode && editQuiz.status === "Publish" ? "Already Published" : "Publish"}</button>}

            <button type='button' onClick={()=>{setShowQues(!showQues); scrolls();}} className={`w-max text-yellow-50 text-lg rounded-sm font-medium bg-blue-600 px-8 py-1 mt-2 hover:bg-blue-700 duration-150 ${!editMode && !viewMode && "hidden"}`}>{showQues ? <span className='flex items-center gap-2'><FaChevronUp/>Hide All Question</span> : <span className='flex items-center gap-2'><FaChevronDown/>Show All Question</span>}</button>
          </div>
        </form>
        
        {
          showQues && <ShowQues/>
        }
      </div>
    </div>
  )
}
