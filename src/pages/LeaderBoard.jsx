import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'

export const LeaderBoard = () => {

  const location = useLocation();
  const {quizId} = useParams();
  const [leaderBoardData, setLeaderBoardData] = useState(null);

  useEffect(()=>{

  },[location.pathname])
  return (
    <div>

    </div>
  )
}
