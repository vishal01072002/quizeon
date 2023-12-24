import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Loader} from "../../common/Loader"
import { useForm } from 'react-hook-form'
import { editProfile } from '../../../services/operations/profile'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

const dummy = {
    firstName:"Vishal",
    lastName:"Prajapati",
    email:"vishalbavakumar0000@gmail.com",
    about:"I am vishal ,currently doing web development (MERN Stack) from codehelp teach us by Love Babbar",
    gender:"Male",
    number:"6969696969",
    dateOfBirth:"01/04/2003"
}

// profile , full name , email
// about
// 
export const Profile = () => {
    // featch user info from slice
    const {user,loading} = useSelector((state) => state.profile);
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    // console.log(user);

    const [editMode, setEditMode] = useState(false);
    const {
      register,
      setValue,
      handleSubmit,
      formState : {errors},
    } = useForm();

    // personal detail form handler
    const editProfileHandler = (data)=> {
      
      console.log(displayData);
      if(!editMode){
        openEditMode();
        return;
      }
      
      console.log(data);
        // make edit call whwn some change occur
        if(changeHappen(data)){
          dispatch(editProfile(data,token,cancelEditMode));
        }
        else{
          toast.error("No Changes Happen");
        }
    }

    const displayData = {...user.additionalDetail, 
        firstName:user.firstName,
        lastName:user.lastName, 
        image:user.image, 
        email:user.email
    };

    // close edit mode
    function cancelEditMode(){
      setEditMode(false);
      setValue("about",null);
      setValue("gender",null);
      setValue("number",null);
      setValue("dateOfBirth",null);
    }

    // open edit mode
    function openEditMode(){
      setValue("about",displayData?.about);
      setValue("gender",displayData?.gender);
      setValue("number",displayData?.number);
      setValue("dateOfBirth",(displayData?.dateOfBirth).split("T")[0]);
      setEditMode(true);
    }

    function changeHappen(data) {
      if(data.about != displayData.about){
        return true;
      }
      else if(data.gender != displayData.gender){
        return true;
      }
      else if(data.number != displayData.number){
        return true;
      }
      else if((data.dateOfBirth).split("T")[0] != (displayData.dateOfBirth).split("T")[0]){
        return true;
      }
      else{
        return false;
      }
    }
    // for check is value is null or valid value 
    function checkValid(value){
      if(value){
        return value;
      }
      else{
        return "Complete Profile";
      }
    }

  return (
    <div className={`w-full relative h-full font-ubuntu bg-[#F8F9FE] ${loading ? "py-0": "py-4"} `}>
        {
            loading && <Loader/>
        }
        <h1 className='w-11/12 max-w-[1200px] mx-auto text-3xl font-medium text-left'>Dashboard/Profile</h1>
        <div className='flex justify-between w-11/12 gap-6 mt-10 items-start max-w-[1200px] mx-auto'>
            {/* left sections */}
            <div className='flex flex-col w-[30%] gap-5 items-center px-6 py-8 text-lg font-medium border-purple-200 bg-white rounded-md shadow-gray-300 shadow-xl'>
                <div>
                    <div className='w-[200px] h-[200px] bg-gray-500 rounded-md'>
                        <img alt='profile' className='rounded-lg' src={displayData.image}/>
                    </div>
                    <button className='mt-3 rounded-md bg-blue-100 px-3 py-1'>Change Profile</button>
                </div>
                <Link to={"/dashboard/myquiz"}>My Quiz</Link>
                <div className='flex gap-2 mt-4 text-2xl font-medium'>
                    <p className=''>{displayData.firstName}</p>
                    <p>{displayData.lastName}</p>
                </div>

                <div className='-mt-4'>
                    <p>{displayData.email}</p>
                </div>
            </div>

            {/* right sections */}
            <div className='w-[60%] flex-col text-lg px-6 py-2 mx-auto'>

                {/* additional information */}
                <form onSubmit={handleSubmit(editProfileHandler)} className='flex flex-col mb-8 py-4 bg-white rounded-md px-4 pr-10 gap-2 shadow-lg'>
                    <h3 className='text-left mb-4 text-xl font-medium'>Personal Information</h3>
                    <div className='flex items-start gap-7'>
                        <p className='w-[130px] font-normal text-left mt-0'>About</p>

                        {
                          !editMode ? <p className="p-1 mb-1 px-4 rounded-md w-[calc(100%-155px)] text-left shadow shadow-gray-400">{checkValid(displayData?.about)}</p> : 
                        
                        
                        <input
                        type="text"
                        name="about"
                        id="about"
                        disabled={!editMode}
                        placeholder="Enter Bio Details"
                        className={`${editMode && "border-2 border-[#AAB1E9] focus:bg-[#f1f4ff]"} outline-none  text-gray-700 rounded-md p-1 px-4 text-left w-[calc(100%-155px)]`}
                        {...register("about")}
                        
                      />
                      }
                    </div>

                    <div className='flex items-center gap-7'>
                        <p className='w-[130px] font-normal text-left'>Gender</p>

                        {
                          !editMode ? <p className="p-1 mb-1 px-4 rounded-md w-[calc(100%-155px)] text-left shadow shadow-gray-400">{checkValid(displayData?.gender)}</p> : 
                        
                        <select
                            type="text"
                            name="gender"
                            id="gender"
                            disabled={!editMode}
                            className={`${editMode && "border-2 border-[#AAB1E9] focus:bg-[#f5f7ff]"} outline-none bg-[#fbfbfc] text-gray-700 rounded-md p-1 px-4  text-left w-[calc(100%-155px)] ${!editMode && "appearance-none"}`}
                            {...register("gender")}
                            
                            > 
                            <option value="" disabled className='bg-[#fbfbfc] text-gray-700'>
                              Choose a Category
                            </option>
                            <option  value="Male" className='bg-[#fbfbfc] text-gray-700'>
                             Male
                            </option>
                            <option  value="Female" className='bg-[#fbfbfc] text-gray-700'>
                             Female
                            </option>
                        </select>
                        }
                    </div>

                    <div className='relative flex max-w-full items-center gap-7'>
                        <p className='w-[130px] font-normal text-left'>Mobile Number</p>

                        {
                          !editMode ? <p className="p-1 mb-1 px-4 rounded-md w-[calc(100%-155px)] text-left shadow shadow-gray-400">{checkValid(displayData?.number)}</p> : 
                        
                        <>
                        <input
                            type="number"
                            name="number"
                            id="number"
                            placeholder="Enter mobile number"
                            disabled={!editMode}
                            className={`${editMode && "border-2 border-[#AAB1E9] focus:bg-[#f5f7ff]"} outline-none bg-[#fbfbfc] text-gray-700 rounded-md p-1 px-4 appearance-remove text-left min-w-[calc(100%-155px)]`}
                            {...register("number", {
                              maxLength: { value: 12, message: "Invalid Contact Number" },
                              minLength: { value: 10, message: "Invalid Contact Number" },
                            })}
                            
                          />
                          {errors.number && (
                            <span className="-mt-1 text-[13px] font-medium absolute right-[1%] top-1/4 text-purple-500">
                              {errors.number.message}
                            </span>
                          )} </>
                        }
                    </div>
                    <div className='relative flex items-center gap-7'>
                        <p className='w-[130px] font-normal text-left'>Date of Birth</p>

                        {
                          !editMode ? <p className="p-1 mb-1 px-4 rounded-md w-[calc(100%-155px)] text-left shadow shadow-gray-400">{checkValid(displayData?.dateOfBirth).split("T")[0]}</p> : 
                        <>
                        <input
                            type="date"
                            name="dateOfBirth"
                            id="dateOfBirth"
                            placeholder="Enter Date of Birth"
                            disabled={!editMode}
                            className={`${editMode && "border-2 border-[#AAB1E9] focus:bg-[#f5f7ff]"} outline-none bg-[#fbfbfc] text-gray-700 rounded-md p-1 px-4 appearance-remove text-left w-[calc(100%-155px)]`}
                            {...register("dateOfBirth", {
                              max: {
                                value: new Date().toISOString().split("T")[0],
                                message: "Date cannot be in the future",
                              },
                            })}
                            
                          />
                          {errors.dateOfBirth && (
                            <span className="-mt-1 text-[13px] font-medium absolute right-[6%] top-1/4 text-purple-500">
                              {errors.dateOfBirth.message}
                            </span>
                          )} </>
                        }
                    </div>

                    <div className='flex items-start gap-5'>
                        <button type='submit' className='text-left bg-blue-400 my-2 px-2 rounded-md text-lg py-[3px] font-medium w-max hover:bg-blue-500 text-white duration-200'>{editMode ? "Save Changes": "Edit Profile"}</button>

                        {
                            editMode && <button onClick={()=>cancelEditMode()} className='text-left bg-yellow-400 my-2 px-2 rounded-md border-orange-300 text-lg py-[1px] font-medium border-2 w-max text-white duration-200'>Cancel</button>
                        }
                    </div>
                </form>

                {/* reset password */}
                <div className='py-3 px-4 flex items-center gap-12 bg-white rounded-md shadow-xl'>
                    <h3 className='text-left text-xl font-medium'>Reset Your Password</h3>
                    <div className='flex  items-center gap-7'> 
                        <Link to={"/resetpassword"} className='text-left bg-yellow-300 px-1 rounded-sm py-[0.5px] font-ubuntu font-medium'>Click Here</Link>
                    </div>
                </div>

                {/* forgot password */}
                <div>

                </div>
            </div>
        </div>  
    </div>
  )
}
