const Router = require("express");
const router = Router();

const {makeQuiz,updateQuiz, publishQuiz, fetchAllQuiz,fetchOneQuiz,deleteQuiz,fetchQuizes,fetchAttemptQuiz} = require("../controllers/quiz");
const {createScore, instructorAnalytics} = require("../controllers/score");
const {auth,isInstructor, isStudent} = require("../middlewares/auth");


// Route for make quiz
router.post("/makequiz",auth,isInstructor, makeQuiz);

// Route for create quiz
router.post("/updatequiz",auth,isInstructor, updateQuiz);

// Route for publish Quiz 
router.post("/publishquiz",auth,isInstructor, publishQuiz);

// Route for create quiz
router.post("/deletequiz",auth,isInstructor, deleteQuiz);

// Route for fetch all quiz
router.post("/fetchAllQuiz",auth, fetchAllQuiz);

// Route for fetch one quiz
router.post("/fetchOneQuiz",fetchOneQuiz);

// Route for fetch quizes for student
router.post("/fetchQuizes",auth, isStudent, fetchQuizes);

// Route for fetch quiz to attempt for student
router.post("/fetchAttemptQuiz",auth, isStudent, fetchAttemptQuiz);



// ===================   Score   =======================
router.post("/submitQuiz", createScore);
router.post("/quizAnalytic",auth, isInstructor, instructorAnalytics);

module.exports = router;