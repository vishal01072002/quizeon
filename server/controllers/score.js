const Score = require("../models/Score")
const Quiz = require("../models/Quiz");
const User = require("../models/User");

// @desc   make score & update quiz for student
// route   POST /api/v1/quiz/submitQuiz/
// access  Private for student

exports.createScore = async(req,res) => {
    try {
        const {quizId, studentId, studentName, completedTime, score, correct, wrong, unAttempted, totalQuestion, gender, totalTime, image} = req.body;
 
        // validation
        if(!quizId || !studentId || !studentName || !completedTime || (score === undefined || score === null) || (correct === undefined || correct === null) || (wrong === undefined || wrong === null) || (unAttempted === undefined || unAttempted === null) || !totalQuestion || !totalTime || !gender || !image){
            return res.status(404).json({
                success: false,
                message: "fill all details",
            });
        }

        // if already attempted quiz
        const alreadyAttempted = await Quiz.findById({_id:quizId}).populate("scoreList");

        alreadyAttempted.scoreList.forEach((score) => {
            if(score.studentId === studentId){
                return res.status(401).json({
                    success: false,
                    message: "already Attempted",
                });
            }
        });

        // modify completed time
        const complete = (completedTime[0]).toString() + "," + (completedTime[1]).toString() 

        // create entry
        const newScore = await Score.create({studentId, studentName, completedTime:complete, score, correct, wrong, unAttempted, totalQuestion, totalTime, image});

        // add in quiz about new score of student
        const updatedquiz = await Quiz.findByIdAndUpdate({_id: quizId},{
                                                        $push:{
                                                            scoreList : newScore._id,
                                                        }},{new:true});
                                                 
        if(!updatedquiz){
            return res.status(400).json({
                success: false,
                message: "Quiz not Found",
            });
        }
        // update in student enrolled quizes
        const updatedUser = await User.findByIdAndUpdate({_id: studentId},{
                                                        $push:{
                                                            attemptedQuiz: updatedquiz._id,
                                                        }},{new:true});
                                                        
        if(!updatedUser){
            return res.status(400).json({
                success: false,
                message: "User not Found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Quiz submitted successfully",
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "internal server error in create Score",
            error: error.message,
        });
    }
}

exports.instructorAnalytics = async(req,res) => {
    try {
        const {quizId} = req.body;
        const userId = req.user.id;

        if(!quizId || !userId){
            return res.status(404).json({
                success: false,
                message: "quizId is empty",
            });
        }
        
        const quiz = await Quiz.findById({_id:quizId}).populate({
            path : "scoreList",
            model: Score,
            options : {sort : {"score" : -1},},
        });

        let totalStudent = quiz.scoreList.length;

        if(totalStudent === 0){
            return res.status(200).json({
                success: true,
                message: "No student attend quiz",
                totalStudent,
                quizName:quiz.quizName,
            })
        }

        let totalTimeSpend = 0;
        let totalMin = 0;
        let totalSec = 0;
        let male = 0;
        let female = 0;

        quiz.scoreList.forEach((scores) => {
            totalMin += (Number(scores.completedTime?.split(",").at(0)));
            totalSec += (Number(scores.completedTime?.split(",").at(1)));
            if(scores?.gender === "Male"){
                male++;
            }
            else{
                female++;
            }
        });

        //convert sec into min
        totalSec = (totalSec/60).toFixed(2);
        totalTimeSpend = Number(totalMin) + Number(totalSec);

        let todayStudents = quiz.scoreList.reduce((acc,score) => (score.createdAt.toLocaleDateString() === (new Date()).toLocaleDateString()) ? acc + 1 : acc + 0, 0);

        let averageTime = ((totalTimeSpend)/totalStudent).toFixed(2);
        let averageScore = ((quiz.scoreList.reduce((acc, score) => acc + score.score, 0))/totalStudent).toFixed(2);

        let topThree = quiz.scoreList.slice(0,3);

        // ScoreChart score pie & bar chart

        let highestScore = 0;
        quiz.scoreList.forEach((score) => {
            if(score.score > highestScore){
                highestScore = score.score;
            }
        });

        const findInterval = (start,end,bars) =>{
            let intervalGap = (end - start)/bars;
            let intervals = [];

            for(let i=0; i<bars; i++){
                const starts = start + i * intervalGap;
                const ends = starts + intervalGap;
                intervals.push([(i === 0)? starts : starts+1 ,ends]);
            }
            return intervals;
        }

        let minimumBar = 0;
        let intervals = [];
        // for <10   ==>  0 to 9 [0,1,2,---,9]
        // for >= 10   ==>   [0,10], [11,20], [21,30]
        if(quiz.scoreList.length < 10){
            minimumBar = quiz.scoreList.length;
            for(let i=0; i<minimumBar; i++){
                intervals.push([quiz.scoreList.at(i).score]);
            }    
        }
        else{
            minimumBar = 10;
            intervals = findInterval(0,highestScore,10);
        }

        // create Score Chart
        let temp = [];
        for (let i = 0; i < intervals.length; i++) {
            temp.push(0);
        }

        quiz.scoreList.forEach((score,indx) => {
          if(intervals.length < 10 ){
            temp[intervals.length - indx -1] = 1;
          }
          else{
            for(let i=0; i<intervals.length; i++){
              if(score.score >= intervals[i][0] || score.score <= intervals[i][1]){
                temp[i] = temp[i] + 1;
                break;
              }
            }
          }
        });

        const intervalSrting = intervals.map((interval) => {
            if(intervals.length < 10){
                return interval[0].toString();
            }
            else{
                return interval[0].toString() + "-" + interval[1].toString();
            }
        });


        // per Day chart
        let perDayChart = [];
        let perDaySorted = [];
        
        for (let i = 0; i < quiz.scoreList.length; i++) {
            // let d = new Date("2024-03-25")
            const element = quiz.scoreList[i].createdAt;
            let dd = element.getDate().toString();
            let mm = element.getMonth().toString();
            let yyyy = element.getFullYear().toString();
            perDaySorted.push(dd + "-" + mm + "-" + yyyy);
        }

        perDaySorted.sort();
        
        // algo to find how many diff date exist in sorted array 
        let first = perDaySorted[0];
        let count = 1;
        for(let i=1; i < perDaySorted.length; i++){
            let curr = perDaySorted[i];

            if(curr !== first){
                //console.log(first,curr);
                perDayChart.push([first,count]);
                first = curr;
                count = 1;
            }
            else{
                count ++;
                if(i === perDaySorted.length - 1){
                    perDayChart.push([first,count]);
                }
            }
        }

        // handle edge case for last element
        perDayChart.push([first,count]);

        return res.status(200).json({
            success: true,
            message: "analytical data fetched",
            totalStudent,
            totalTimeSpend,
            todayStudents,
            averageTime,
            averageScore,
            topThree,
            intervals,
            scoreChart : [intervalSrting,temp],
            perDayChart,
            minimumBar,
            quizName:quiz.quizName,
            genderData: [male,female],
        });

    } catch (error) {
        // console.log(error);
        return res.status(400).json({
            success: false,
            message: "internal server error in Analytical",
            error: error.message,
        });
    }
}

exports.quizLeaderBoard = async(req,res) => {
    try {
        const {quizId,pageNo} = req.body;
        const scorePerPage = 10; // show 5 score perpage
        const skip = (pageNo - 1) * scorePerPage;

        if(!quizId){
            return res.status(404).json({
                success: false,
                message: "quizId is empty",
            });
        }
        
        const tempQuiz = await Quiz.findById({_id:quizId});
        const totalStudent = tempQuiz.scoreList.length;
        let pages = Math.ceil(totalStudent / scorePerPage);

        const quiz = await Quiz.findById({_id:quizId}).populate({
            path : "scoreList",
            model: Score,
            options : {sort : {"score" : -1, "completedTime" : 1}, 
                       skip : skip, 
                       limit : scorePerPage,
                    },
        }).exec();

        if(!quiz ){
            return res.status(404).json({
                success: false,
                message: "Quiz not Found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "leaderBoard data fetched",
            quiz: quiz,
            totalStudent:totalStudent,
            totalPage: pages,
            scorePerPage,
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "internal server error in Analytical",
            error: error.message,
        });
    }
}