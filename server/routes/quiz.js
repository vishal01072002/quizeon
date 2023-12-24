const Router = require("express");
const router = Router();

const {makeQuiz,updateQuiz,fetchAllQuiz,fetchOneQuiz,deleteQuiz} = require("../controllers/quiz");
const {auth,isInstructor} = require("../middlewares/auth");


// Route for make quiz
router.post("/makequiz",auth,isInstructor, makeQuiz);

// Route for create quiz
router.post("/updatequiz",auth,isInstructor, updateQuiz);

// Route for create quiz
router.post("/deletequiz",auth,isInstructor, deleteQuiz);

// Route for fetch all quiz
router.post("/fetchAllQuiz",auth,isInstructor, fetchAllQuiz);

// Route for fetch one quiz
router.post("/fetchOneQuiz",fetchOneQuiz);

module.exports = router;