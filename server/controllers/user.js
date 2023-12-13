const User = require("../models/User");
const Profile = require("../models/Profile");
const {createOtp} = require("../utils/otp");
const mailsender = require("../utils/mailsernder");
const otpVerifyTemplate = require("../utils/mailtemplate/otpverify")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const forgotPasswordTemplate = require("../utils/mailtemplate/forgotpassword");
const passwordReset = require("../utils/mailtemplate/passwordReset");


// @desc   send otp to user signup
// route   POST /api/v1/user/sendotp
// access  Public
exports.sendOtp = async(req,res)=> {
    try {
        const {email} = req.body;
        console.log(email);
    if(!email){
        return res.status(400).json({
            success: false,
            message: "email not found in otp",
        });
    }

    const {otp,otpToken} = createOtp(email);
    console.log(otp,otpToken);

    // if user exist then cant signup
    const user = User.findOne({email:email});
    if(user){
      return res.status(400).json({
        success: false,
        message: "User Already Registered",
    });
    }

    // send mail to user
    try {
        const mailResponse = await mailsender(
            email,"OTP from quizeon",otpVerifyTemplate(otp)
        );
        // console.log("mail response ",mailResponse);
        
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"internal server error",
            error:error.message,
        })
    }
    
    /*
    // send otp in cookies
    return res.cookie("otpToken",otpToken, {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 3 * 60 * 60 * 24 * 1000),
    })
    */

    return res.status(200).json({
        success:true,
        message:"OTP send successfully",
        OTP:otp,
        otpToken:otpToken,
    })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "error in send otp",
            error:error.message,
        });
    }
}

// @desc   signup to user
// route   POST /api/user/signup
// access  Public
exports.signup = async (req,res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword, account, otp, otpToken} = req.body;

    console.log("signup",otp,otpToken);
    // validations on data
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !account ||
      !otp 
    ) {
      return res.status(500).json({
        success: false,
        message: "please fill all details",
      });
    }

    // check passwords are matched
    if (password !== confirmPassword) {
        return res.status(500).json({
          success: false,
          message: "password not matched",
        });
    }
    
    // validate token 
    if(!otpToken){
        return res.status(400).json({
            success:false,
            message:"token not found",
        })
    }

    // verify token 
    let newotp,newemail;
    try {
        const decodedToken = jwt.verify(otpToken,process.env.JWT_SECRET_KEY);
        const {otp,email} = decodedToken;
        newotp = otp;
        newemail = email;
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"token invalid",
            error:error.message,
        })
    }

    // verify otp and email
    if(otp !== newotp || email != newemail){
        return res.status(400).json({
            success:false,
            message:"OTP not matched",
        });
    }

    // check user already exist or not
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(500).json({
        success: false,
        message: "user already exist",
      });
    }

    // hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // create profile
    const userProfile = await Profile.create({
      about : null,
      dateOfBirth : null,
      gender : null,
      number : null,
    });

    // create user and save into DB
    const user = await User.create({
        firstName,
        lastName,
        email,
        password:hashPassword,
        image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        account,
        additionalDetail:userProfile._id,
    })

    user.password = null;
    
    return res.status(200).json({
        success: true,
        message: "SignUp successful",
        user,
    })

  } catch (error) {
    return res.status(500).json({
        success: false,
        message: "error in sign up",
        error:error.message,
    });
  }
};

// @desc   login to user
// route   POST /api/user/login
// access  Public
exports.login = async (req,res) => {
    try {
      const {email, password, account} = req.body;
      
      console.log(email,password,account);
      // validations on data
      if (
        !email ||
        !password ||
        !account
      ) {
        return res.status(500).json({
          success: false,
          message: "please fill all details",
        });
      }
  
      // check user exist or not
      const user = await User.findOne({email:email}).populate("additionalDetail").exec();
      if(!user){
        return res.status(500).json({
            success: false,
            message: "invalid user email",
          });
      }

      // check passwords are matched or not
      if(await bcrypt.compare(password,user.password)){
        // create jwt token
        let payload = {
            id: user._id,
            email: user.email,
            account:account,
            profile:user.additionalDetail._id,
        }

        const token = jwt.sign(payload,process.env.JWT_SECRET_KEY,{
            expiresIn:"1d",
        })

        
        // remove password
        user.password = null;
        
        return res.cookie("token", token, {
            secure:true,
            httpOnly:true,
            expires: new Date (Date.now() + 3 * 60 * 60 * 24 * 1000),

        }).status(200).json({
            success: true,
            token,
            tokenExpires: (Date.now() + 3 * 60 * 60 * 24 * 1000),
            user,
            message: "Login successful",
        });
      }
      else{
        return res.status(500).json({
            success: false,
            message: "password not matched",
        });
      }
    } catch (error) {
      return res.status(500).json({
          success: false,
          message: "error in login",
          error:error.message,
      });
    }
};

// @desc   send forgot password mail
// route   POST /api/v1/user/forgotmail
// access  Public
exports.forgotPasswordMail = async(req,res)=>{
  try{
      const {email} = req.body;

      const user = await User.findOne({email:email});
      if(!user){
          return res.status(404).json({
              success: false,
              message: "User Not exist in forgot password",
          });
      }

      // generate token for particular user
      const payload = {
          email : email,
      }

      const token = jwt.sign(payload,process.env.JWT_SECRET_KEY,{
          expiresIn: "600s",
      })

      // make url
      const url = `http://localhost:3000/updatepassword/${token}`;

      // send mail
      const mail = await mailsender(email,`password reset link`,forgotPasswordTemplate(url));


      return res.status(200).json({
          success: true,
          message: "rest password mail send successfully",
          url : url,
      });

  }catch (error){
      return res.status(500).json({
          success: false,
          message: "error in sending mail for forgot password",
          error: error.message,
      });
  }
}

// @desc   update password of forgot password
// route   POST /api/v1/user/updatePassword/token
// access  Public
exports.updatePassword = async(req,res)=>{
  try{
      const {token,password,confirmPassword} = req.body;

      // verify token and check for expire and find email from token payload
      let decoded;
      try {
          decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
      } catch (error) {
            return res.status(500).json({
                success : false,
                error: error,
                message : "Token expires",
            });
      }

      const {email} = decoded;

      const user = await User.findOne({email:email});
      if(!user){
          return res.status(401).json({
              success: false,
              message: "User Not exist in forgot password",
          });
      }

      // check password
      if(password != confirmPassword){
          return res.status(500).json({
              success : false,
              message : "Both password not matched", 
          });
      }

      // hash password
      const hashPassword = await bcrypt.hash(password,10);

      // update password
      const ids = user._id;

      const updatedUser = await User.findByIdAndUpdate({_id:ids},{password:hashPassword});

      const mailResponse = await mailsender(email,"Password Reset Sucessful",passwordReset(email,user.firstName + " " + user.lastName));

      return res.status(200).json({
          success: true,
          message: "password updated successfuly",
      });

  }catch (error){
      return res.status(500).json({
          success: false,
          message: "error in update forgot password",
          error: error.message,
      });
  }
}
