const mongoose = require("mongoose");

const QuizQuesSchema = mongoose.Schema({
    question:{
        type: String,
        trim: true,
        required: true,
    },
    options:[{
        type: String,
        trim: true,
        required: true,
    }],
});

module.exports = mongoose.model("QuizQues",QuizQuesSchema);