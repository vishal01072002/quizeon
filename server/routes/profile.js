const Router = require("express");
const router = Router();

// import auth middleware and profile controller
const {editProfile,resetPassword,uploadProfile} = require("../controllers/profile");
const {auth} = require("../middlewares/auth");


// Route for update profile
router.post("/auth/editProfile",auth,editProfile);

// Route for reset password
router.post("/auth/resetPassword",auth,resetPassword);

// Route for upload profile picture
router.post("/auth/uploadProfile",auth,uploadProfile);

module.exports = router;