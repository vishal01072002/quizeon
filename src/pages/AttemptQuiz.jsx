import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { fetchQuizes } from '../services/operations/quiz';
import { useSelector } from 'react-redux';
import { Loader } from '../components/common/Loader';
import { QuizList } from '../components/common/QuizList';

export const AttemptQuiz = () => {

  // if attempted show score else attempt button
  const location = useLocation();
  const navigate = useNavigate();
  const {token} = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPage, setTotalPage] = useState(0);
  const params = useParams();
  const pageNo = Number(params.pageNo);
  
  const nextPage = () => {
    navigate(`/dashboard/attemptQuiz/page/${Number(pageNo)+1}`);
  }
  
  const prevPage = () => {
    if(pageNo > 1){
      navigate(`/dashboard/attemptQuiz/page/${pageNo-1}`);
    }
  }

  const fetchQuizData = async() => {
    setLoading(true);
    const result = await fetchQuizes(token,pageNo);
    setTotalPage(result[1])
    setData(result[0]);
    setLoading(false);
  }

  useEffect(() => {
    fetchQuizData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[location.pathname]);
  
  return (
    <>
      {
        loading ? <Loader/> : 
        <div className='w-[95%] sm:w-11/12 md:w-4/5 mx-auto'>
          <p className='py-3 text-2xl pl-8 sm:pl-0 font-semibold text-gray-700'>Available Quiz</p>
          {
            data.length === 0 ? <p className='text-red-500 ml-8 xs:ml-0 text-xl mt-16'>No Quizes are Available to Attempt</p> :
            <>
              <div className='ml-8 sm:ml-5 md:pl-0'>
                <QuizList quizes={data} parentName={"attemptQuiz"}/>
              </div>

              <div className='ml-8 sm:ml-5 md:pl-0 w-max mt-5 flex gap-4'>
                  <p>{pageNo}/{totalPage}</p>
                  {pageNo > 1 && <button disabled={loading} onClick={prevPage}>Previous</button>}
                  {pageNo < totalPage && <button disabled={loading} onClick={nextPage}>Next</button>}
              </div>
            </>
          }
        </div>
      }

    </>
  )
}
