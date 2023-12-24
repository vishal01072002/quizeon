import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOneQuiz,deleteQuiz } from '../../../../services/operations/quiz';
import { Loader } from "../../../common/Loader"
import { useNavigate } from 'react-router-dom';
import {FaRegEdit, FaEye} from "react-icons/fa"
import { FaChevronDown,FaChevronUp } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ConfirmationModal from '../../../common/ConfirmModal';


export const MyQuiz = () => {
    const Categories = [
        {
          _id : 0,
          name: "All"
        },
        {
          _id : 1,
          name: "cpp"
        },
        {
          _id : 2,
          name: "java"
        },
        {
          _id : 3,
          name: "c"
        },
      ];

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {loading,allQuiz} = useSelector((state)=> state.viewQuiz);
    const {token} = useSelector((state)=> state.auth);
    const [modal,setModal] = useState(null);
    const [data,setData] = useState(allQuiz);

    function HandleStatus(event){
      const value = event.target.value;
      if(value == "All") {
        setData(allQuiz);
        return;
      }

      const newData = allQuiz.filter((quiz)=>{return quiz.status === value});
      setData(newData);
    }

    function HandleCategory(event){
      const value = event.target.value;
      if(value == "All") {
        setData(allQuiz);
        return;
      }

      const newData = allQuiz.filter((quiz)=>{return quiz.category === value});
      setData(newData);

    }
    function HandleOrder(){
      console.log();
    }
    // if click on edit quiz
    function editQuiz(quizId){
        dispatch(fetchOneQuiz({quizId:quizId},navigate));
    }
    
    function deleteQuizz(quizId){
      dispatch(deleteQuiz({quizId:quizId},token));
    }

    function dateModify(dates){
      let newDate = dates.split("T")[0].split("-");
      let formatedDate = "" + newDate[2] + " / " + newDate[1] + " / " + newDate[0]; 
      return formatedDate;
    }

    useEffect(()=>{
        
    },[allQuiz]);

  return (
    <div className='h-full w-full'>
        MyQuiz
    {
        loading ? <Loader/> : 
        <>
           { (!data) ? <p>Not Quiz Yet first create one</p> : 
            <table className=' w-4/5 mx-auto rounded-md h-full space-y-3'>
                <tr className='text-start text-xl h-[50px] font-medium gap-3 border-b-[12px] border-white bg-slate-800 text-gray-100'>
                    <td className='p-2'>QuizName</td>
                    <td className='py-2 '>
                      Category 
                      <select
                        className="my-quiz-input"
                        onChange={HandleCategory}
                      >
                        {Categories?.map((category, indx) => (
                          <option key={indx} className='text-black' value={category?.name}>
                            {category?.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className='py-2 '>
                      Status 
                      <select
                        className="my-quiz-input"
                        onClick={HandleStatus}
                      > 
                        <option className='text-black' value="All">
                          All
                        </option>
                        <option className='text-black' value="Draft">
                          Draft
                        </option>
                        <option className='text-black' value="Publish">
                          Publish
                        </option>
                      </select>
                    </td>

                    <td className='py-2 '>
                      Created
                      <select
                        className="my-quiz-input"
                        onClick={HandleOrder}
                      > 
                        <option className='text-black' value="New">
                          New
                        </option>
                        <option className='text-black' value="Old">
                          Old
                        </option>
                      </select>
                    </td>
                    <td className='py-2'>Duration</td>
                    <td className='py-2'></td>
                </tr>
                {data.length !== 0 && data.map((quiz,index) => (<tr className={`text-start text-lg border-b-2 border-white px-4 ${index&1 ? "bg-gray-300" : "bg-gray-200"}`} key={index}>
                    <td className='p-2'>{index+1}. {quiz.quizName}</td>
                    <td className='py-2'>{quiz.category}</td>
                    <td className='py-2 '>{quiz.status}</td>
                    <td className='py-2'>{dateModify(quiz.createdAt)}</td>
                    <td className='py-2'>{quiz.duration} minutes</td>
                    <td className='py-2  content-start' >
                        <div className='flex justify-around'>
                        <button onClick={()=> editQuiz(quiz._id)} className=' w-min rounded-md'><FaEye className='text-blue-800' size={23}/></button>
                        <button onClick={()=> editQuiz(quiz._id)} className=' w-min rounded-md'><FaRegEdit className='text-green-700' size={21}/></button>
                        <button onClick={()=> 
                            setModal({
                                text1: "Delete this Quiz?",
                                text2: "This Quiz will be deleted permanentaly",
                                btn1Text: "Delete",
                                btn2Text: "Cancel",
                                btn1Handler: () => deleteQuizz(quiz._id),
                                btn2Handler: () => setModal(null)})
                        } className=' w-min rounded-md'><MdDelete size={23} className='text-red-600'/></button>
                        </div>
                    </td>
                </tr>))}
            </table>}
            {data.length === 0 && <p className='w-full mt-6 text-2xl text-center'>NO QUIZ FOUND</p>}
        </> 
    }
    {
        modal && <ConfirmationModal modalData={modal}/>
    }
    </div>
  )
}
