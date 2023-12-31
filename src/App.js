import './App.css';
import { Route,Routes, useLocation } from 'react-router-dom';
import {Home} from './pages/Home'
import {Home} from './pages/Yoho'
import {Login} from './pages/Login'
import {Signup} from './pages/Signup'
import {OtpVerify} from './pages/OtpVerify'
import { Navbar } from './pages/Navbar';

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

function App() {

  const user = useSelector((state) => state.auth);
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
  },[location.pathname])
  return (
    <div className="App ">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/yoho' element={<Yoho/>}/>
        <Route path='/otpverify' element={<OtpVerify/>}/>
        <Route path='/login' element={<OpenRoute><Login/></OpenRoute>}/>
        <Route path='/signup' element={<OpenRoute><Signup/></OpenRoute>}/>
        <Route path='/forgotPassword' element={<OpenRoute><ForgotPassword/></OpenRoute>}/>
        
        <Route path='/updatepassword/:userToken' element={<OpenRoute><UpdatePassword/></OpenRoute>}/>


        {user && (<Route path='/MakeQuiz' element={<PrivateRoute><MakeQuizStep/></PrivateRoute>} />)}
        
        <Route element={<PrivateRoute><Dashboard/></PrivateRoute>}>
          <Route path='/dashboard/profile' element={<Profile/>}/>
          <Route path='/dashboard/myQuiz' element={<MyQuiz/>}/>
        </Route>
        <Route path='/error' element={<Error/>}/>
        <Route path='/loading' element={<Loader/>}/>
        <Route path='*' element={<Error/>}/>


        {/* {user && user.accountType && (<div></div>)} */}



        <Route path='/resetpassword' element={<PrivateRoute><ResetPassword/></PrivateRoute>} />
      </Routes>
    </div>
  );
}

export default App;
