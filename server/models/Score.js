const mongoose = require("mongoose");
const User = require("./User");
const Quiz = require("./Quiz");

const ScoreSchema = new mongoose.Schema({
    studentId :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    studentName:{
        type:String,
        trim:true,
    },
    completedTime:{
        // in minutes:second
        type: String,
    },
    gender:{
        type:String,
        enum:["Male","Female",null]
    },
    score:{
        type: Number,
    },
    correct:{
        type: Number,
    },
    wrong:{
        type: Number,
    },
    unAttempted:{
        type: Number,
    },
    totalQuestion:{
        type: Number,
    },
    totalTime:{
        type: Array,
    },
},{timestamps:true});

module.exports = mongoose.model("Score",ScoreSchema);