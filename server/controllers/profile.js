const Profile =  require("../models/Profile");
const User =  require("../models/User");
const bcrypt = require("bcrypt");
const mailsender = require("../utils/mailsernder");
const passwordReset = require("../utils/mailtemplate/passwordReset");


// @desc   edit profile information
// route   POST /api/v1/user/auth/editProfile
// access  Private

exports.editProfile = async(req,res)=>{
    try {
        // fetch data
        const {about,gender,dateOfBirth,number} = req.body;

        //not need to validate data coz it can be empty
        
        // fetch user/profile id from req which is inserted when pass by auth
        const userId = req.user.id;
        const profileId = req.user.profile;

        // find profile and update data
        const userProfile = await Profile.findByIdAndUpdate({_id:profileId},{
                                                    number:number,
                                                    gender:gender,
                                                    dateOfBirth:dateOfBirth,
                                                    about:about
        },{new:true});

        if(!userProfile){
            return res.status(401).json({
                success: false,
                message: "Profile of User Not Found in Update Profile",
            });
        }

        // find updated user to return
        const user = await User.findById(userId).populate("additionalDetail").exec();

        return res.status(200).json({
            success: true,
            user: user,
            message: "Profile Updated Sucessful",
        });
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "error updating Profile",
            error: error.message,
        });
    }
}

// @desc   send reset password 
// route   POST /api/v1/user/auth/resetPassword
// access  Private
exports.resetPassword = async(req,res)=>{
    try{
        const {oldPassword,newPassword,email} = req.body;

        console.log(oldPassword,newPassword,email);
        if(!email || !oldPassword || !newPassword){
            return res.status(401).json({
                success: false,
                message: "Fill all details in reset password",
            });
        } 

        const user = await User.findOne({email:email});
        if(!user){
            return res.status(401).json({
                success: false,
                message: "User Not Found in reset password",
            });
        }

        // match old password
        let updatedUser;
        if(await bcrypt.compare(oldPassword,user.password)){
            // hash new password and update update password
            const hashPassword = await bcrypt.hash(newPassword,10);

            updatedUser = await User.findOneAndUpdate({email:email},{password:hashPassword});
        }
        else{
            return res.status(401).json({
                success: false,
                message: "Old password not match",
            });
        }

        const mailResponse = await mailsender(email,"Password Reset Sucessful",passwordReset(email,user.firstName + " " + user.lastName));

        return res.status(200).json({
            success: true,
            message: "Password reset Sucessful",
        });
       
    }catch (error){
        return res.status(500).json({
            success: false,
            message: "error in reset password",
            error: error.message,
        });
    }
}