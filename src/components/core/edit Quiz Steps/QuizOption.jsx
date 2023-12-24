import React from 'react'

export const QuizOption = ({placeholder,register,errors,name,num,length}) => {
  return (
    <>
        <label className="quiz-label-option">
            <input 
              id={name}
              type="text"
              placeholder = {placeholder}
              {...register(name,{require:true, minLength:1,
                validate:{always: (value)=> value !== "" || "Option is required"},
              })}
              className={`quiz-option`} 
            />
            {errors[name] && (<span className="ml-2 absolute bottom-3 left-1/4 text-base font-normal tracking-wide text-pink-800">*Option is required</span>)}
        </label>
    </>
  )
}
