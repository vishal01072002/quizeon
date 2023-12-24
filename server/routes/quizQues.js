const Router = require("express");
const router = Router();

const {addQuestion,removeQuestion,editQuestion} = require("../controllers/quizQues");
const {auth,isInstructor} = require("../middlewares/auth");


// Route for make question
router.post("/addQuizQues",addQuestion);

// Route for remove question
router.post("/removeQuizQues",removeQuestion);

// Route for edit question
router.post("/editQuizQues",editQuestion);


module.exports = router;