import { toast } from "react-toastify";
import {apiConnector} from "../apiConnector" 
import {quizEndpoints} from "../apis"
import {questionEndpoints} from "../apis"
import { setLoading, setViewQuiz } from "../../slice/viewQuizSlice";
import { setEditMode, setQuiz, setStep,setEditQuesMode,setQues, setEditQuizLoading, setViewMode } from "../../slice/quizSlice";
import { setQuizPlatformLoading } from "../../slice/quizPlatformSlice";


// MAKE QUIZ API
export const makeQuiz = (data,token,allQuiz)=>{
    return async(dispatch)=>{
        const toastId = toast.loading("Loading");
        //dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST",quizEndpoints.MAKE_QUIZ,data,{Authorization: `bearer ${token}`});

            // console.log("MAKEQUIZ API RESPONSE............", response);

          if(! response.data.success){
              throw new Error(response.data.message);
          }

          dispatch(setViewQuiz([...allQuiz,response?.data?.quiz]))
          dispatch(setQuiz(response.data.quiz));
          dispatch(setEditMode(true));
          dispatch(setStep(2));
          toast.success("Quiz Created Sucessful");
          //cancelEditMode();

        } catch (error) {
            // console.log("MAKEQUIZ API ERROR............", error);
            toast.error(error.response.data.message);
        }
        //dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

// UPDATE QUIZ API
export const updateQuiz = (data,token)=>{
    return async(dispatch)=>{
        const toastId = toast.loading("Loading");
        dispatch(setEditQuizLoading(true));
        try {
            const response = await apiConnector("POST",quizEndpoints.UPDATE_QUIZ,data,{Authorization: `bearer ${token}`});

            // console.log("UPDATE QUIZ API RESPONSE............", response);

          if(! response.data.success){
              throw new Error(response.data.message);
          }

          dispatch(setQuiz(response.data.quiz));
          dispatch(setEditMode(true));
          toast.success("Quiz Updated Sucessful");

        } catch (error) {
            // console.log("UPDATE QUIZ API ERROR............", error);
            toast.error(error.response.data.message);
        }
        dispatch(setEditQuizLoading(false));
        toast.dismiss(toastId);
    }
}

// PUBLISH QUIZ API
export const publishQuiz = (data,token)=>{
    return async(dispatch)=>{
        const toastId = toast.loading("Loading");
        dispatch(setEditQuizLoading(true));
        try {
            const response = await apiConnector("POST",quizEndpoints.PUBLISH_QUIZ,data,{Authorization: `bearer ${token}`});

            // console.log("PUBLISH QUIZ API RESPONSE............", response);

          if(! response.data.success){
              throw new Error(response.data.message);
          }

          dispatch(setQuiz(response.data.quiz));
          dispatch(setEditMode(true));
          toast.success("Quiz Publish Sucessful");

        } catch (error) {
            // console.log("PUBLISH QUIZ API ERROR............", error);
            toast.error(error.response.data.message);
        }
        dispatch(setEditQuizLoading(false));
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

            // console.log("DELETE QUIZ API RESPONSE............", response);

          if(! response.data.success){
              throw new Error(response.data.message);
          }

          dispatch(setViewQuiz(response.data.quiz));
          toast.success("Quiz Deleted Sucessful");

        } catch (error) {
            // console.log("DELETE QUIZ API ERROR............", error);
            toast.error(error.response.data.message);
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

            // console.log("FETCH ALL QUIZ API RESPONSE............", response);

          if(! response.data.success){
              throw new Error(response.data.message);
          }

          dispatch(setViewQuiz(response.data.quizes));
          //toast.success(response.data.message);
          //toast.success("Quiz fetched Sucessful");
          
        } catch (error) {
            // console.log("Fetch All QUIZ API ERROR............", error);
            toast.error(error.response.data.message);
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}


// FETCH ONE QUIZ API
export const fetchOneQuiz = (data,navigate,isViewMode)=>{
    return async(dispatch)=>{
        const toastId = toast.loading("Loading");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST",quizEndpoints.FETCH_ONE_QUIZ,data);

            // console.log("FETCH ONE QUIZ API RESPONSE............", response);

          if(! response.data.success){
              throw new Error(response.data.message);
          }

          dispatch(setQuiz(response.data.quiz));
          if(isViewMode){
              dispatch(setEditMode(false));
              dispatch(setViewMode(true));
            }
          else{
            dispatch(setViewMode(false));
            dispatch(setEditMode(true));
          }
          navigate("/dashboard/makeQuiz")
          toast.success(response.data.message);

        } catch (error) {
            // console.log("FETCH ONE QUIZ API ERROR............", error);
            toast.error(error.response.data.message);
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

// FETCH QUIZES API
export const fetchQuizes = async(token,pageNo)=>{
    
    const toastId = toast.loading("Loading");
    let result = [[],[]];
    try {
        const response = await apiConnector("POST",quizEndpoints.FETCH_QUIZES,{pageNo:pageNo},{Authorization: `bearer ${token}`});

        // console.log("FETCH QUIZES API RESPONSE............", response);

        if(! response.data.success){
            throw new Error(response.data.message);
        }
        else{
            result[0] = (response.data.quiz);
            result[1] = (response.data.totalPages);
        }
    } catch (error) {
        // console.log("FETCH QUIZES API ERROR............", error);
        toast.error(error.response.data.message);
    }
    
    toast.dismiss(toastId);
    return result;
}

// FETCH ATTEMPT QUIZ API
export const fetchAttemptQuiz = async(data,token) => {
    const toastId = toast.loading("Loading");
    let result = null;
    try {
        const response = await apiConnector("POST",quizEndpoints.FETCH_ATTEMPT_QUIZ,data,{Authorization: `bearer ${token}`});

        // console.log("FETCH ATTEMPT QUIZES API RESPONSE............", response);

        if(! response.data.success){
            throw new Error(response.data.message);
        }
        else{
            result = (response.data.quiz);
        }
    } catch (error) {
        // console.log("FETCH ATTEMPT QUIZES API ERROR............", error);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
    return result;
}

// CREATE QUESTION API
export const addQuestion = (data,navigate)=>{
    return async(dispatch)=>{
        const toastId = toast.loading("Loading");
        //dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST",questionEndpoints.ADD_QUES,data);

            // console.log("ADD QUES API RESPONSE............", response);

          if(! response.data.success){
              throw new Error(response.data.message);
          }

          dispatch(setQuiz(response.data.quiz));
          dispatch(setEditMode(true));
          dispatch(setStep(1));
          toast.success("Question added Sucessful");
          navigate("/dashboard/makeQuiz");
        } catch (error) {
            // console.log("ADD QUES API ERROR............", error);
            toast.error(error.response.data.message);
        }
        toast.dismiss(toastId);
    }
}

// REMOVE QUESTION API
export const removeQuestion = (data)=>{
    return async(dispatch)=>{
        const toastId = toast.loading("Loading");
        try {
            const response = await apiConnector("POST",questionEndpoints.REMOVE_QUES,data);

            // console.log("REMOVE QUES API RESPONSE............", response);

          if(! response.data.success){
              throw new Error(response.data.message);
          }

          dispatch(setQuiz(response.data.quiz));
          dispatch(setEditMode(true));
          dispatch(setStep(1));
          toast.success("Question removed Sucessful");
          
        } catch (error) {
            // console.log("REMOVE QUES API ERROR............", error);
            toast.error(error.response.data.message);
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

            // console.log("EDIT QUES API RESPONSE............", response);

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
            // console.log("EDIT QUES API ERROR............", error);
            toast.error(error.response.data.message);
        }
        //dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

// SUBMIT QUIZ API
export const submitQuiz = async(data,dispatch) => {
    const toastId = toast.loading("Loading");
    dispatch(setQuizPlatformLoading(true));
    try {
        const response = await apiConnector("POST",quizEndpoints.SUBMIT_QUIZ,data);

        // console.log("SUBMIT QUIZES API RESPONSE............", response);

        if(! response.data.success){
            throw new Error(response.data.message);
        }
        toast.success("Quiz Submitted!")
    } catch (error) {
        // console.log("SUBMIT QUIZES API ERROR............", error);
        toast.error(error.response.data.message);
    }
    dispatch(setQuizPlatformLoading(false));
    toast.dismiss(toastId);
}

// ANALYSE QUIZ
export const quizAnalytics = async(data,token) => {
    const toastId = toast.loading("Loading");
    let result = null;
    try {
        const response = await apiConnector("POST",quizEndpoints.ANALYSE_QUIZ,data,{Authorization: `bearer ${token}`});

        // console.log("ANALYSE QUIZ API RESPONSE............", response);

        if(! response.data.success){
            throw new Error(response.data.message);
        }
        else{
            result = (response.data);
        }
    } catch (error) {
        // console.log("ANALYSE QUIZ API ERROR............", error);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
    return result;
}

// LEADERBOARD QUIZ
export const leaderBoardQuiz = async(data) => {
    const toastId = toast.loading("Loading");
    let result = null;
    try {
        const response = await apiConnector("POST",quizEndpoints.QUIZ_LEADERBOARD,data);

        // console.log("LEADERBOARD QUIZ API RESPONSE............", response);

        if(! response.data.success){
            throw new Error(response.data.message);
        }
        else{
            result = (response.data);
        }
    } catch (error) {
        // console.log("LEADERBOARD QUIZ API ERROR............", error);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
    return result;
}