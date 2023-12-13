const otpGenerator = require("otp-generator");
const jwt = require("jsonwebtoken");


// create otp 
exports.createOtp = (email)=>{
    try {
        // generate OTP
        let otp = otpGenerator.generate(6,{
            lowerCaseAlphabets: false,
            specialChars: false,
            upperCaseAlphabets: false,
        });

        console.log(otp);
        // use JWT to encrypt
        const payload = {
            email: email,
            otp : otp
        };
        const otpToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
            expiresIn: 300000,
        });

        // return otp and token
        ans = {otp,otpToken};
        return ans;
    } catch (error) {
        console.log("error in creating otp ",error)
    }
} 

// verify otp