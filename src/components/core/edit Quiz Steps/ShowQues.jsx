import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaChevronDown,FaChevronUp,FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ConfirmationModal from '../../common/ConfirmModal';
import { removeQuestion } from '../../../services/operations/quiz';
import { setQues, setStep, setEditQuesMode } from '../../../slice/quizSlice';
export const ShowQues = () => {
  
  const {editQuiz} = useSelector((state) => state.quiz);
  const [modal,setModal] = useState(null);
  const dispatch = useDispatch();

  const handleDeleleQues = (quizId,questionId) => {
    const data = {quizId:quizId, questionId:questionId};
    dispatch(removeQuestion(data));
    setModal(null);
  }

  return (
    <div className='p-4 min-w-[756px] flex flex-col items-start gap-3'>
        {   !editQuiz || editQuiz.questions.length === 0 ? 
                <div>No Questions found</div> : 
    
                editQuiz && editQuiz.questions.map((question,indx) => (
                <details className={`bg-white w-full text-start px-2 py-2 rounded-md`} key={question._id}>
                    <summary className='text-slate-800 text-lg flex justify-between items-center'>
                        <p>
                            <FaChevronDown className='inline-block mr-3'/>
                            Question {indx+1}. 
                        </p>

                        <div className='flex items-center gap-4 mr-3'>
                            <button onClick={() => {
                                dispatch(setQues(question));
                                dispatch(setStep(2));
                                dispatch(setEditQuesMode(true));
                            }}><FaRegEdit/></button>
                            <button onClick={()=>{
                                setModal({
                                text1: "Delete this Question?",
                                text2: "This question of the Quiz will be deleted",
                                btn1Text: "Delete",
                                btn2Text: "Cancel",
                                btn1Handler: () => handleDeleleQues(editQuiz._id,question._id),
                                btn2Handler: () => setModal(null)})
                            }}><MdDelete size={21} className='text-red-600'/></button>
                        </div>
                    </summary>
                    <div className='w-[95%] ml-2 bg-black h-[1px] my-[8px]'></div>
                    <div className='pl-4 flex flex-col gap-4'>
                        <div>
                            <p className='text-lg font-medium'>Question</p>
                            <p>{question.question}</p>
                        </div>

                        <div>
                            <p className='text-lg font-medium'>Options</p>
                            <div>{question.options.map((option,indx) => (
                                <p key={indx}>{indx+1}. {option}</p>
                            ))}</div>
                        </div>

                        <div>
                            <p className='text-lg font-medium'>Answer</p>
                            <p>{question.correct}</p>
                        </div>
                    </div>
                </details>
            ))
        }
        {
            modal && <ConfirmationModal modalData={modal}/>
        }
    </div>
  )
}
