import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { MdBarChart, MdOutlineTimer } from "react-icons/md"
import { CiCalendarDate } from "react-icons/ci"
import { Loader } from '../../../common/Loader';
import Categoriess from '../../../../utils/categgoryIndex';

export const StudentQuiz = () => {

  const Categories = useMemo(() => Categoriess(),[]);

  const {loading,allQuiz} = useSelector((state)=> state.viewQuiz);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  function dateModify(dates){
    let tempDate = dates?.split("T")?.at(0)?.split("-");
    let formatedDate = "" + tempDate?.at(2) + " / " + tempDate?.at(1) + " / " + tempDate?.at(0); 
    return formatedDate;
  }

  function HandleFilter(event){
    event.preventDefault()
    // apply filter
    if(event.target.value !== "All"){
      const newData = allQuiz.filter((quiz) => quiz?.category === event.target.value);
      setData(newData);
    }
    else{
      setData(allQuiz);
    }
  }

  const generateCircle = (index) =>{
    // blue orange fuchsia orange blue fuchsia
    if((index)%6 === 0 || (index)%6 === 5) return 'bg-blue-600';
    if((index)%6 === 1 || (index)%6 === 3) return 'bg-orange-600';
    if((index)%6 === 2 || (index)%6 === 4) return 'bg-fuchsia-600';
  }

  const generateColor = (index) =>{
    // blue orange fuchsia orange blue fuchsia
    if((index)%6 === 0 || (index)%6 === 5) return 'text-blue-800';
    if((index)%6 === 1 || (index)%6 === 3) return 'text-orange-800';
    if((index)%6 === 2 || (index)%6 === 4) return 'text-fuchsia-800';
  }

  const generateBgColor = (index) =>{
    // blue orange fuchsia orange blue fuchsia
    if((index)%6 === 0 || (index)%6 === 5) return 'bg-blue-200';
    if((index)%6 === 1 || (index)%6 === 3) return 'bg-orange-200';
    if((index)%6 === 2 || (index)%6 === 4) return 'bg-fuchsia-200';
  }
  
  const generateBorderColor = (index) =>{
    // blue orange fuchsia orange blue fuchsia
    if((index)%6 === 0 || (index)%6 === 5) return 'border-blue-400';
    if((index)%6 === 1 || (index)%6 === 3) return 'border-orange-400';
    if((index)%6 === 2 || (index)%6 === 4) return 'border-fuchsia-400';
  }

  useEffect(() => {
    setData(allQuiz);
  },[allQuiz]);
  return (
    <>
        <p className='py-5 text-2xl pl-8 sm:pl-0 font-semibold text-gray-700'>Quiz Attempted By You</p>
        <div className='relative text-lg ml-8 sm:ml-0 w-full flex flex-row mb-8 justify-center items-center gap-3 mx-auto'>
          <span>Category</span>
          <select
            className='border px-2 rounded-md border-gray-500 focus:border-gray-500 focus:outline-none max-w-[150px]'
            onChange={HandleFilter}
          >
            {Categories?.map((one,indx) => (
              <option className='text-base text-black' key={indx}>{one?.name}</option>
            ))}
          </select>
        </div>
        {loading ? <Loader/> : 
            <>{(data?.length === 0) ? 
                <div className='h-full mt-5'>
                    <p className='text-red-500 ml-8 xs:ml-0 text-xl mt-16 mb-4'>No Quiz is attempted yet</p>
                    <Link to={"/dashboard/attemptQuiz/page/1"} className='mt-8 p-1 px-2 bg-blue-400 text-white rounded-md text-xl' >
                        Attempt Quiz
                    </Link>
                </div> :
                <div>
                  {
                    data?.map((quiz,index) => (
                      <div key={index} className='flex mb-3 w-[85%] sm:w-max mr-2 xs:mr-auto mx-auto items-center gap-2 md:gap-5'>
                        <div className={`text-lg rounded-lg border-b-4 
                        ${generateBorderColor(index)} flex items-center mx-auto gap-1 w-full justify-between sm:gap-10 font-semibold px-3 py-2 
                        ${generateBgColor(index)}`}>
                          <div className='flex items-center gap-2 sm:gap-4'>
                            <p className={`w-10 h-10 rounded-full flex items-center justify-center text-2xl font-semibold 
                            ${generateCircle(index)} text-white`}>{index+1}</p>  
                            <p>{quiz?.quizName}</p>
                          </div>
                          <div className='flex flex-col sm:flex-row items-end md:items-center gap-0 md:gap-10'>
                            <p className='items-center hidden sm:flex  gap-1'><CiCalendarDate fontSize={23} fontWeight={900} className={`${generateColor(index)}`}/>{dateModify(quiz?.scoreList?.at(0)?.createdAt)}</p>
                            
                            <p className='flex items-center gap-1'><MdBarChart className={`${generateColor(index)}`}/>{quiz?.scoreList?.at(0)?.score}</p>

                            <div className='flex flex-row-reverse md:flex-row items-center gap-1'>
                              <p className=''>{quiz?.scoreList?.at(0)?.completedTime?.split(",")?.join(":")} min</p>
                              <MdOutlineTimer fontSize={22} className={`
                              ${generateColor(index)}`}/>
                            </div>
                          </div>
                        </div>
                        <button onClick={() => navigate(`/leaderBoard/quiz/${quiz?._id}/page/1`)} className={`rounded-lg border-b-4 ${generateBorderColor(index)} 
                        ${generateBgColor(index)} text-gray-800 text-lg md:text-xl font-semibold h-full px-3 sm:px-5 py-5 md:py-3 hover:scale-95 duration-200`}>Rank</button>
                    </div>))
                    }
                </div>
            }</>
        }
    </>
  )
}
