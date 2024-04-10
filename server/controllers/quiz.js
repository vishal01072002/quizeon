const Quiz = require("../models/Quiz");
const crypto = require("crypto");
const User = require("../models/User");
const Score = require("../models/Score");

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

        // make entry
        const quizz = await Quiz.create({quizName,duration,category,status,access});
        
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

        const quizOwner = user._id;
        quizz.quizOwner = quizOwner;
        await quizz.save();
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
        },{new:true}).populate("questions").exec();

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

// @desc   publish quiz for instructor
// route   POST /api/v1/quiz/publishQuiz
// access  Private
exports.publishQuiz = async(req,res)=>{
    try {
        const{quizId} = req.body;

        const quizz = await Quiz.findOneAndUpdate({_id:quizId},{
            status : "Publish",
        },{new:true}).populate("questions").exec();

        return res.status(200).json({
            success:true,
            message:"Quiz publish sucessful",
            quiz:quizz,
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"internal server error in publish quiz",
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
        const user = await User.findById({_id:userId}).populate("createdQuiz").populate({
            path : "attemptedQuiz",
            model : Quiz,
            populate : {
                path : "scoreList",
                model : Score,
                match : {studentId : {$in : [userId]}},
            }
        });

        if(!user){
            return res.status(500).json({
                success: false,
                message: "User Not Found",
            });
        }

        // return quizes according to user account type
        let quizes = [];
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
// route   POST /api/v1/quiz/fetchOneQuiz
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

// @desc   fetch all quiz for student
// route   POST /api/v1/quiz/fetchQuizes
// access  Private (Student)

exports.fetchQuizes = async(req,res) => {
    try {
        const {pageNo} = req.body;
        const quizPerPage = 2; // show 10 quiz perpage
        const skip = (pageNo - 1) * quizPerPage

        // reverse order for new first
        const numbers = await Quiz.countDocuments({status:"Publish", access:"Public"});
        const allQuiz = await Quiz.find({status:"Publish", access:"Public"}).sort({createdAt : -1}).skip(skip).limit(quizPerPage).exec();
        
        let pages = Math.ceil(numbers / quizPerPage);
        
        if(!allQuiz){
            return res.status(404).json({
                success: false,
                message: "quizes not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Quiz fetched successful",
            quiz: allQuiz,
            totalPages: pages,
        });

    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"internal server error in fetching quizes for student",
            error:error.message,
        });
    }
}

// @desc   fetch attempting quiz for student
// route   POST /api/v1/quiz/fetchAttemptQuiz
// access  Private (Student)

exports.fetchAttemptQuiz = async(req,res) => {
    try {
        const {quizId} = req.body ;
        // const userId = req.user.id ;

        if(!quizId){
            return res.status(404).json({
                success: false,
                message: "fill all required field",
            });
        }

        const quiz = await Quiz.findById({_id:quizId}).populate("questions").exec();

        if(!quiz){
            return res.status(404).json({
                success: false,
                message: "quizes not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Attempted Quiz fetched successful",
            quiz: quiz,
        });
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"internal server error in fetching attempt quiz for student",
            error:error.message,
        });
    }
}