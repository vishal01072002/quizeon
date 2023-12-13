const Router = require("express");
const router = Router();

const {login,sendOtp,signup,forgotPasswordMail,updatePassword} = require("../controllers/user");


// Route for user login
router.post("/login", login);

// Route for user signup
router.post("/signup", signup);

// Route for sending OTP to the user's email
router.post("/sendotp", sendOtp);

// Route for sending forgot password email
router.post("/forgotmail", forgotPasswordMail);

// Route for update password for forgot
router.post("/updatepassword", updatePassword);


module.exports = router;