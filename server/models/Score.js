const mongoose = require("mongoose");
const User = require("./User");
const Quiz = require("./Quiz");

const ScoreSchema = new mongoose.Schema({
    studentId :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    completedTime:{
        // in [minutes, second]
        type: Array,
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