import React, { useEffect, useState } from 'react'
import { QuizOption } from './QuizOption';
import { useSelector } from 'react-redux';


export const OneQues = ({name, register, placeholder, errors, setValue}) => {

  const {editQues} = useSelector((state) => state.quiz);
  let tempArr = [];
  let check = 1;
  if(editQues){
    for(let i=1; (i<= editQues.options.length); i++){
      tempArr.push(i);
      if(editQues.options[i-1] === editQues.correct){
        check = i;
      }
    }
  }

  const[checks, setChecks] = useState(check);
  const checkHandler = (value)=>{
    setChecks(value);
    setValue("answer",value);
  }
  const[optionsNum, setOptions] = useState(tempArr.length === 0 ? [1] : tempArr);
  function addOption(){
    if(optionsNum.length < 4){
        let temp = [...optionsNum];
        temp.push(optionsNum.length+1);
        setOptions(temp);
    }
}

function removeOption(){
    if(optionsNum.length > 1){
        let temp = [...optionsNum];
        setValue(`Option` + temp.length, "");
        setValue("answer", 1);
        temp.pop();
        setOptions(temp);
    }
  }

  useEffect( ()=> {
    if(editQues){
        // console.log(editQues);
        console.log(check);
        setValue("question", editQues.question);
        editQues.options.forEach((element,indx) => {
          setValue("answer", check);
          setValue(`Option${indx+1}`,element);
        });
    }
  },[editQues])
  return (
    <>
        <label className="quiz-label">
              Question
            <input 
              id={name}
              type="text"
              placeholder = {placeholder}
              {...register(name,{require:true, minLength:1,
                validate:{always: (value)=> value !== "" || `${name} is require`},
              })}
              className='quiz-option'
            />
            {errors[name] && (<span className="ml-2 absolute bottom-5 left-1/4 text-base font-normal tracking-wide text-pink-800">*Question is required</span>)}
        </label>
        
        <>
            <div className='px-4 flex gap-5 text-lg font-medium'>
              <p className=''>Options</p> 
              <button type="button" onClick={addOption} className='text-3xl font-medium bg-sky-300 rounded-full w-7 h-7 flex items-center justify-center'>+</button>
              <button type="button" onClick={removeOption} className='text-3xl font-medium bg-sky-300 rounded-full w-7 h-7 flex items-center justify-center'> <span className="-mt-7">_</span> </button>
            </div>
            {
                optionsNum.map((num)=>(<QuizOption key={num} placeholder={`Option ${num}`} name={`Option${num}`} register={register} errors={errors} num={num} lenght={optionsNum.length}/>))
            }
            <div className='px-4'>
              <p>Choose correct option</p>
              <label className='flex relative text-lg font-medium items-center bg-white w-full gap-4 p-4 rounded-md'>
              {
                optionsNum.map((num)=>(<div key={num} className={`flex gap-1`}>
                  <input 
                  id="public"
                  name="answer"
                  className={``}
                  type="radio"
                  value={num}
                  checked = {num === checks}
                  onChange={()=>checkHandler(num)}
                  ></input>
                  {num}
                </div>
                ))
              }
              {errors.answer && (<span className="ml-2 absolute bottom-5 left-3/4 text-base font-normal tracking-wide w-full text-pink-800">*Option is required</span>)}
              </label>
            </div>
        </>
    </>
  )
}
