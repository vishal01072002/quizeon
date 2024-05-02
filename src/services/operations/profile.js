import { toast } from "react-toastify"
import {apiConnector} from "../apiConnector"
import {profileEndpoints} from "../apis"
import { setLoading, setUser } from "../../slice/profileSlice"

// EDIT PROFILE API
export const editProfile = (data,token,cancelEditMode)=>{
    return async(dispatch)=>{
        const toastId = toast.loading("Loading");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST",profileEndpoints.EDIT_PROFILE,data,{Authorization: `bearer ${token}`});

            // console.log("EDITPROFILE API RESPONSE............", response);

          if(! response.data.success){
              throw new Error(response.data.message);
          }

          dispatch(setUser(response.data.user));
          toast.success("Profile Updated Sucessful");
          cancelEditMode();

        } catch (error) {
            // console.log("EDITPROFILE API ERROR............", error);
            toast.error(error.response.data.message);
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

// EDIT PROFILE API
export const resetPassword = (data,token,navigate)=>{
    return async(dispatch)=>{
        const toastId = toast.loading("Loading");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST",profileEndpoints.RESET_PASSWORD,data,{Authorization: `bearer ${token}`});

            // console.log("RESET PASSWORD API RESPONSE............", response);

          if(! response.data.success){
              throw new Error(response.data.message);
          }

          toast.success("Password Updated Sucessful");

        } catch (error) {
            // console.log("RESET PASSWORD API ERROR............", error);
            toast.error(error.response.data.message);
        }
        navigate("/dashboard/profile");
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

// UPLOAD PROFILE PICTURE
export const uploadProfilePicture = (formData,token,navigate)=>{
    return async(dispatch)=>{
        const toastId = toast.loading("Uploading...");
        // console.log(formData.get("profilePicture"));
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("PUT",profileEndpoints.UPLOAD_PROFILE_PICTURE,formData,
            {
                "Content-Type": "multipart/form-data",
                Authorization: `bearer ${token}`,
            });

            // console.log("UPLOAD PROFILE PICTURE API RESPONSE............", response);

          if(! response.data.success){
              throw new Error(response.data.message);
          }
          else{
              setUser(response.data.data);
              toast.success("ProfilePicture Updated Sucessful");
          }

        } catch (error) {
            // console.log("UPLOAD PROFILE PICTURE API ERROR............", error);
            toast.error(error.response.data.message);
        }
        navigate("/dashboard/profile");
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}