import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { leaderBoardQuiz } from '../services/operations/quiz';
import { Loader } from '../components/common/Loader';
import { BsPatchQuestion } from "react-icons/bs"
import { MdOutlineTimer } from "react-icons/md"
import { FaPeopleGroup } from "react-icons/fa6"
import { ShowScoreCard } from '../components/common/ShowScoreCard';
import { useSelector } from 'react-redux';

export const LeaderBoard = () => {

  // handle image for every user
  const location = useLocation();
  const navigate = useNavigate();
  const {quizId, pageNo} = useParams();
  const {user} = useSelector((state)=> state.profile);
  const [leaderBoardData, setLeaderBoardData] = useState(null);
  const [studentScore, setStudentScore] = useState(null);
  const [loading, setLoading] = useState(true);

  const nextPage = () => {
    navigate(`/leaderBoard/quiz/${quizId}/page/${Number(pageNo)+1}`);
  }
  
  const prevPage = () => {
    if(pageNo > 1){
      navigate(`/leaderBoard/quiz/${quizId}/page/${pageNo-1}`);
    }
  }

  const showScore = (data)=> {
    setStudentScore(data);
  }

  const fetLeaderBoardQuiz = async() => {
    setLoading(true);
    const result = await leaderBoardQuiz({quizId:quizId,pageNo:pageNo});
    setLeaderBoardData(result);
    console.log(result);
    setLoading(false);
  }

  useEffect(()=>{
    fetLeaderBoardQuiz();
  },[location.pathname])
  return (
    <>
      {
        loading ? <Loader/> : 
        <div className='bg-white min-h-[88vh] p-3 pt-0 sm:p-5 sm:pt-5 relative'>
          {/* top div */}
          <div className='flex flex-col xs:flex-row relative gap-1 xs:gap-3 sm:gap-10 justify-end w-full sm:w-[95%] lg:w-10/12 mx-auto mb-8 mt-5'>
            <div onClick={() => user.account === "Instructor" ? navigate(`/analytic/${quizId}`) : navigate("/dashboard/myQuiz")} className='absolute cursor-pointer left-5 top-5 px-3 py-2 bg-purple-500 rounded-sm text-white '>Back</div>
            <div className='p-1 sm:p-2 flex flex-col items-end text-start'>
              <div className=' flex gap-2 items-end'>
                <BsPatchQuestion className='text-fuchsia-600' fontSize={20}/><span className='text-black text-lg font-semibold'>{leaderBoardData?.quiz?.quizName}</span>
              </div>
            <p className='text-gray-900 text-base'>Name of the Quiz</p></div>

            
              <div className='p-1 sm:p-2 flex flex-col items-end text-start'>
                <div className='flex gap-2 items-center'>
                  <MdOutlineTimer className='text-fuchsia-600' fontSize={20}/><span className='text-black text-lg font-semibold'>{leaderBoardData?.quiz?.duration || 0} Min</span></div>
                <p className='text-gray-900 text-base'>Quiz Duration</p></div>
           
              <div className='p-1 sm:p-2 flex flex-col items-end text-start'> 
                <div className=' flex gap-2 items-center'>
                  <FaPeopleGroup className='text-fuchsia-600' fontSize={20}/><span className='text-black text-lg font-semibold'>{leaderBoardData?.totalStudent || 0}</span>
                </div>
              <p className='text-gray-900 text-base'>Participants</p></div>
          </div>

          {/* LeaderBoard */}
          <div className='flex items-center flex-col gap-4 p-1 sm:p-4'>
            <div className='flex w-[95%] lg:w-10/12 mx-auto mb-5 gap-3 justify-between font-semibold text-lg text-gray-600'>
              <p className='w-10 text-purple-800'>Rank</p>
              <p className='flex-1 min-w-[200px]'>Participants</p>
              <p className='flex-1'>Score</p>
              <p className='flex-1 hidden sm:block'>CompletedTime</p>
              <div className='flex-1 md:min-w-min hidden md:block'><p><span className='text-green-500'>Correct</span>|<span className='text-red-500'>Wrong</span>|<span className='text-blue-500'>NoAttempt</span></p></div>
            </div>
            {
              (leaderBoardData !== null && leaderBoardData?.totalStudent > 0 ) && leaderBoardData?.quiz?.scoreList?.length > 0 &&
              leaderBoardData?.quiz?.scoreList.map((score,indx) => (
                <div className={`flex w-full sm:w-[95%] lg:w-10/12 gap-2 sm:gap-3 text-lg justify-between items-start border-b-2 p-2 border-gray-300 shadow-sm rounded-md hover:scale-105 duration-200 cursor-pointer ${user?._id === score?.studentId && "bg-fuchsia-500 scale-105 text-white font-semibold"}`} key={score?._id}
                onClick={() => showScore({...score, rank: `${(indx+1) + (leaderBoardData?.scorePerPage * (pageNo-1))}${(pageNo === '1' && indx === 0) ? "st" : (pageNo === '1' && indx === 1) ? "nd" : (pageNo === '1' && indx === 2) ? "rd" : "th"}`})}>
                  <p className={`w-10 text-xl ${user?._id === score?.studentId && "text-white"} text-purple-800 font-bold text-center`}>{(indx+1) + (leaderBoardData?.scorePerPage * (pageNo-1))}{(pageNo === '1' && indx === 0) ? "st" : (pageNo === '1' && indx === 1) ? "nd" : (pageNo === '1' && indx === 2) ? "rd" : "th"}</p>
                  <div className='flex-1 min-w-[200px] flex'>
                    <div className='w-20 flex justify-center'>
                      <img src={`${score?.image}`} alt='names' className='w-7 rounded-sm h-7'/>  
                    </div>
                    <p className=' text-start'>{score?.studentName || "Vishal Kumar"}</p>
                  </div>
                  <p className='flex-1 text-center'>{score?.score}</p>
                  <p className='flex-1 grow text-center hidden sm:block'>{score?.completedTime?.split(",").at(0)}:{score?.completedTime.split(",").at(1)} min</p>
                  <div className='flex-1 hidden md:flex md:min-w-[220px] justify-center'>
                    <p className={`w-16 font-semibold text-start ${user?._id === score?.studentId && "text-white"} text-green-500`}>{score?.correct}</p>
                    <p className={`w-10 font-semibold text-start ${user?._id === score?.studentId && "text-white"} text-red-500`}>{score?.wrong}</p>
                    <p className={`w-14 font-semibold text-center ${user?._id === score?.studentId && "text-white"} text-blue-500`}>{score?.unAttempted}</p>
                  </div>
                </div>
              ))    
            }

            {(leaderBoardData === null || leaderBoardData?.totalStudent <= 0 ) && <div className='text-xl mt-5 font-semibold text-gray-600'>No Student Attempted Quiz</div>}

            {(leaderBoardData !== null && leaderBoardData?.totalStudent > 0 ) && <div className='w-[95%] lg:w-10/12 items-center mt-5 flex gap-4'>
              <p className='text-lg font-semibold text-gray-800'>{pageNo}/{leaderBoardData?.totalPage} Page</p>
              {pageNo > 1 && <button className='px-3 py-1 rounded-sm bg-purple-600 hover:bg-purple-700 duration-300 text-white' disabled={loading} onClick={prevPage}>Previous</button>}
              {pageNo < leaderBoardData?.totalPage && <button className='px-3 py-1 rounded-sm bg-purple-600 hover:bg-purple-700 duration-300 text-white' disabled={loading} onClick={nextPage}>Next</button>}
            </div>}
          </div>

          {studentScore !== null && <ShowScoreCard scoreData={studentScore} closeCard={setStudentScore}/>}
        </div>
      }
    </>
  )
}
