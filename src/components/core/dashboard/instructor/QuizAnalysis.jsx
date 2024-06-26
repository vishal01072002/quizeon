import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Chart, registerables} from "chart.js"
import { Bar, Doughnut, Line } from "react-chartjs-2"
import { BsPatchQuestion } from "react-icons/bs";
import { MdOutlineTimer, MdOutlineWorkspacePremium } from "react-icons/md";
import { TbHexagonNumber1,TbHexagonNumber2,TbHexagonNumber3 } from "react-icons/tb";
import { Loader } from '../../../common/Loader';
import { quizAnalytics } from '../../../../services/operations/quiz';
import winner from "../../../../assets/winner-previews.png"

Chart.register(...registerables)
export const QuizAnalysis = () => {

  const [loading, setLoading] = useState(true);
  const [anlyticalData,setAnlyticalData] = useState(null);
  const [isGenderBar, setIsGenderBar] = useState(false);
  const {token} = useSelector((state) => state.auth);
  const {quizId} = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const fetchAnalyseData = async() => {
    setLoading(true);
    const result = await quizAnalytics({quizId:quizId},token);
    console.log(result);
    setAnlyticalData(result);
    setLoading(false);
  }

  // Function to generate random colors for the chart
  const generateRandomColors = (numColors) => {
    const colors = []
    for (let i = 0; i < numColors; i++) {
      // const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`

      const color = `hsl(${Math.random() * 360}, 100%, 68%)`
      colors.push(color)
    }
    return colors;
  }

  const genderBarData = {
    labels : ["Ages"],
    datasets:[
      {
        label : "Male",
        data: [anlyticalData?.genderData?.[0]],
        backgroundColor: generateRandomColors(1),
        barPercentage : 0.5,
      },
      {
        label : "Female",
        data: [anlyticalData?.genderData?.[1]],
        backgroundColor: generateRandomColors(1),
        barPercentage : 0.5,
      }
    ],
  }

  const genderData = {
    labels : ["Male", "Female"],
    datasets:[
      {
        data: anlyticalData?.genderData,
        backgroundColor: generateRandomColors(2),
      }
    ]
  }
  
  const scoreData = {
    labels : anlyticalData?.scoreChart?.[0],
    datasets:[
      {
        label: "Students",
        data: anlyticalData?.scoreChart?.[1],
        backgroundColor: generateRandomColors(1),
      }
    ]
  }
  
  const perDaycolor = generateRandomColors(1)[0];
  const perDayBg = perDaycolor.slice(0,perDaycolor.length-1) + ", 0.5)";
  const perDayChartData = {
    labels : anlyticalData?.perDayChart?.map((perday) => {
      let temp = perday[0].split("-");
      let part1 = temp[0] + "-" + temp[1] + "-";
      let part2 = temp[2].split("");
      part1 += part2[2]+part2[3];
      return part1;
    }),
    datasets:[
      {
        label: "Students",
        data: anlyticalData?.perDayChart?.map((perday) => perday[1]),
        fill: true,
        backgroundColor: perDayBg,
        borderColor: perDaycolor,
        elements:{
          line:{tension:0.4}
        }
      }
    ],
  }

//  bg-gradient-to-tr from-blue-600 via-purple-600 to-pink-500 to-60%

  useEffect(()=>{
    fetchAnalyseData();
    // eslint-disable-next-line
  },[location.pathname]);

  return (
    <div className='w-full h-full'>
      {
        loading ? <Loader/> :
        <div className='bg-gray-200 p-2 flex flex-col gap-5'>
          <div className='flex flex-col sm:flex-row gap-5 w-full justify-between h-full sm:h-96'>
            <div className='flex flex-col justify-between gap-4 text-white bg-gray-50 shadow-md rounded-sm px-2 py-3 w-full sm:w-1/2 lg:min-w-[23%]'>
              <div className='flex flex-col justify-center h-24 px-3 my-auto py-2 rounded-sm bg-gradient-to-tl text-start from-red-500 to-red-400 shadow-sm shadow-gray-600 '><span className='text-xl font-semibold'>{anlyticalData?.totalStudent} Students</span> <p>Total Students</p></div>
              <div className='flex flex-col justify-center h-24 px-3 my-auto py-2 rounded-sm bg-gradient-to-tl text-start from-purple-600 to-purple-500 shadow-sm shadow-gray-600 '><span className='text-xl font-semibold'>{anlyticalData?.totalTimeSpend || 0} Minutes</span> <p>Total Time Spend</p></div>
              <div className='flex flex-col justify-center h-24 px-3 my-auto py-2 rounded-sm bg-gradient-to-tl text-start from-orange-500 to-orange-400 shadow-sm shadow-gray-600 '><span className='text-xl font-semibold'>{anlyticalData?.todayStudents || 0} Students</span> <p>Today Students</p></div>
            </div>

            {/* gender chart */}
            <div className='w-full mx-auto sm:w-1/2 lg:min-w-[21rem] bg-gray-50 shadow-md py-3 px-5 rounded-sm'>
              {/* <Bar options={{maintainAspectRatio:false}} data={genderBarData}></Bar> */}
              <div className='flex gap-1 flex-wrap justify-center xs:justify-between mb-5'>
                <p className='text-lg min-w-max font-semibold text-purple-900'>Gender Ratio</p>
                <div className='flex min-w-max gap-2'>
                  <button onClick={() => {isGenderBar === true && setIsGenderBar(false)}} className={`bg-fuchsia-400 hover:bg-fuchsia-500 duration-300 text-white px-2 rounded-sm`}>Pie Chart</button>
                  <button onClick={() => {isGenderBar === false && setIsGenderBar(true)}} className='bg-purple-400 hover:bg-purple-500 duration-300 text-white px-2 rounded-sm'>Bar Chart</button>
                </div>
              </div>
              <div className='h-[18rem] flex justify-center pb-3'>{
                isGenderBar ? <Bar options={{maintainAspectRatio:false}} data={genderBarData}/> : <Doughnut data={genderData}></Doughnut>
              }</div>
            </div>

            {/* Score chart */}
            <div className='min-w-[calc(100%-44rem)] hidden lg:block bg-gray-50 shadow-md pl-5 pr-3 mx-auto rounded-sm'>
            <p className='my-2 text-lg font-semibold text-gray-700'>Student and Score Relation</p>
            <div className='h-[85%]'><Bar data={scoreData} options={{maintainAspectRatio:false}}></Bar></div>
            </div>

          </div>

          <div className='w-[100%] lg:hidden bg-gray-50 shadow-md pl-5 pr-3 mx-auto rounded-sm'>
            <p className='my-2 text-lg font-semibold text-gray-700'>Student and Score Relation</p>
            <div className='h-[18rem] sm:h-[20rem] md:h-[24rem]'><Bar data={scoreData} options={{maintainAspectRatio:false}}></Bar></div>
          </div>

          {/* middle div */}
          { <div className='bg-gray-50 shadow-md py-3 px-5 gap-5 rounded-sm flex flex-col md:flex-row items-center'>
              <div className='flex-1 w-full md:w-auto p-2 flex gap-5 items-center text-start md:border-r-4 border-b-4 md:border-b-0 rounded-sm'><BsPatchQuestion className='bg-purple-600 text-white p-1 rounded-full' fontSize={40}/><span className='text-xl font-semibold'><p className='text-gray-400 text-base'>Quiz Name</p>{anlyticalData?.quizName}</span></div>

              <div className='flex-1 w-full md:w-auto p-2 flex gap-5 items-center text-start md:border-r-4 border-b-4 md:border-b-0 rounded-sm'><MdOutlineTimer className='bg-orange-500 text-white p-2 rounded-full' fontSize={40}/><span className='text-xl font-semibold'><p className='text-gray-400 text-base'>Average time</p>{anlyticalData?.averageTime || 0} Minutes</span> </div>

              <div className='flex-1 w-full md:w-auto p-2 flex gap-5 items-center text-start rounded-sm'><MdOutlineWorkspacePremium className='bg-yellow-400 text-white p-1 rounded-full' fontSize={40}/><span className='text-xl font-semibold'><p className='text-gray-400 text-base'>Average Score</p>{anlyticalData?.averageScore || 0} Points</span></div>
            </div>}

            {/* bottom Div */}
            <div className='flex flex-col-reverse lg:flex-row gap-5 mb-5 w-full justify-between'>
              <div className='bg-gray-50 w-full lg:min-w-[25rem] lg:max-w-[25rem] shadow-md py-6 px-2 md:px-8 gap-6 rounded-sm flex flex-col sm:flex-row items-center lg:flex-col justify-between'>
                <img className='w-11/12 sm:w-[45%] lg:w-11/12' src={winner} alt="winner"/>
                <div className=' flex w-full flex-col px-2 gap-6 items-center'>
                  <p className='text-purple-600 flex mx-auto gap-1 text-xl font-semibold'>Top <span className='text-2xl flex items-center justify-center p-1 h-7 w-7 rounded-full text-white bg-purple-600'>3</span> Participants</p>
                  <div className='flex text-white flex-col items-start w-full gap-2'>{
                    anlyticalData?.topThree?.map((student,indx) => (
                    <div key={indx} className='flex w-full flex-col gap-3'>
                      <div className={`flex items-center w-full gap-4 px-4 py-2 rounded-sm ${indx === 0 ? "bg-fuchsia-500" : indx === 1 ? "bg-fuchsia-400" : "bg-fuchsia-300"}`}>
                        
                        <p className='flex'>{indx === 0 ? <TbHexagonNumber1 fontSize={30}/> : indx === 1 ? <TbHexagonNumber2 fontSize={30}/> : <TbHexagonNumber3 fontSize={30}/>}</p>

                        <img src={`${student?.image}`} alt='names' className='w-7 rounded-sm h-7'/>

                        <div className='flex w-full text-lg font-semibold justify-between'>
                          <p>{student?.studentName || "Vishal Kumar"}</p>
                          <p>{student?.score}</p>
                        </div>
                      </div>
                    </div>))
                  }</div>
                  {anlyticalData?.totalStudent === 0 && <div className='mb-5 text-xl font-semibold text-red-600'>No Student attempt Quiz</div>}
                  <button onClick={() => navigate(`/leaderBoard/quiz/${quizId}/page/1`)} className='px-5 py-[6px] rounded-sm bg-purple-500 text-white text-lg font-semibold hover:bg-purple-600 duration-300'>Go To LeaderBoard</button>
                </div>
              </div>

              <div className='w-full lg:w-[calc(100%-25rem)]'>
                <div className='w-full sm:py-5 bg-gray-50 pl-2 sm:pl-5 sm:pr-3 mx-auto rounded-sm h-[20rem] sm:h-[24rem] md:h-[32rem] lg:h-[36rem] pb-20 sm:pb-14'>
                  <div className='mb-3'>
                  <p className='text-lg sm:text-xl font-semibold text-gray-700'>How many students attempt Quiz per Day</p>
                  </div>
                  <Line data={perDayChartData} options={{scales: {y:{beginAtZero:true}},maintainAspectRatio:false}} />
                </div>
              </div>
            </div>
        </div>
      }
    </div>
  )
}
