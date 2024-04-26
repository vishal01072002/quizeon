import React, { useRef, useState } from 'react'
import {FiUpload} from "react-icons/fi"
import { useDispatch, useSelector } from 'react-redux';
import { uploadProfilePicture } from '../../../../services/operations/profile';
import { useNavigate } from 'react-router-dom';

export const UploadProfilePic = ({profile, altName}) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {token} = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [imgfile, setImgFile] = useState(null);
  const [preview,setPreview] = useState(null);
  const imgInput = useRef(null);

  const handleSelect = () => {
    imgInput.current.click();
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if(file){
      setImgFile(file);
      filePreviewHandler(file);
    }
  }

  const filePreviewHandler = (file)=> {
    // It is object that asynchronously read the contents of files (or raw data buffers) stored on the user's computer, using File 
    const reader = new FileReader();

    // Starts reading the contents of the specified Buffer, once finished, the result attribute contains a data: URL representing the file's data.
    reader.readAsDataURL(file);

    // Fired when a read has completed, successfully or not.
    reader.onloadend = ()=>{
      setPreview(reader.result);
    }
  }

  const handleUpload = async() => {
    setLoading(true);
      try {
        const formData = new FormData();
        formData.append("profilePicture",imgfile)
        // api call
        dispatch(uploadProfilePicture(formData,token,navigate)).then(() => {
          setLoading(false);
        });
      } catch (error) {
        console.log(error.message);
      }
    setLoading(false);
  }
  return (
    <>
      <div className='w-[200px] h-[200px] flex flex-col justify-between bg-white rounded-md'>
      <img src={preview || profile} alt={altName} className='w-[200px] h-[200px] rounded-md object-cover'/>
      </div>

      <input 
        type='file'
        className='hidden'
        accept='image/png, image/gif, image/jpeg'
        onChange={handleFileChange}
        ref={imgInput} 
      />
      <div className='flex mt-3 items-center justify-between'>
        <button 
          disabled={loading}
          className='rounded-md bg-blue-100 px-3 py-1'
          onClick={handleSelect}>
            Select
        </button>
        <button 
          disabled={loading}
          className='flex gap-2 items-center rounded-md px-3 py-1 bg-yellow-200'
          onClick={handleUpload}>
            {loading ? "Uploading..." : "Upload"}
            <FiUpload/>
        </button>
      </div>
    </>
  )
}
