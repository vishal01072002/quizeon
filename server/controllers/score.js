const Score = require("../models/Score")
const Quiz = require("../models/Quiz");
const User = require("../models/User");

// @desc   make score & update quiz for student
// route   POST /api/v1/quiz/submitQuiz/
// access  Private for student

exports.createScore = async(req,res) => {
    try {
        const {quizId, studentId, completedTime, score, correct, wrong, unAttempted, totalQuestion, totalTime} = req.body;
 
        // validation
        if(!quizId || !studentId || !completedTime || (score === undefined || null) || (correct === undefined || null) || (wrong === undefined || null) || (unAttempted === undefined || null) || !totalQuestion || !totalTime){
            return res.status(404).json({
                success: false,
                message: "fill all details",
            });
        }

        // create entry
        const newScore = await Score.create({studentId, completedTime, score, correct, wrong, unAttempted, totalQuestion, totalTime});

        // add in quiz about new score of student
        const updatedquiz = await Quiz.findByIdAndUpdate({_id: quizId},{
                                                        $push:{
                                                            scoreList : newScore._id,
                                                        }},{new:true});
                                                 
        if(!updatedquiz){
            return res.status(400).json({
                success: false,
                message: "Quiz not Found",
            });
        }
        // update in student enrolled quizes
        const updatedUser = await User.findByIdAndUpdate({_id: studentId},{
                                                        $push:{
                                                            attemptedQuiz: updatedquiz._id,
                                                        }},{new:true});
                                                        
        if(!updatedUser){
            return res.status(400).json({
                success: false,
                message: "User not Found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Quiz submitted successfully",
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "internal server error in create Score",
            error: error.message,
        });
    }
}