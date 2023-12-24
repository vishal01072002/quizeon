const Quiz = require("../models/Quiz");
const QuizQues = require("../models/QuizQues");
const crypto = require("crypto");
const User = require("../models/User");

// @desc   make quiz Questions for instructor
// route   POST /api/v1/quiz/addQuizQues/
// access  Private

exports.addQuestion = async(req,res)=>{
    try {
        const{quizId,question,options,correct} = req.body;

        // validation
        if(!quizId || !question || !options || !correct ){
            return res.status(400).json({
                success: false,
                message: "fill all details",
            });
        }

        const newQues = await QuizQues.create({question,options,correct});

        // add ques in quiz
        const quiz = await Quiz.findByIdAndUpdate({_id:quizId},{
                                                $push:{
                                                    questions:newQues
                                                }
                                                },{new:true}).populate("questions").exec();

        if(!quiz){
            return res.status(500).json({
                success: false,
                message: "Quiz not found to add questions",
            });
        }

        
        return res.status(200).json({
            success: true,
            message: "Question added successful",
            quiz: quiz,
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"internal server error in add ques",
            error:error.message,
        });
    }
}

// @desc   remove quiz Questions for instructor
// route   POST /api/v1/quiz/removeQuizQues/
// access  Private

exports.removeQuestion = async(req,res)=>{
    try {
        const{quizId,questionId} = req.body;

        // validation
        if(!quizId || !questionId ){
            return res.status(400).json({
                success: false,
                message: "fill all details",
            });
        }

        // first remove from quiz
        
        const quiz = await Quiz.findByIdAndUpdate({_id:quizId},{
            $pull:{
                questions:questionId
            }
        },{new:true}).populate("questions").exec();
        
        if(!quiz){
            return res.status(500).json({
                success: false,
                message: "Quiz not found to add questions",
            });
        }

        // second remove that ques
        const removedQues = await QuizQues.findByIdAndDelete({_id:questionId});
        
        return res.status(200).json({
            success: true,
            message: "Question removed successful",
            quiz: quiz,
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"internal server error in remove ques",
            error:error.message,
        });
    }
}

// @desc   edit quiz Questions for instructor
// route   POST /api/v1/quiz/editQuizQues/
// access  Private

exports.editQuestion = async(req,res)=>{
    try {
        const{question,options,correct,quizId,questionId} = req.body;

        // validation
        if(!quizId || !questionId || !question || !options || !correct ){
            return res.status(400).json({
                success: false,
                message: "fill all details",
            });
        }

        // first update that Question of quiz
        const ques = await QuizQues.findByIdAndUpdate({_id:questionId},{
            question:question, options:options, correct:correct,
        })
        
        if(!ques){
            return res.status(500).json({
                success: false,
                message: "Question not found Try Again",
            });
        }
        
        // return that quiz
        const quiz = await Quiz.findById({_id:quizId}).populate("questions").exec();
        
        if(!quiz){
            return res.status(500).json({
                success: false,
                message: "Quiz not found Try Again",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Question Updated successful",
            quiz: quiz,
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"internal server error in edit ques",
            error:error.message,
        });
    }
}