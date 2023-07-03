import { ButtonSeen, ButtonSeenStyle } from "./ButtonsStyle";
import { ProgressBar } from "react-toastify";
import { StyledToastContainer } from "../../../ToastifyMessage/styling";
import { toast } from "react-toastify";
import Check from "./check.svg";
import CheckSeen from "./check-seen.svg";
import Image from "next/image";
import React, { useState, useEffect } from "react";

// Benutzerdefinierte Fortschrittsbalken-Komponente
const CustomProgressBar = ({ progress }) => {
  return (
    <ProgressBar
      {...progress}
      className="Toastify__progress-bar--controlled"
    ></ProgressBar>
  );
};

// SeenButton-Komponente
const SeenButton = ({ movieId, movieTitle, isSeen, toggleSeen }) => {
  // Zustand für den "Gesehen"-Status
  const [localIsSeen, setLocalIsSeen] = useState(isSeen);

  // Effekt-Hook, der den "Gesehen"-Status aktualisiert
  useEffect(() => {
    // Abrufen der gespeicherten "Gesehen"-Liste aus dem localStorage
    const watched = JSON.parse(localStorage.getItem("watched")) || [];
    // Überprüfen, ob die movieId in der "Gesehen"-Liste enthalten ist
    setLocalIsSeen(watched.includes(movieId));
  }, [movieId]);

  // Funktion, die aufgerufen wird, wenn der Button geklickt wird
  const handleClick = () => {
    // Aufrufen der toggleSeen-Funktion, um den "Gesehen"-Status zu ändern
    toggleSeen(movieId);
    // Aktualisieren des lokalen "Gesehen"-Status
    setLocalIsSeen(!localIsSeen);

    if (!localIsSeen) {
      // Anzeigen einer Erfolgsmeldung, wenn der Film als gesehen markiert wurde
      toast.success(`'${movieTitle}' als gesehen markiert`);
    } else {
      // Anzeigen einer Warnung, wenn der Film von gesehen entfernt wurde
      toast.warning(`'${movieTitle}' von gesehen entfernt`);
    }
  };

  // Render-Methode der Komponente
  return (
    <>
      <ButtonSeen onClick={handleClick}>
        <ButtonSeenStyle>
          {localIsSeen ? (
            // Anzeigen des "Gesehen"-Symbols, wenn localIsSeen true ist
            <Image src={CheckSeen} alt="Gesehen" width={20} height={20} />
          ) : (
            // Anzeigen des "Nicht gesehen"-Symbols, wenn localIsSeen false ist
            <Image src={Check} alt="Nicht Gesehen" width={20} height={20} />
          )}
        </ButtonSeenStyle>
      </ButtonSeen>
      {/* Konfiguration des Toastify-Containers */}
      <StyledToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        progressClassName="Toastify__progress-bar--controlled"
        components={{ ProgressBar: CustomProgressBar }}
      />
    </>
  );
};

export default SeenButton;
