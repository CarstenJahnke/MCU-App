import { ButtonGeneralContainer } from "../Buttons/ButtonGeneralContainer";
import { initialQuestions } from "./Questions";
import { motion } from "framer-motion";
import {
  QuizButton,
  QuizButtonBack,
  QuizButtonBackContainer,
  QuizButtonContainer,
  QuizButtonStart,
  QuizCountdownStart,
  QuizHeadline,
  QuizLogo,
  QuizNumber,
  QuizResult,
  QuizResultCorrect,
  QuizResultHeadline,
  QuizResultHighscore,
  QuizResultTime,
  QuizStartText,
  QuizText,
  QuizTimeAndNumber,
  QuizTimer,
  QuizTitle,
} from "../styling/QuizStyling";
import { toast, ToastContainer } from "react-toastify";
import React, { useState, useEffect } from "react";

const QuizComponent = () => {
  // State-Variablen für den Quiz-Zustand und die Fragen
  const [questions, setQuestions] = useState([]); // Array der Fragen
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Index der aktuellen Frage
  const [correctAnswers, setCorrectAnswers] = useState(0); // Anzahl der richtigen Antworten
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null); // Index der ausgewählten Antwort
  const [quizStarted, setQuizStarted] = useState(false); // Gibt an, ob das Quiz gestartet wurde
  const [quizCompleted, setQuizCompleted] = useState(false); // Gibt an, ob das Quiz abgeschlossen wurde
  const [startTime, setStartTime] = useState(null); // Startzeit des Quiz
  const [endTime, setEndTime] = useState(null); // Endzeit des Quiz
  const [showTimer, setShowTimer] = useState(false); // Gibt an, ob der Timer angezeigt werden soll
  const [showQuiz, setShowQuiz] = useState(false); // Gibt an, ob das Quiz angezeigt werden soll
  const [countdown, setCountdown] = useState(4); // Countdown von 4 Sekunden
  const [showAnswerOptions, setShowAnswerOptions] = useState(false); // Gibt an, ob die Antwortoptionen angezeigt werden sollen
  const [highscore, setHighscore] = useState(null); // Gibt den Highscore ins LocalStorage

  const storedHighscore = localStorage.getItem("highscore");

  // Funktion zum Speichern der Quizzeit im LocalStorage
  const saveQuizTimeToLocalStorage = (quizTime) => {
    localStorage.setItem("highscore", quizTime);
  };

  const loadHighscoreFromLocalStorage = () => {
    const storedHighscore = localStorage.getItem("highscore");
    if (storedHighscore) {
      return storedHighscore;
    }
    return null;
  };

  console.log("Highscore " + storedHighscore);

  // Komponente für den Timer
  const Timer = ({ startTime }) => {
    const [currentTime, setCurrentTime] = useState(Date.now());

    useEffect(() => {
      // Aktualisiert die aktuelle Zeit alle 1 Sekunde
      const timer = setInterval(() => {
        setCurrentTime(Date.now());
      }, 1000);

      // Wird aufgerufen, wenn die Komponente unmontiert wird
      return () => {
        clearInterval(timer); // Stoppt den Timer
      };
    }, []);

    // Berechnung der vergangenen Zeit seit dem Quizstart
    const elapsedTime = Math.floor((currentTime - startTime) / 1000);
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;

    // Anzeige des Timers und der aktuellen Frage
    return (
      <QuizTimeAndNumber>
        <QuizTimer>
          ⏰ {minutes < 10 ? "0" + minutes : minutes}:
          {seconds < 10 ? "0" + seconds : seconds}
        </QuizTimer>
        <QuizNumber> 🚀 {currentQuestionIndex + 1}/10</QuizNumber>
      </QuizTimeAndNumber>
    );
  };

  useEffect(() => {
    // Wird aufgerufen, wenn das Quiz gestartet wird
    if (quizStarted) {
      const shuffledQuestions = shuffleArray(initialQuestions); // Mischen der Fragen
      const selectedQuestions = shuffledQuestions.slice(0, 1); // Auswahl der ersten 10 Fragen
      setQuestions(selectedQuestions); // Setzen der ausgewählten Fragen

      setTimeout(() => {
        setStartTime(Date.now()); // Startzeit des Quiz setzen
        setShowTimer(true); // Timer anzeigen
        setShowQuiz(true); // Quiz anzeigen
        setShowAnswerOptions(true); // Antwortoptionen anzeigen
      }, 3000);
    }
  }, [quizStarted]);

  useEffect(() => {
    // Wird aufgerufen, wenn der Countdown abläuft und das Quiz noch nicht gestartet wurde
    if (countdown > 0 && showQuiz === false) {
      const countdownTimer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);

      return () => clearTimeout(countdownTimer); // Stoppt den Countdown-Timer
    }
  }, [countdown, showQuiz]);

  // Funktion zum Mischen eines Arrays
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

  // Highscore aus dem LocalStorage laden
  useEffect(() => {
    const storedHighscore = loadHighscoreFromLocalStorage();
    if (storedHighscore) {
      setHighscore(storedHighscore);
    }
  }, []);

  // Funktion zum Starten des Quiz
  const handleStartQuiz = () => {
    setQuizStarted(true); // Quiz wird gestartet
  };

  // Funktion zum Neustart des Quiz
  const handleRestartQuiz = () => {
    // Setzen aller State-Variablen auf den Anfangszustand
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

  // Funktion zum Beenden des Quiz
  const handleQuizFinish = () => {
    const currentTime = new Date().getTime();
    setEndTime(currentTime);

    if (startTime) {
      const elapsedTime = Math.floor((currentTime - startTime) / 1000);
      saveQuizTimeToLocalStorage(elapsedTime); // Speichere die Highscore-Zeit im LocalStorage
      setHighscore(elapsedTime);
    }
  };

  // Funktion zum Klicken auf eine Antwortoption
  const handleAnswerClick = (answerIndex) => {
    // Wenn bereits eine Antwort ausgewählt wurde, wird nichts ausgeführt
    if (selectedAnswerIndex === null) {
      setSelectedAnswerIndex(answerIndex); // Setzen der ausgewählten Antwort

      const currentQuestion = questions[currentQuestionIndex];
      if (answerIndex === currentQuestion.correctAnswerIndex) {
        // Wenn die ausgewählte Antwort korrekt ist
        setCorrectAnswers(correctAnswers + 1); // Inkrementiere die Anzahl der richtigen Antworten
        toast.success("Richtige Antwort! 🚀", { autoClose: 2000 }); // Zeige Erfolgsmeldung
      } else {
        toast.error(
          `Falsch! Richtige wäre gewesen: "${
            currentQuestion.answers[currentQuestion.correctAnswerIndex]
          }" 👍`,
          { autoClose: 2000 }
        ); // Zeige Fehlermeldung mit der richtigen Antwort
      }

      setTimeout(() => {
        setSelectedAnswerIndex(null); // Setze die ausgewählte Antwort zurück
        if (currentQuestionIndex + 1 < questions.length) {
          setCurrentQuestionIndex(currentQuestionIndex + 1); // Gehe zur nächsten Frage
        } else {
          setEndTime(Date.now()); // Setze die Endzeit des Quiz
          setQuizCompleted(true); // Markiere das Quiz als abgeschlossen
        }
      }, 3000);
    }
  };

  const currentQuestion = questions[currentQuestionIndex]; // Aktuelle Frage

  // Funktion zum Zurückkehren zur vorherigen Seite
  const goBack = () => {
    window.location.reload();
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
      >
        <QuizLogo>Quiz</QuizLogo>
      </motion.div>
      <ToastContainer position="top-right" />
      {!quizStarted ? (
        <>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            <QuizTitle>MCU Quiz</QuizTitle>
            <QuizStartText>
              Test jetzt dein Wissen in dem Marvelous Cinematic Unisearch Quiz
            </QuizStartText>
            <QuizButtonContainer>
              <QuizButtonStart onClick={handleStartQuiz}>Start</QuizButtonStart>
            </QuizButtonContainer>
            <QuizButtonBackContainer>
              <QuizButtonBack onClick={goBack}>Zurück</QuizButtonBack>
            </QuizButtonBackContainer>
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
                    <QuizCountdownStart>
                      Das Quiz beginnt in {countdown} Sekunden...
                    </QuizCountdownStart>
                  ) : (
                    <QuizTitle>Los gehts!</QuizTitle>
                  )}
                </motion.div>
              )}
              {showQuiz && currentQuestion && (
                <QuizHeadline>{currentQuestion.question}</QuizHeadline>
              )}
              <QuizButtonContainer>
                {showAnswerOptions &&
                  showQuiz &&
                  currentQuestion &&
                  currentQuestion.answers
                    .map((answer, index) => ({ answer, index }))
                    // .sort(() => Math.random() - 0.5)
                    .map(({ answer, index }) => (
                      <QuizButton
                        key={index}
                        onClick={() => handleAnswerClick(index)}
                        style={{
                          ...(selectedAnswerIndex !== null &&
                          index === currentQuestion.correctAnswerIndex
                            ? { borderColor: "green", borderSize: "10px" } // Use the correct answer style object here
                            : selectedAnswerIndex !== null &&
                              index !== currentQuestion.correctAnswerIndex
                            ? { borderColor: "red", borderSize: "10px" } // Use the wrong answer style object here
                            : {}),
                        }}
                        disabled={selectedAnswerIndex !== null}
                      >
                        <motion.div
                          initial={{ opacity: 0, y: -50 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -50 }}
                        >
                          {answer}
                        </motion.div>
                      </QuizButton>
                    ))}
              </QuizButtonContainer>
            </>
          ) : (
            <QuizResult>
              <QuizResultHeadline>Quiz beendet</QuizResultHeadline>
              <QuizResultCorrect>
                Ergebnis: {correctAnswers} von 10 ✅
              </QuizResultCorrect>
              {endTime && startTime && (
                <QuizResultTime>
                  Deine Zeit: {Math.floor((endTime - startTime) / 1000)}{" "}
                  Sekunden.
                </QuizResultTime>
              )}
              {highscore !== null && (
                <QuizResultHighscore>
                  Highscore: {highscore} Sekunden
                </QuizResultHighscore>
              )}
              <QuizButtonStart onClick={handleRestartQuiz}>
                Neuer Versuch
              </QuizButtonStart>
            </QuizResult>
          )}
          <QuizButtonBackContainer>
            <QuizButtonBack onClick={goBack}>Zurück</QuizButtonBack>
          </QuizButtonBackContainer>
        </>
      )}
    </>
  );
};
export default QuizComponent;
