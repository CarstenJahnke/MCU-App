import React, { useState, useEffect } from "react";
import { initialQuestions } from "./Questions";

const Timer = ({ startTime }) => {
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const elapsedTime = Math.floor((currentTime - startTime) / 1000);
  const minutes = Math.floor(elapsedTime / 60);
  const seconds = elapsedTime % 60;

  return (
    <div>
      <p>
        Zeit: {minutes < 10 ? "0" + minutes : minutes}:
        {seconds < 10 ? "0" + seconds : seconds}
      </p>
    </div>
  );
};

const QuizComponent = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  useEffect(() => {
    if (quizStarted) {
      const shuffledQuestions = shuffleArray(initialQuestions);
      setQuestions(shuffledQuestions);
      setStartTime(Date.now());
    }
  }, [quizStarted]);

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const handleRestartQuiz = () => {
    setQuizStarted(false);
    setQuizCompleted(false);
    setStartTime(null);
    setEndTime(null);
    setCurrentQuestionIndex(0);
    setCorrectAnswers(0);
    setSelectedAnswerIndex(null);
  };

  const handleAnswerClick = (answerIndex) => {
    if (selectedAnswerIndex !== null) {
      return; // Antwort-Buttons sind gesperrt, wenn bereits eine Antwort ausgewählt wurde
    }

    setSelectedAnswerIndex(answerIndex);

    const currentQuestion = questions[currentQuestionIndex];
    if (answerIndex === currentQuestion.correctAnswerIndex) {
      setCorrectAnswers(correctAnswers + 1);
    }

    setTimeout(() => {
      setSelectedAnswerIndex(null);
      if (currentQuestionIndex + 1 < questions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setEndTime(Date.now());
        setQuizCompleted(true);
      }
    }, 1500);
  };

  //   const handlePrevQuestion = () => {
  //     setSelectedAnswerIndex(null);
  //     setCurrentQuestionIndex(currentQuestionIndex - 1);
  //   };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      <h1>Quiz</h1>
      {!quizStarted ? (
        <div>
          <h2>MCU Quiz</h2>
          <button onClick={handleStartQuiz}>Start</button>
        </div>
      ) : (
        <>
          {!quizCompleted ? (
            <div>
              {currentQuestion && (
                <>
                  <h2>Frage {currentQuestionIndex + 1}</h2>
                  <h3>{currentQuestion.question}</h3>
                </>
              )}
              <div>
                {currentQuestion &&
                  currentQuestion.answers
                    .map((answer, index) => ({ answer, index }))
                    .sort(() => Math.random() - 0.5)
                    .map(({ answer, index }) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerClick(index)}
                        style={{
                          backgroundColor:
                            selectedAnswerIndex === index
                              ? "yellow"
                              : selectedAnswerIndex !== null &&
                                index === currentQuestion.correctAnswerIndex
                              ? "green"
                              : selectedAnswerIndex !== null &&
                                index !== currentQuestion.correctAnswerIndex
                              ? "red"
                              : "",
                        }}
                        disabled={selectedAnswerIndex !== null}
                      >
                        {answer}
                      </button>
                    ))}
              </div>
              {selectedAnswerIndex !== null && (
                <>
                  {currentQuestion &&
                    (selectedAnswerIndex ===
                    currentQuestion.correctAnswerIndex ? (
                      <p>Richtig!</p>
                    ) : (
                      <p>
                        Falsch! Richtige Antwort:{" "}
                        {
                          currentQuestion.answers[
                            currentQuestion.correctAnswerIndex
                          ]
                        }
                      </p>
                    ))}
                </>
              )}
              {/* {currentQuestionIndex > 0 && (
                <button onClick={handlePrevQuestion}>Zurück</button>
              )} */}
              {startTime && <Timer startTime={startTime} />}
            </div>
          ) : (
            <div>
              <h2>Quiz beendet</h2>
              <p>Korrekte Antworten: {correctAnswers}</p>
              {endTime && startTime && (
                <p>Zeit: {Math.floor((endTime - startTime) / 1000)} Sekunden</p>
              )}
              <button onClick={handleRestartQuiz}>Neustart</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default QuizComponent;
