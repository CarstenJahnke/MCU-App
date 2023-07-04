import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  QuizButton,
  QuizButtonContainer,
  QuizHeadline,
  QuizTimer,
  QuizTitle,
} from "../styling/QuizStyling";
import { initialQuestions } from "./Questions";
import { ButtonGeneralContainer } from "../Buttons/ButtonGeneralContainer";
import ButtonGeneralStyle from "../Buttons/ButtonGeneralStyle";

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
    <QuizTimer>
      Zeit: {minutes < 10 ? "0" + minutes : minutes}:
      {seconds < 10 ? "0" + seconds : seconds}
    </QuizTimer>
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
  const [showTimer, setShowTimer] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [countdown, setCountdown] = useState(4); // Countdown von 4 Sekunden

  useEffect(() => {
    if (quizStarted) {
      const shuffledQuestions = shuffleArray(initialQuestions);
      const selectedQuestions = shuffledQuestions.slice(0, 10); // Begrenze auf maximal 10 Fragen
      setQuestions(selectedQuestions);

      setTimeout(() => {
        setStartTime(Date.now());
        setShowTimer(true);
        setShowQuiz(true);
      }, 3000);
    }
  }, [quizStarted]);

  useEffect(() => {
    if (countdown > 0 && showQuiz === false) {
      const countdownTimer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);

      return () => clearTimeout(countdownTimer);
    }
  }, [countdown, showQuiz]);

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
    setShowTimer(false);
    setShowQuiz(false);
  };

  const handleAnswerClick = (answerIndex) => {
    if (selectedAnswerIndex !== null) {
      return;
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

  const currentQuestion = questions[currentQuestionIndex];

  const goBack = () => {
    window.location.reload();
  };

  return (
    <>
      {/* Zurück-Button zur Startseite */}
      <ButtonGeneralContainer>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
        >
          <ButtonGeneralStyle onClick={goBack}>Zurück</ButtonGeneralStyle>
          {/* Button, um zur vorherigen Seite zurückzugehen */}
        </motion.div>
      </ButtonGeneralContainer>
      {!quizStarted ? (
        <>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            <QuizTitle>MCU Quiz</QuizTitle>
            <QuizButtonContainer>
              <QuizButton onClick={handleStartQuiz}>Start</QuizButton>
            </QuizButtonContainer>
          </motion.div>
        </>
      ) : (
        <>
          {!quizCompleted ? (
            <>
              {showTimer ? (
                <Timer startTime={startTime} />
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                >
                  {countdown > 0 ? (
                    <QuizTitle>
                      Das Quiz beginnt in {countdown} Sekunden...
                    </QuizTitle>
                  ) : (
                    <QuizTitle>Das Quiz beginnt jetzt!</QuizTitle>
                  )}
                </motion.div>
              )}

              {showQuiz && currentQuestion && (
                <>
                  <QuizTitle>Frage {currentQuestionIndex + 1}</QuizTitle>
                  <QuizHeadline>{currentQuestion.question}</QuizHeadline>
                </>
              )}
              <QuizButtonContainer>
                {showQuiz &&
                  currentQuestion &&
                  currentQuestion.answers
                    .map((answer, index) => ({ answer, index }))
                    .sort(() => Math.random() - 0.5)
                    .map(({ answer, index }) => (
                      <QuizButton
                        key={index}
                        onClick={() => handleAnswerClick(index)}
                        style={{
                          backgroundColor:
                            selectedAnswerIndex !== null &&
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
                      </QuizButton>
                    ))}
              </QuizButtonContainer>
              {selectedAnswerIndex !== null && (
                <>
                  {showQuiz &&
                    currentQuestion &&
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
            </>
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
    </>
  );
};

export default QuizComponent;
