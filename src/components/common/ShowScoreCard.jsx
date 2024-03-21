import React, { memo, useState } from 'react'
import { Chart, registerables} from "chart.js"
import { Bar, Doughnut } from "react-chartjs-2"
import { IoClose} from "react-icons/io5"
import { MdBarChart, MdOutlineTimer } from 'react-icons/md';
import { FaAward } from 'react-icons/fa';

Chart.register(...registerables);
export const ShowScoreCard = memo(({scoreData, closeCard}) => {

  const [isBar, setIsBar] = useState(false);

  const scoreBarData = {
    labels : ["score"],
    datasets:[
      {
        label : "Correct",
        data: [scoreData?.correct],
        backgroundColor: "#49fa25",
        barPercentage : 0.5,
      },
      {
        label : "Wrong",
        data: [scoreData?.wrong],
        backgroundColor: "#ff2424",
        barPercentage : 0.5,
      },
      {
        label : "Un-Attempt",
        data: [scoreData?.unAttempted],
        backgroundColor: "#25a5fa",
        barPercentage : 0.5,
      }
    ],
  }

  const scorePieData = {
    labels : ["Correct", "Wrong", "Un-Attempt"],
    datasets:[
      {
        data: [scoreData?.correct, scoreData?.wrong, scoreData?.unAttempted],
        backgroundColor: ["#49fa25", "#ff2424", "#25a5fa"],
      }
    ]
  }

  return (
    <div className='absolute inset-0 bg-gray-800 backdrop-blur-sm bg-opacity-20 flex items-center justify-center'>
      <div className='bg-[#ededed] text-black p-5 pb-7 rounded-md'>
        <div className='h-[300px] w-[320px] '>
          <div className='flex justify-between mb-5'>
            <button onClick={() => {isBar === true && setIsBar(false)}} className={`bg-fuchsia-500 hover:bg-fuchsia-600 duration-300 text-white px-4 rounded-sm`}>Pie Chart</button>
            <button onClick={() => {isBar === false && setIsBar(true)}} className='bg-purple-500 hover:bg-purple-600 duration-300 text-white px-4 rounded-sm'>Bar Chart</button>
            <button className='bg-red-500 hover:bg-red-600 duration-200 p-1 text-white rounded-sm' onClick={() => closeCard(null)}><IoClose fontSize={20}/></button>
            </div>
            <div className='h-[80%]'>{
              isBar ? <Bar options={{maintainAspectRatio:false}} data={scoreBarData}/> : <Doughnut data={scorePieData} options={{maintainAspectRatio:false}}></Doughnut>
            }</div>
          </div>
          <div className='flex items-center mt-5'>
            <div className='flex-1 flex items-center justify-center gap-2 text-lg font-semibold bg-white px-2 py-4 rounded-tl-2xl border-r-2 hover:scale-105 duration-300 text-orange-600'>
              <MdOutlineTimer fontSize={22}/> <p>{scoreData?.completedTime.split(",").join(":")} min</p>
            </div>
            <div className='flex items-center justify-center gap-2 text-lg font-semibold flex-1 bg-white px-2 py-4 border-l-2 rounded-tr-2xl hover:scale-105 duration-300 text-blue-600'>
              <MdBarChart fontSize={22}/><p>{scoreData?.score} Score</p>
            </div>
          </div>
          <div className='flex items-center justify-center gap-2 text-lg font-semibold bg-white px-2 py-4 rounded-b-2xl border-t-4 hover:scale-105 duration-300 text-fuchsia-600'>
            <FaAward fontSize={22}/><p>{scoreData?.rank} Rank</p>
          </div>
      </div>
    </div>)
})
