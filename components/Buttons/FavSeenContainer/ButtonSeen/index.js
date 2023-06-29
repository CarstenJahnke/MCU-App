import { ButtonSeen, ButtonSeenStyle } from "./ButtonsStyle";
import Check from "./check.svg";
import CheckSeen from "./check-seen.svg";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const SeenButton = ({ movieId }) => {
  const [isSeen, setIsSeen] = useState(false);

  useEffect(() => {
    const watched = JSON.parse(localStorage.getItem("watched")) || [];
    setIsSeen(watched.includes(movieId));
  }, [movieId]);

  const toggleSeen = () => {
    const watched = JSON.parse(localStorage.getItem("watched")) || [];

    if (isSeen) {
      const updatedSeens = watched.filter((id) => id !== movieId);
      localStorage.setItem("watched", JSON.stringify(updatedSeens));
    } else {
      watched.push(movieId);
      localStorage.setItem("watched", JSON.stringify(watched));
    }

    setIsSeen(!isSeen);
  };

  return (
    <ButtonSeen>
      <ButtonSeenStyle onClick={toggleSeen}>
        {isSeen ? (
          <Image src={CheckSeen} alt="Gesehen" width={20} height={20} />
        ) : (
          <Image src={Check} alt="Nicht Gesehen" width={20} height={20} />
        )}
      </ButtonSeenStyle>
    </ButtonSeen>
  );
};

export default SeenButton;
