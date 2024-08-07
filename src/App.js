import './App.css';
import { Route,Routes, useLocation } from 'react-router-dom';
import {Home} from './pages/Home'
import {Login} from './pages/Login'
import {Signup} from './pages/Signup'
import {OtpVerify} from './pages/OtpVerify'
import { Navbar } from './pages/Navbar';
import { AttemptQuiz } from './pages/AttemptQuiz';

import { Dashboard } from './pages/Dashboard';
import { Profile } from './components/core/dashboard/Profile';
import { MyQuiz } from './components/core/dashboard/quiz/MyQuiz';


import Error from './components/common/Error';
import { Loader } from './components/common/Loader';
import { PrivateRoute } from './components/common/PrivateRoute';
import { OpenRoute } from './components/common/OpenRoute';
import { ResetPassword } from './pages/ResetPassword';
import { ForgotPassword } from './pages/ForgotPassword';
import { UpdatePassword } from './pages/UpdatePassword';
import { MakeQuizStep } from './pages/MakeQuizStep';
import { useDispatch, useSelector } from 'react-redux';
import {setEditMode,setEditQuesMode,setQues,setQuiz} from "./slice/quizSlice"
import { useEffect } from 'react';
import { QuizPlatform } from './components/core/dashboard/quiz/attemptQuizPlatform/QuizPlatform';
import { QuizAnalysis } from './components/core/dashboard/instructor/QuizAnalysis';
import { LeaderBoard } from './pages/LeaderBoard';
import { fetchAllQuiz } from './services/operations/quiz';
import { checkToken } from './services/operations/auth';
import { logOut } from './slice/authSlice';

function App() {

  const {tokenExpires} = useSelector((state)=> state.auth);
  const {user} = useSelector((state) => state.profile);
  const {token} = useSelector((state)=> state.auth);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(()=>{
    const path = location.pathname.split("/").at(-1);
    if(path !== "makeQuiz"){
      dispatch(setEditMode(false));
      dispatch(setEditQuesMode(false));
      dispatch(setQues(null));
      dispatch(setQuiz(null));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[location.pathname])
  

  // authantication for token expires and fetch quizes
  const initialCall = async()=>{
    // console.log(token,tokenExpires,Date.now());
    // console.log(tokenExpires - Date.now());
    if(tokenExpires - Date.now() < 0){
      //logOut
      dispatch(logOut());
      return;
      // toast.success("Token Expires");
      // toast.success("Logout Sucessful");
    }
    if(token){
      // const result = await checkToken(token);
      // console.log(result);

      // if(result){
      dispatch(fetchAllQuiz(token));
      //}
    }
  }

  useEffect(()=>{
    initialCall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]); 

  return (
    <div className="App overflow-x-hidden">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/otpverify' element={<OtpVerify/>}/>
        <Route path='/login' element={<OpenRoute><Login/></OpenRoute>}/>
        <Route path='/signup' element={<OpenRoute><Signup/></OpenRoute>}/>
        <Route path='/forgotPassword' element={<OpenRoute><ForgotPassword/></OpenRoute>}/>
        
        <Route path='/updatepassword/:userToken' element={<OpenRoute><UpdatePassword/></OpenRoute>}/>
        
        {/* dashboard routes */}
        <Route element={<PrivateRoute><Dashboard/></PrivateRoute>}>
          <Route path='/dashboard/profile' element={<Profile/>}/>
          <Route path='/dashboard/myquiz' element={<MyQuiz/>}/>

          {/* for instructor routes */}
          {(<Route path='/dashboard/MakeQuiz' element={<PrivateRoute> {user && user.account === "Instructor" && <MakeQuizStep/>}</PrivateRoute>} />)}
          
          {/* for Students routes */}
          {(<Route path='/dashboard/AttemptQuiz/page/:pageNo' element={<PrivateRoute> {user && user.account === "Student" 
          && <AttemptQuiz/>}</PrivateRoute>} />)}

        </Route>
        
        {/* instructor analytics dashboard */}
        {user && user.account === "Instructor" && (<Route path="/analytic/:quizId" element={<PrivateRoute><QuizAnalysis/></PrivateRoute>} />)}
        
        <Route path='/leaderBoard/quiz/:quizId/page/:pageNo' element={<PrivateRoute><LeaderBoard/></PrivateRoute>} />
        <Route path='/attemptquiz/quiz/:quizId' element={<PrivateRoute><QuizPlatform/></PrivateRoute>} />

        <Route path='/error' element={<Error/>}/>
        <Route path='/loading' element={<Loader/>}/>
        <Route path='*' element={<Error/>}/>

        <Route path='/resetpassword' element={<PrivateRoute><ResetPassword/></PrivateRoute>} />
      </Routes>
    </div>
  );
}

export default App;
