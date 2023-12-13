const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
    about:{
        type:String,
    },
    gender:{
        type:String,
        enum:["Male","Female",null],
    },
    number:{
        type:Number,
    },
    dateOfBirth:{
        type:Date,
    }
});

module.exports = mongoose.model("Profile",ProfileSchema);