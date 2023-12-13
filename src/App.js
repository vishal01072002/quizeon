import './App.css';
import { Route,Routes } from 'react-router-dom';
import {Home} from './pages/Home'
import {Login} from './pages/Login'
import {Signup} from './pages/Signup'
import {OtpVerify} from './pages/OtpVerify'
import { Navbar } from './pages/Navbar';
import { Dashboard } from './pages/Dashboard';
import { Profile } from './components/core/dashboard/Profile';
import Error from './components/common/Error';
import { Loader } from './components/common/Loader';
import { PrivateRoute } from './components/common/PrivateRoute';
import { OpenRoute } from './components/common/OpenRoute';
import { ResetPassword } from './pages/ResetPassword';
import { ForgotPassword } from './pages/ForgotPassword';
import { UpdatePassword } from './pages/UpdatePassword';
import { MakeQuiz } from './pages/MakeQuiz';
import { useSelector } from 'react-redux';

function App() {

  const user = useSelector((state) => state.auth);
  return (
    <div className="App ">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/otpverify' element={<OtpVerify/>}/>
        <Route path='/login' element={<OpenRoute><Login/></OpenRoute>}/>
        <Route path='/signup' element={<OpenRoute><Signup/></OpenRoute>}/>
        <Route path='/forgotPassword' element={<OpenRoute><ForgotPassword/></OpenRoute>}/>
        
        <Route path='/updatepassword/:userToken' element={<OpenRoute><UpdatePassword/></OpenRoute>}/>


        {user && (<Route path='/MakeQuiz' element={<PrivateRoute><MakeQuiz/></PrivateRoute>} />)}
        
        <Route element={<PrivateRoute><Dashboard/></PrivateRoute>}>
          <Route path='/dashboard/profile' element={<Profile/>}/>
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
