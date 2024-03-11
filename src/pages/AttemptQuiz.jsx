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
  },[location.pathname]);
  
  return (
    <>
      {
        loading ? <Loader/> : 
        <div className='w-4/5 mx-auto'>
          <p>Available Quiz</p>
          {
            data.length === 0 ? <p>No Quizes are Available to Attempt</p> :
            <>
              <div>
                <QuizList quizes={data} parentName={"attemptQuiz"}/>
              </div>

            </>
          }
          <div className='w-max mt-5 flex gap-4'>
              <p>{pageNo}/{totalPage}</p>
              {pageNo > 1 && <button disabled={loading} onClick={prevPage}>Previous</button>}
              {pageNo < totalPage && <button disabled={loading} onClick={nextPage}>Next</button>}
          </div>
        </div>
      }

    </>
  )
}
