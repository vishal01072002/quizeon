import { toast } from "react-toastify";
import {apiConnector} from "../apiConnector" 
import {quizEndpoints} from "../apis"
import {questionEndpoints} from "../apis"
import { setLoading, setViewQuiz } from "../../slice/viewQuizSlice";
import { setEditMode, setQuiz, setStep,setEditQuesMode,setQues } from "../../slice/quizSlice";


// MAKE QUIZ API
export const makeQuiz = (data,token)=>{
    return async(dispatch)=>{
        const toastId = toast.loading("Loading");
        //dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST",quizEndpoints.MAKE_QUIZ,data,{Authorization: `bearer ${token}`});

            console.log("MAKEQUIZ API RESPONSE............", response);

          if(! response.data.success){
              throw new Error(response.data.message);
          }

          dispatch(setQuiz(response.data.quiz));
          dispatch(setEditMode(true));
          dispatch(setStep(2));
          toast.success("Quiz Created Sucessful");
          //cancelEditMode();

        } catch (error) {
            console.log("MAKEQUIZ API ERROR............", error);
            toast.error("Make Quiz Error");
            console.log(error);
        }
        //dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

// UPDATE QUIZ API
export const updateQuiz = (data,token)=>{
    return async(dispatch)=>{
        const toastId = toast.loading("Loading");
        //dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST",quizEndpoints.UPDATE_QUIZ,data,{Authorization: `bearer ${token}`});

            console.log("UPDATE QUIZ API RESPONSE............", response);

          if(! response.data.success){
              throw new Error(response.data.message);
          }

          dispatch(setQuiz(response.data.quiz));
          dispatch(setEditMode(true));
          toast.success("Quiz Updated Sucessful");
          //cancelEditMode();

        } catch (error) {
            console.log("UPDATE QUIZ API ERROR............", error);
            toast.error("Update Quiz Error");
            console.log(error);
        }
        //dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

// DELETE QUIZ API
export const deleteQuiz = (data,token)=>{
    return async(dispatch)=>{
        const toastId = toast.loading("Loading");
        //dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST",quizEndpoints.DELETE_QUIZ,data,{Authorization: `bearer ${token}`});

            console.log("DELETE QUIZ API RESPONSE............", response);

          if(! response.data.success){
              throw new Error(response.data.message);
          }

          dispatch(setViewQuiz(response.data.quiz));
          toast.success("Quiz Deleted Sucessful");
          //cancelEditMode();

        } catch (error) {
            console.log("DELETE QUIZ API ERROR............", error);
            toast.error("Delete Quiz Error");
            console.log(error);
        }
        //dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

// FETCH ALL QUIZ API
export const fetchAllQuiz = (token)=>{
    return async(dispatch)=>{
        const toastId = toast.loading("Loading");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST",quizEndpoints.FETCH_ALL_QUIZ,null,{Authorization: `bearer ${token}`});

            console.log("FETCH ALL QUIZ API RESPONSE............", response);

          if(! response.data.success){
              throw new Error(response.data.message);
          }

          dispatch(setViewQuiz(response.data.quizes));
          //toast.success(response.data.message);
          //toast.success("Quiz fetched Sucessful");
          
        } catch (error) {
            console.log("Fetch All QUIZ API ERROR............", error);
            //toast.error("Fetch All Quiz Error");
            //console.log(error);
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}


// FETCH ONE QUIZ API
export const fetchOneQuiz = (data,navigate)=>{
    return async(dispatch)=>{
        const toastId = toast.loading("Loading");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST",quizEndpoints.FETCH_ONE_QUIZ,data);

            console.log("FETCH ONE QUIZ API RESPONSE............", response);

          if(! response.data.success){
              throw new Error(response.data.message);
          }

          dispatch(setQuiz(response.data.quiz));
          dispatch(setEditMode(true));
          navigate("/makeQuiz")
          toast.success(response.data.message);

        } catch (error) {
            console.log("FETCH ONE QUIZ API ERROR............", error);
            toast.error("Fetch Quiz Error");
            console.log(error);
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}



// CREATE QUESTION API
export const addQuestion = (data,navigate)=>{
    return async(dispatch)=>{
        const toastId = toast.loading("Loading");
        //dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST",questionEndpoints.ADD_QUES,data);

            console.log("ADD QUES API RESPONSE............", response);

          if(! response.data.success){
              throw new Error(response.data.message);
          }

          dispatch(setQuiz(response.data.quiz));
          dispatch(setEditMode(true));
          dispatch(setStep(1));
          toast.success("Question added Sucessful");
          navigate("/makeQuiz");
        } catch (error) {
            console.log("ADD QUES API ERROR............", error);
            toast.error("Add Ques Error");
            console.log(error);
        }
        //dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

// REMOVE QUESTION API
export const removeQuestion = (data)=>{
    return async(dispatch)=>{
        const toastId = toast.loading("Loading");
        //dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST",questionEndpoints.REMOVE_QUES,data);

            console.log("REMOVE QUES API RESPONSE............", response);

          if(! response.data.success){
              throw new Error(response.data.message);
          }

          dispatch(setQuiz(response.data.quiz));
          dispatch(setEditMode(true));
          dispatch(setStep(1));
          toast.success("Question removed Sucessful");
          
        } catch (error) {
            console.log("REMOVE QUES API ERROR............", error);
            toast.error("Remove Ques Error");
            console.log(error);
        }
        //dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

// EDIT QUESTION API
export const editQuestion = (data)=>{
    return async(dispatch)=>{
        const toastId = toast.loading("Loading");
        //dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST",questionEndpoints.EDIT_QUES,data);

            console.log("EDIT QUES API RESPONSE............", response);

          if(! response.data.success){
              throw new Error(response.data.message);
          }

          dispatch(setQuiz(response.data.quiz));
          dispatch(setEditMode(true));
          dispatch(setQues(null));
          dispatch(setEditQuesMode(false));
          dispatch(setStep(1));
          
          toast.success("Question Edit Sucessful");
          
        } catch (error) {
            console.log("EDIT QUES API ERROR............", error);
            toast.error("Edit Ques Error");
            console.log(error);
        }
        //dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}