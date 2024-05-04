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
            "Mathematics",
            "Science",
            "History",
            "Geography",
            "Programming",
            "General Knowledge",
            "Technology",
            "Programming Languages",
            "C",
            "Java",
            "JavaScript",
            "Python",
            "Cpp",
            "C#",
            "PHP",
            "Ruby",
            "Swift",
            "Kotlin",
            "Go",
            "R",
            "HTML/CSS",
            "SQL",
            "MongoDB",
            "Firebase",
            "React js",
            "Angular",
            "Vue js",
            "Bootstrap",
            "Express js",
            "Django",
            "Flask",
            "Ruby on Rails",
            "Laravel",
            "Spring Boot",
            "tailwind CSS",
            "Data Structures & Algorithms",
            "Database Management Systems",
            "Operating Systems",
            "Computer Networks",
            "Computer Science",
            "Software Engineering",
            "Machine Learning",
            "Artificial Intelligence",
            "Cybersecurity",
            "Cloud Computing",
            "Computer Vision",
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
    schedule:{
        type: Array,
        trim:true,
    },
    access:{
        type: String,
        trim: true,
        enum:["Public", "Private"],
        required: true,
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