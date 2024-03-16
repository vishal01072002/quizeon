import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOneQuiz,deleteQuiz } from '../../../../services/operations/quiz';
import { Loader } from "../../../common/Loader"
import { useNavigate } from 'react-router-dom';
import {FaRegEdit, FaEye, FaChartPie} from "react-icons/fa"
import { FaChevronDown,FaChevronUp } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ConfirmationModal from '../../../common/ConfirmModal';


export const InstructorQuiz = () => {
    const Categories = [
      {
        _id : 0,
        name: "All",
      },
      {
        _id : 1,
        name: "Cpp",
      },
      {
        _id : 2,
        name: "Java",
      },
      {
        _id : 3,
        name: "C",
      },
      {
        _id : 4,
        name: "General",
      },
    ];

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {loading,allQuiz} = useSelector((state)=> state.viewQuiz);
    const {token} = useSelector((state)=> state.auth);
    const [modal,setModal] = useState(null);
    const [data,setData] = useState([]);
    const [filters, setFilters] = useState({
      category: "All",
      status: "All",
      created: "Old",
    });

    function HandleFilter(event){
      event.preventDefault()
      let newFilter = {...filters, [event.target.name] : event.target.value}
      
      // first change order if needed then apply filter
      let changeOrderFlag = false;

      if(newFilter.created === "New"){
        changeOrderFlag = true;
      }

      // change order accordingly
      let newData = allQuiz;
      if(changeOrderFlag){
        newData = [...allQuiz].reverse();
      }

      // apply filter
      if(newFilter.category !== "All"){
        newData = newData.filter((quiz) => quiz.category === newFilter.category);
      }

      if(newFilter.status !== "All"){
        newData = newData.filter((quiz) => quiz.status === newFilter.status);
      }

      setData(newData);
      setFilters(newFilter);

    }
    
    // if click on edit quiz
    function editQuiz(quizId){
        dispatch(fetchOneQuiz({quizId:quizId},navigate,false));
    }
    
    // if click on view mode
    function viewQuiz(quizId){
        dispatch(fetchOneQuiz({quizId:quizId},navigate,true));
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
        setData(allQuiz)
    },[allQuiz]);

  return (
    <div className='min-h-screen w-full'>
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
                        name='category'
                        onChange={HandleFilter}
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
                        name='status'
                        className="my-quiz-input"
                        onClick={HandleFilter}
                      > 
                        <FaChevronDown/>
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
                        name='created'
                        onClick={HandleFilter}
                      > 
                        <option className='text-black' value="Old">
                          Old
                        </option>
                        <option className='text-black' value="New">
                          New
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
                    <td className='py-2'>{quiz.duration} min</td>
                    <td className='py-2  content-start' >
                        <div className='flex justify-around'>
                        <button onClick={()=> viewQuiz(quiz._id)} className=' w-min rounded-md'><FaEye className='text-blue-800' size={23}/></button>

                        {quiz.status !== "Publish" ? <button onClick={()=> editQuiz(quiz._id)} className='w-min rounded-md'><FaRegEdit className='text-green-700' size={21}/></button> : 
                        <button className='w-min rounded-md' onClick={() => navigate(`/analytic/${quiz._id}`)}>
                          <FaChartPie className='text-purple-500'/>
                        </button>}
                        
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
