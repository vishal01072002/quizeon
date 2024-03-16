const Jwt =  require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

// verify token for authentication
// request aayi hai

exports.auth = async(req,res,next)=>{
    try {
        // fetch token
        const token = req.body.token ||
                        req.cookies.token ||
                        req.header("Authorization").replaceAll("bearer ","");

        // validate token
        if(!token){
            return res.status(401).json({
                success: false,
                message: "Token is missing",
            });
        }

        // decode token
        try {
            const decodedToken = Jwt.verify(token,process.env.JWT_SECRET_KEY);
            // console.log(decodedToken);
            req.user = decodedToken;
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Token not valid",
                error: error.message,
            });
        }

        // call next controller/middleware
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "something went wrong while verify token in middleware",
            error: error.message,
        });
    }
}

exports.isStudent = async(req,res,next)=>{
    try {
        const userDetails = await User.findOne({ email: req.user.email });

		if (userDetails.account !== "Student") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Students",
			});
		}
		next();
    } catch (error) {
        return res.status(500).json({
            success: false, message: `User Role Can't be Verified`,
            error: error.message,
        });
    }
}

exports.isInstructor = async (req, res, next) => {
	try {
		const userDetails = await User.findOne({ email: req.user.email });
		
		if (userDetails.account !== "Instructor") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Instructor",
			});
		}
		next();
	} catch (error) {
		return res.status(500).json({
            success: false, 
            message: `User Role Can't be Verified`,
            error: error.message
        });
	}
};
