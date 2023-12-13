const Quiz = require("../models/Quiz");

// @desc   make quiz for instructor
// route   POST /api/v1/makeQuiz/
// access  Public

exports.makeQuiz = async(req,res)=>{
    try {
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"internal server error",
            error:error.message,
        })
    }
}