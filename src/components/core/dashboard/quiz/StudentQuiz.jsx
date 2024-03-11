import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Loader } from '../../../common/Loader';

export const StudentQuiz = () => {

  const {loading,allQuiz} = useSelector((state)=> state.viewQuiz);
  const [data, setData] = useState([]);

  function dateModify(dates){
    let newDate = dates.split("T")[0].split("-");
    let formatedDate = "" + newDate[2] + " / " + newDate[1] + " / " + newDate[0]; 
    return formatedDate;
  }

  useEffect(() => {
    setData(allQuiz);
    console.log(data);
  },[allQuiz]);
  return (
    <>
        StudentQuiz
        {loading ? <Loader/> : 
            <>{(data.length === 0) ? 
                <div className='h-full mt-5'>
                    <p className='mb-4'>No Quiz is attempted yet</p>
                    <Link to={"/dashboard/attemptQuiz/page/1"} className='mt-8 p-1 px-2 bg-blue-400 text-white rounded-md text-xl' >
                        Attempt Quiz
                    </Link>
                </div> :
                <div>
                  {
                    data.map((quiz,index) => (<div className='flex gap-5' key={index}>
                      <p className='p-2 flex-1'>{index+1}. {quiz.quizName}</p>
                      <p className='py-2 flex-1'>{quiz.category}</p>
                      <p className='py-2 flex-1 '>{quiz.status}</p>
                      <p className='py-2 flex-1'>{dateModify(quiz.createdAt)}</p>
                      <p className='py-2 flex-1'>{quiz.duration} min</p>
                    </div>))
                    }
                </div>
            }</>
        }
    </>
  )
}
