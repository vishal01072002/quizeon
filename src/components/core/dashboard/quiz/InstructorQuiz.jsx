import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOneQuiz,deleteQuiz } from '../../../../services/operations/quiz';
import { Loader } from "../../../common/Loader"
import { useNavigate } from 'react-router-dom';
import {FaRegEdit, FaEye, FaChartPie} from "react-icons/fa"
import { FaChevronDown } from "react-icons/fa";
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
    
    // check for published
    const isPublish = (quiz)=>{
      const currDate = new Date();
      console.log(currDate.toISOString()?.split("T")?.at(0) >= quiz?.schedule[0] ,
      currDate.toTimeString()?.split(":").slice(0,2)?.join(":") , quiz?.schedule[1]);
      if(quiz?.status === "Draft") return false;
      if(quiz?.status === "Publish"){
        if(currDate.toISOString()?.split("T")?.at(0) > quiz?.schedule[0]){
          return true;
        }
        else if(currDate.toISOString()?.split("T")?.at(0) === quiz?.schedule[0]){
          if(currDate.toTimeString()?.split(":").slice(0,2)?.join(":") >= quiz?.schedule[1]){
            return true;
          }
        }
      }
      return false;
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
      let formatedDate = "" + newDate[2] + " /" + newDate[1] + " /" + newDate[0]; 
      return formatedDate;
    }

    useEffect(()=>{
        setData(allQuiz)
    },[allQuiz]);

  return (
    <div className='min-h-[89vh] w-full'>
        MyQuiz
    {
        loading ? <Loader/> : 
        <>
           { (!data) ? <p>Not Quiz Yet first create one</p> : 
            <>
            <div className='pl-8 xxs:hidden flex gap-3 xs:gap-5 justify-center'>
            <div className='py-1 relative'>
              <span>Category</span> 
              <select
                className="text-black focus:outline-none border-2 ml-2 border-gray-700 rounded-[4px]"
                name='category'
                onChange={HandleFilter}
              >
                {Categories?.map((category, indx) => (
                  <option key={indx} className='text-black text-lg' value={category?.name}>
                    {category?.name}
                  </option>
                ))}
              </select>
            </div>
            <div className='py-1 relative'>
              Status 
              <select
                name='status'
                className="text-black focus:outline-none border-2 ml-2 border-gray-700 rounded-[4px]"
                onClick={HandleFilter}
              > 
                <FaChevronDown/>
                <option className='text-black text-lg' value="All">
                  All
                </option>
                <option className='text-black text-lg' value="Draft">
                  Draft
                </option>
                <option className='text-black text-lg' value="Publish">
                  Publish
                </option>
              </select>
            </div>
            </div>
            <table className='ml-12 w-[86%] xs:w-[89%] xxs:w-11/12 md:w-[93%] lg:w-[95%] mx-auto rounded-md h-full'>
                <tr className='text-start text-xl h-[50px] font-medium gap-3 border-b-[12px] border-white bg-slate-800 text-gray-100'>
                    <td className='pl-2'>QuizName</td>
                    <td className='relative hidden xxs:table-cell'>
                      <span>Category</span> 
                      <select
                        className="my-quiz-input absolute"
                        name='category'
                        onChange={HandleFilter}
                      >
                        {Categories?.map((category, indx) => (
                          <option key={indx} className='text-black text-xl' value={category?.name}>
                            {category?.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className='py-2 relative hidden xxs:table-cell'>
                      Status 
                      <select
                        name='status'
                        className="my-quiz-input absolute"
                        onClick={HandleFilter}
                      > 
                        <FaChevronDown/>
                        <option className='text-black text-xl' value="All">
                          All
                        </option>
                        <option className='text-black text-xl' value="Draft">
                          Draft
                        </option>
                        <option className='text-black text-xl' value="Publish">
                          Publish
                        </option>
                      </select>
                    </td>

                    <td className='py-2 relative'>
                      <span>Created</span>
                      <select
                        className="my-quiz-input absolute"
                        name='created'
                        onClick={HandleFilter}
                      > 
                        <option className='text-black text-xl' value="Old">
                          Old
                        </option>
                        <option className='text-black text-xl' value="New">
                          New
                        </option>
                      </select>
                    </td>
                    <td className='py-2 hidden sm:block'>Duration</td>
                    <td className='py-2 text-center'>Options</td>
                </tr>
                {data.length !== 0 && data.map((quiz,index) => (<tr className={`text-start text-lg font-semibold border-b-8 border-white px-4 ${index&1 ? "bg-gray-300" : "bg-gray-200"}`} key={index}>
                    <td className='pl-3'>{index+1}. {quiz.quizName}</td>
                    <td className='py-2 hidden xxs:table-cell'>{quiz.category}</td>
                    <td className='py-2 hidden xxs:table-cell'>{quiz.status}</td>
                    <td className='py-2'>{dateModify(quiz.createdAt)}</td>
                    <td className='py-2 hidden sm:block'>{quiz.duration} min</td>
                    <td className='py-2  content-start' >
                        <div className='flex justify-around'>
                        <button onClick={()=> viewQuiz(quiz._id)} className=' w-min rounded-md relative group'>
                          <FaEye className='text-blue-800' size={23}/>
                          <div className='invisible opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100'>
                            <div className='h-4 absolute left-1 -top-5 w-4 rotate-45 bg-white cursor-default '></div><span className='absolute w-max bg-white cursor-default text-gray-700 font-normal px-2 -top-10 -right-8 rounded-lg'>View Quiz</span>
                          </div>
                        </button>

                        {!isPublish(quiz) ? <button onClick={()=> editQuiz(quiz._id)} className='w-min rounded-md relative group'>
                          <FaRegEdit className='text-green-700' size={21}/>
                          <div className='invisible opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100'>
                            <div className='h-4 absolute left-1 -top-5 w-4 rotate-45 bg-white cursor-default '></div><span className='absolute w-max bg-white cursor-default text-gray-700 font-normal px-2 -top-10 -right-8 rounded-lg'>edit Quiz</span>
                          </div>  
                        </button> : 
                        <button className='w-min rounded-md relative group' onClick={() => navigate(`/analytic/${quiz._id}`)}>
                          <FaChartPie className='text-purple-500'/>
                          <div className='invisible opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100'>
                            <div className='h-4 absolute left-1 -top-5 w-4 rotate-45 bg-white cursor-default '></div><span className='absolute w-max bg-white cursor-default text-gray-700 font-normal px-2 -top-10 -right-14 rounded-lg'>Analyse Quiz</span>
                          </div>
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
            </table>
            </>
            }
            {data.length === 0 && <p className='w-full mt-6 text-2xl text-center'>NO QUIZ FOUND</p>}
        </> 
    }
    {
        modal && <ConfirmationModal modalData={modal}/>
    }
    </div>
  )
}
