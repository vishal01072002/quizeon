import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { OneQues } from './OneQues';
import { useDispatch, useSelector } from 'react-redux';
import { setQues, setStep, setEditQuesMode } from '../../../slice/quizSlice';
import { addQuestion, editQuestion } from '../../../services/operations/quiz';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const QuizStep2 = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {editQuiz,editQues,editQuesMode} = useSelector((state) => state.quiz);

  const {
    register,
    setValue,
    handleSubmit,
    getValues,
    formState : {errors},
  } = useForm();


  function isChange(newData,oldData){
    if(newData.question !== oldData.question) return true;
    if(newData.correct !== oldData.correct) return true;
    if(newData.options.length !== oldData.options.length) return true;
    for(let i=0; i<newData.options.length; i++){
      if(newData.options[i] !== oldData.options[i]) return true;
    }
    return false;
  }
  function submitHandler(data){
    // console.log(data);
    // make data in formate for api
    let tempOption = [data.Option1];
    let optionNum = 1;
    let correctAns = data.Option1;
    if(data.Option2) {
      optionNum = 2; 
      tempOption.push(data.Option2);
      if(data.answer === 2){correctAns = data.Option2;}
      }; 
      if(data.Option3) {
        optionNum = 3; 
        tempOption.push(data.Option3);
        if(data.answer === 3){correctAns = data.Option3;}
      }; 
      if(data.Option4) {
        optionNum = 4; 
        tempOption.push(data.Option4);
        if(data.answer === 4){correctAns = data.Option4;}
      }; 
    
    
      if(!editQuesMode){

        // combine all data
        const newData = {
          question:data.question,
          options:tempOption,
          correct:correctAns,
          quizId:editQuiz._id,
        }

        // make api call
        dispatch(addQuestion(newData,navigate));
      }
      else{
        // combine all data
        const newData = {
          question:data.question,
          options:tempOption,
          correct:correctAns,
          quizId:editQuiz._id,
          questionId:editQues._id,
        }

        //console.log(newData,editQues);
        if(isChange(newData,editQues)){
          dispatch(editQuestion(newData));
        }
        else{
          toast.success("No Changes Happen");
        }
      }
  };

  
  return (
    <div>
      QuizStep2
      <div className='min-h-[85vh] mx-4 ml-14 lg:mx-0'>
      <form onSubmit={handleSubmit(submitHandler)} className='flex flex-col gap-5 p-2 sm:p-4 items-start w-full lg:max-w-[756px] mx-auto border'>
      <OneQues name={"question"} register={register} placeholder={"Question "} errors={errors} setValue={setValue}/>

      <div className='flex items-center justify-between w-full'>
        <button className='w-max text-yellow-50 text-lg rounded-sm font-medium bg-blue-600 px-8 py-1 mt-2 hover:bg-blue-700 duration-150'  type='submit'>Save</button>  

        <button type='button' className={`w-max text-yellow-50 text-lg rounded-sm font-medium bg-blue-600 px-8 py-1 mt-2 hover:bg-blue-700 duration-150`} onClick={()=> {
          dispatch(setStep(1)); 
          dispatch(setQues(null));
          dispatch(setEditQuesMode(false));
        }}>Back</button>
      </div>
      </form>
      
      </div>
    </div>
  )
}
