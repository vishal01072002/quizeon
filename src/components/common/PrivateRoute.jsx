import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
import {logOut} from "../../slice/authSlice"
import { toast } from 'react-toastify';

export const PrivateRoute = ({children}) => {

    const {token, tokenExpires} = useSelector((state)=> state.auth);
    const dispatch = useDispatch();
    
    useEffect( ()=> {
        console.log(token,tokenExpires,Date.now());
        console.log(tokenExpires - Date.now());
        if(tokenExpires - Date.now() < 0){
          //logOut
          dispatch(logOut());
          toast.success("Token Expires");
          toast.success("Logout Sucessful");
        }
    });

  return (
    <div>
        {
            (token) ? <>{children}</> : <Navigate to={"/login"}/>
        }
    </div>
  )
}
