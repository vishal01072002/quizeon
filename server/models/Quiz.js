const mongoose = require("mongoose");
const QuizQues = require("./QuizQues");


const QuizSchema = new mongoose.Schema({
    quizName:{
        type: String,
        trim: true,
        required: true,
    },
    category: {
        //array of strings
        type: String,
        trim: true,
        required: true,
        enum: [
            'cpp',
            'java',
            'c',
            'general'        
        ],
    },
    duration:{
        // in minutes
        type: Number,
        required: true,
        min: 15,
        max: 120,
    },
    status:{
        type: String,
        trim: true,
        enum: ["Draft","Publish"]
    },
    access:{
        type: String,
        trim: true,
        enum:["Public", "Private"],
        required: true,
    },
    quizLink: {
        type: String,
        trim: true,
    },
    questions:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:QuizQues,
    }],
    scoreList:[{
        type:mongoose.Schema.Types.ObjectId,
        //ref:Score,
    }]
},{timestamps:true});

module.exports = mongoose.model("Quiz",QuizSchema);