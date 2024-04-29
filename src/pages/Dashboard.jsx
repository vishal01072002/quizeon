import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { fetchAllQuiz } from '../services/operations/quiz';
import { FiMenu } from "react-icons/fi"
import { RxCross2 } from "react-icons/rx"
import { HiOutlineHome} from "react-icons/hi"
import { BsPersonCircle} from "react-icons/bs"
import { IoIosCreate} from "react-icons/io"
import { MdOutlineAssignment} from "react-icons/md"

export const Dashboard = () => {

  const dispatch = useDispatch();
  const {token} = useSelector((state)=> state.auth);
  const {user} = useSelector((state)=> state.profile);
  const [open,setOpen] = useState(false);
  const location = useLocation();
  const path = location.pathname;

  const sideBarData = [
    {
      name: "Profile",
      links: "/dashboard/profile",
      user: "All",
      icon: <BsPersonCircle fontSize={25}/>,
    },
    {
      name: "My Quiz",
      links: "/dashboard/myQuiz",
      user: "All",
      icon: <MdOutlineAssignment fontSize={25}/>,
    },
    {
      name: "Create Quiz",
      links: "/dashboard/makeQuiz",
      user: "Instructor",
      icon: <IoIosCreate fontSize={25}/>,
    },
    {
      name: "Attempt Quiz",
      links: "/dashboard/attemptQuiz/page/1",
      path: "/dashboard/attemptQuiz/page",
      user: "Student",
      icon: <IoIosCreate fontSize={25}/>,
    },
  ]
  useEffect(()=>{
    dispatch(fetchAllQuiz(token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  return (
    <div className='relative min-h-[89vh]'>
        <div className={` bg-indigo-800 absolute text-white flex flex-col items-end top-0 h-full z-10 w-56 text-xl ${open ? "" : "-translate-x-[calc(100%-40px)]"} transition-all duration-700`}>
          <button className={`font-bold m-1 ${!open && "mr-2"}`} onClick={()=>setOpen(!open)}>
            { open ? <RxCross2 fontSize={30}/> : <FiMenu fontSize={27}/>}
          </button>
          <div className='h-[2px] bg-white absolute mt-[38px] -left-1 w-full'></div>
          <div className={`w-full px-2 flex gap-3 flex-col mt-3 items-start`}>
            <p className='w-full flex items-center justify-center gap-2 rounded-md py-[2px] px-2 mb-4'><HiOutlineHome fontSize={25}/> Dashboard</p>
            {
              sideBarData.map((side,indx) => (
                (side.user === "All" || side.user === user.account) && 
                <Link className={`w-full text-left ${path === side.links && "bg-indigo-900"} ${side.name === "Attempt Quiz" && path?.split("/")?.slice(0,4)?.join("/") === side.path && "bg-indigo-900"} rounded-md flex gap-2 items-center py-[2px] px-2`} to={side.links} key={indx}>{side.icon} {side.name}</Link>
              ))
            }
          </div>
        </div>
        <Outlet/>
    </div>
  )
}
