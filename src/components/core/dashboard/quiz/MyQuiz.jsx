import React from 'react'
import { useSelector } from 'react-redux'
import { InstructorQuiz } from './InstructorQuiz';
import { StudentQuiz } from './StudentQuiz';

export const MyQuiz = () => {
  
  const {user} = useSelector((state) => state.profile);
  return (
    <>
        {
            user.account === "Instructor" ? 
            <InstructorQuiz/> : 
            <StudentQuiz/>
        }
    </>
  )
}
