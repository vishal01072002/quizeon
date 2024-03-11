const mongoose = require("mongoose");
const QuizQues = require("./QuizQues");
const User = require("./User");
const Score = require("./Score");

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
            'Cpp',
            'Java',
            'C',
            'General'       
        ],
    },
    duration:{
        // in minutes
        type: Number,
        required: true,
        min: 5,
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
        ref:Score,
    }],
    quizOwner:{
        type: mongoose.Schema.Types.ObjectId,
        ref :'User',
    },
},{timestamps:true});

module.exports = mongoose.model("Quiz",QuizSchema);