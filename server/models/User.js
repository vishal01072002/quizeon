const mongoose = require("mongoose");
const Profile = require("./Profile");
const Quiz = require("./Quiz");

const UserSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        trim:true,
    },
    image:{
        type:String,
        required:true,
        trim:true,
    },
    account:{
        type:String,
        enum:["Student","Instructor"],
    },
    createdQuiz:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:Quiz,
        },
    ],
    attemptedQuiz:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:Quiz,
        }
    ],
    additionalDetail:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Profile,
    }
},{timestamps:true});

module.exports = mongoose.model("User",UserSchema);