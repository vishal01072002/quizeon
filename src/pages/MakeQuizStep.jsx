import React from 'react'
import {QuizStep1} from "../components/core/edit Quiz Steps/QuizStep1"
import {QuizStep2} from "../components/core/edit Quiz Steps/QuizStep2"
import { useSelector } from 'react-redux'
import { Loader } from '../components/common/Loader'

export const MakeQuizStep = () => {

    const steps = [
        {
          id: 1,
          title: "Course Information",
        },
        {
          id: 2,
          title: "Course Builder",
        },
        {
          id: 3,
          title: "Publish",
        },
      ]
  const {step,editQuizLoading} = useSelector((state)=> state.quiz);

  return (
    <div>
        {editQuizLoading && <Loader/>}
        {!editQuizLoading && step === 1 && <QuizStep1 />}
        {!editQuizLoading && step === 2 && <QuizStep2 />}
    </div>
  )
}
