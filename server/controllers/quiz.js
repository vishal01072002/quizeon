const Quiz = require("../models/Quiz");
const crypto = require("crypto");
const User = require("../models/User");

// @desc   make quiz for instructor
// route   POST /api/v1/quiz/makeQuiz/
// access  Private

exports.makeQuiz = async(req,res)=>{
    try {
        const{quizName,duration,access,category,email} = req.body;

        // validation
        if(!quizName || !duration || !access || !category ||!email){
            return res.status(400).json({
                success: false,
                message: "fill all details",
            });
        }

        const status = "Draft";

        // if private make link
        let quizLink = "";
        if(access == "Private"){
            quizLink = crypto.randomBytes(25).toString("hex");
        }

        // make entry
        const quizz = await Quiz.create({quizName,duration,category,status,access,quizLink});
        
        // update in user
        const user = await User.findOneAndUpdate({email:email},
                                                {$push:{
                                                    createdQuiz:quizz._id
                                                }},{new:true});

        if(!user){
            return res.status(500).json({
                success: false,
                message: "user not found try again",
            });
        }

        // return all quiz
        
        return res.status(200).json({
            success: true,
            message: "Quiz created successful",
            quiz: quizz,
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"internal server error in create quiz",
            error:error.message,
        });
    }
}

// @desc   update quiz for instructor
// route   POST /api/v1/quiz/updateQuiz
// access  Private
exports.updateQuiz = async(req,res)=>{
    try {
        const{quizName,duration,category,access,quizId,status} = req.body;

        // validation
        // if status is publish this cant be updated
        
        if(status === "Publish"){
            return res.status(500).json({
                success: false,
                message: "Can't Update quiz after publish",
            });
        }
        const quizz = await Quiz.findOneAndUpdate({_id:quizId},{
            quizName:quizName,
            duration:duration,
            category:category,
            access: access,
        },{new:true});

        return res.status(200).json({
            success:true,
            message:"Quiz updated sucessful",
            quiz:quizz,
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"internal server error in update quiz",
            error:error.message,
        });
    }
}


// @desc   fetch all quiz for User
// route   POST /api/v1/quiz/fetchAllQuiz
// access  Private
exports.fetchAllQuiz = async(req,res)=>{
    try {
        const userId = req.user.id;

        // find user
        const user = await User.findById({_id:userId}).populate("attemptedQuiz").populate("createdQuiz");

        if(!user){
            return res.status(500).json({
                success: false,
                message: "User Not Found",
            });
        }

        // return quizes according to user account type
        let quizes ;
        if(user.account === "Student"){
            quizes = user?.attemptedQuiz;
        }
        else{
            quizes = user?.createdQuiz;
        }

        return res.status(200).json({
            success:true,
            message:"All Quiz Fetched",
            quizes:quizes,
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"internal server error in fetching all quiz",
            error:error.message,
        });
    }
}

// @desc   fetch one quiz for edit
// route   POST /api/v1/quiz/fetchAllQuiz
// access  Private (instructor)
exports.fetchOneQuiz = async(req,res)=>{
    try {
        const {quizId} = req.body;

        // find quiz
        const quiz = await Quiz.findById({_id:quizId}).populate("questions").exec();

        if(!quiz){
            return res.status(404).json({
                success: false,
                message: "quiz Not Found",
            });
        }

        return res.status(200).json({
            success:true,
            message:"One Quiz Fetched",
            quiz:quiz,
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"internal server error in fetching one quiz",
            error:error.message,
        });
    }
}

// @desc   delete quiz from instructor
// route   POST /api/v1/quiz/deleteQuiz/
// access  Private

exports.deleteQuiz = async(req,res)=>{
    try {
        const{quizId} = req.body;
        const userId = req.user.id;

        // validation
        if(!quizId){
            return res.status(400).json({
                success: false,
                message: "fill all details",
            });
        }

        // make entry
        const quizz = await Quiz.findOne({_id:quizId});
        if(!quizz){
            return res.status(500).json({
                success: false,
                message: "Quiz not exist try again",
            });
        }
        
        // update in user
        const user = await User.findOneAndUpdate({_id:userId},
                                                {$pull:{
                                                    createdQuiz:quizz._id
                                                }},{new:true}).populate("createdQuiz");
                                                
        if(!user){
            return res.status(500).json({
                success: false,
                message: "user not found try again",
            });
        }

        // delete one quiz
        const quiz = await Quiz.findByIdAndDelete({_id:quizId});

        // return all quiz
        const quizes = user.createdQuiz;
        
        return res.status(200).json({
            success: true,
            message: "Quiz deleted successful",
            quiz: quizes,
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"internal server error in deleting quiz",
            error:error.message,
        });
    }
}