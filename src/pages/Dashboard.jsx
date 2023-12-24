import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { fetchAllQuiz } from '../services/operations/quiz';

export const Dashboard = () => {

  const dispatch = useDispatch();
  const {token} = useSelector((state)=> state.auth);
  const[open,setOpen] = useState(true);


  useEffect(()=>{
    dispatch(fetchAllQuiz(token));
  },[]);
  return (
    <div className='relative'>
        <div className={` bg-yellow-400 absolute flex flex-col items-end p-2 top-0 h-full z-10 w-1/6 text-xl ${open ? "" : "-translate-x-[calc(100%-30px)]"} transition-all duration-700`}>
          <button className='font-bold' onClick={()=>setOpen(!open)}>
            { open ? "X" : "_"}
          </button>
          <div className='h-[1px] mt-1 mb-3 w-full bg-black'></div>
          <div className={`w-full flex flex-col items-start`}>
            <p>Profile</p>
            <p>MyQuiz</p>
            <p>Create Quiz</p>
          </div>
        </div>
        <Outlet/>
    </div>
  )
}
