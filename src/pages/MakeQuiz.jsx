import React from 'react'
import { useForm } from 'react-hook-form'

export const MakeQuiz = () => {
  const Categories = [{
    _id : 1,
    name: "cpp"
  }];

  const {
    register,
    setValue,
    handleSubmit,
    getValues,
    formState : {errors},
  } = useForm();

  const submitHandler = (data)=>{
    console.log(data);
  }

  return (
    <div className='w-full h-full'>
    <div className='relative flex-col p-5 w-full gap-5 items-center flex min-h-full  bg-slate-300'>
    <p className='text-xl font-bold'>Make Quiz in very easy & efficient way</p>
        <form onSubmit={handleSubmit(submitHandler)} className='flex flex-col gap-5 p-4 items-start min-w-[756px]'>
            <label className="quiz-label">
              Quiz Name
            <input 
              id="quizName"
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
            Duration of Quiz (in Minutes)
            <input 
              id="duration"
              type="number"
              placeholder='duration in Minutes'
              {...register("duration",{require: true,
              valueAsNumber: true,
              validate:{always: (value)=> value >= 1 || "Duration is required"},
              max :{ value: 120, message: "maximum duration can be 2 Hour"},
              min :{ value: 15, message: "minimum duration can be 15 minutes"},
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/, message:"Enter only number"
              },})}
              className='quiz-input'
            />
            {errors.duration && (<span className="ml-2 text-base font-normal tracking-wide text-pink-800">*{errors.duration.message}</span>)}
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
              {...register("access",{required:true})}
              checked= "true"
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
          <label className="text-sm text-richblack-5" htmlFor="category">
            Category <sup className="text-pink-900">*</sup>
          </label>
          <select
            {...register("category", { required: true })}
            defaultValue=""
            id="category"
            className="quiz-input"
          >
            <option value="" disabled>
              Choose a Category
            </option>
            {Categories?.map((category, indx) => (
              <option key={indx} value={category?._id}>
                {category?.name}
              </option>
            ))}
          </select>
          {errors.category && (
            <span className="ml-2 text-base font-normal tracking-wide text-pink-800">*Category is required
            </span>
          )}
          </div>

          <button type='submit' className='w-max text-yellow-50 text-lg rounded-sm font-medium bg-blue-600 px-8 py-1 mt-2 hover:bg-blue-700 duration-150'>Next</button>
        </form>
    </div>
    </div>
  )
}
