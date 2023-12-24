import React from 'react'
import { useSpring, animated } from 'react-spring';
import './yoho.css'; // Import the CSS file

export const Yoho = () => {
    const data = [
        {
            question:"what is my favourate anime",
            options:["One Piece", "Naruto", "Bleach", "Death Note"],
            correct:"One Piece",
        }
    ]

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [score, setScore] = useState(0);
  
    const springProps = useSpring({
      opacity: 1,
      from: { opacity: 0 },
    });
  
    const handleOptionClick = (option) => {
      if (selectedOption === null) {
        setSelectedOption(option);
  
        // Check if the selected option is correct
        if (option === questions[currentQuestion].correctAnswer) {
          setScore(score + 1);
        }
  
        // Move to the next question after a delay
        setTimeout(() => {
          if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedOption(null);
          } else {
            // Quiz is completed
            alert(`Quiz completed! Your score: ${score}/${questions.length}`);
          }
        }, 1000);
      }
    };
  
  return (
    <div>
        <animated.div style={springProps} className="quiz-container p-8 max-w-md mx-auto bg-gray-100 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Quiz about Me</h1>
      <div className="question-container">
        <p className="mb-4">{questions[currentQuestion].question}</p>
        <ul>
          {questions[currentQuestion].options.map((option) => (
            <li
              key={option}
              className={`quiz-option p-2 mb-2 cursor-pointer rounded ${
                selectedOption === option ? 'bg-green-500' : 'bg-blue-500'
              } text-white`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
        <div className="score mt-4 font-bold">Score: {score}</div>
      </div>
    </animated.div>
    </div>
  )
}
