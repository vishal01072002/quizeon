import React, { useEffect, useState } from 'react'
import { FaEye, FaRegEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const QuizList = ({quizes,parentName}) => {

    const Categories = [
        {
          _id : 0,
          name: "All"
        },
        {
          _id : 1,
          name: "Cpp"
        },
        {
          _id : 2,
          name: "Java"
        },
        {
          _id : 3,
          name: "C"
        },
        {
          _id : 4,
          name: "General"
        },
      ];
    
    const {allQuiz} = useSelector((state) => state.viewQuiz);
    const navigate = useNavigate();
    const [modal,setModal] = useState(null);
    const [data,setData] = useState(quizes);
    const [filters, setFilters] = useState({
      category: "All",
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
      let newData = quizes;
      if(changeOrderFlag){
        newData = [...quizes].reverse();
      }

      // apply filter
      if(newFilter.category !== "All"){
        newData = newData.filter((quiz) => quiz.category === newFilter.category);
      }

      setData(newData);
      setFilters(newFilter);

    }

    // if click on edit quiz
    function editQuiz(quizId){
        // dispatch(fetchOneQuiz({quizId:quizId},navigate));
    }
    
    function deleteQuizz(quizId){
        // dispatch(deleteQuiz({quizId:quizId},token));
    }

    function dateModify(dates){
      let newDate = dates.split("T")[0].split("-");
      let formatedDate = "" + newDate[2] + "/" + newDate[1] + "/" + newDate[0]; 
      return formatedDate;
    }

    function isAttempted (quizId){
        console.log(quizId,allQuiz);
        for(let i=0; i<allQuiz.length; i++){
          if(allQuiz[i]._id === quizId){
            return true;
          }
        }
        return false;
    }

    useEffect( () => {
        setData(quizes);
    },[quizes]);

  return (
    <>
        <div className='w-full mx-auto rounded-md h-full space-y-3'>
            <div className='text-start text-lg sm:text-xl h-[50px] font-medium border-b-[12px] border-white flex items-center bg-slate-800 text-gray-100'>
                    <p className='p-2 flex-1'>QuizName</p>
                    <p className='py-2 flex-1 text-center'>
                      Category 
                      <select
                        className="my-quiz-input"
                        name='category'
                        onChange={HandleFilter}
                      >
                        {Categories?.map((category, indx) => (
                          <option key={indx} className='text-black text-lg' value={category?.name}>
                            {category?.name}
                          </option>
                        ))}
                      </select>
                    </p>

                    <p className='py-2 flex-1 text-end md:text-center'>
                      Created
                      <select
                        className="my-quiz-input"
                        name='created'
                        onClick={HandleFilter}
                      > 
                        <option className='text-black text-lg' value="Old">
                          Old
                        </option>
                        <option className='text-black text-lg' value="New">
                          New
                        </option>
                      </select>
                    </p>
                    <p className='py-2 hidden sm:block flex-1 text-center'>Duration</p>
                    <p className='py-2 flex-1 text-end pr-3'>Options</p>
            </div>
            {data.length !== 0 && data.map((quiz,index) => (<div className={`text-start text-lg border-b-2 gap-2 border-white flex sm:pl-4 ${index&1 ? "bg-gray-300" : "bg-gray-200"}`} key={index}>
                    <p className='p-2 flex-1'>{index+1}. {quiz.quizName}</p>
                    <p className='py-2 flex-1 text-center'>{quiz.category}</p>
                    <p className='py-2 flex-1 text-center'>{dateModify(quiz.createdAt)}</p>
                    <p className='py-2 flex-1 text-center hidden sm:block'>{quiz.duration} min</p>
                    <div className='py-2 flex-1 text-end pr-3'>
                      {parentName === "instructorQuiz" && <div className='flex gap-4'>
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
                      </div>}

                      {
                        parentName === "attemptQuiz" && <div>
                            {
                                isAttempted(quiz._id) ? 
                                <button onClick={() => navigate(`/leaderBoard/quiz/${quiz._id}/page/1`)}>Result</button> : 
                                <button onClick={() => navigate(`/attemptquiz/quiz/${quiz._id}`)}>Attempt</button>
                            }
                        </div>
                      }
                    </div>
            </div>))}
        </div>
    </>
  )
}
