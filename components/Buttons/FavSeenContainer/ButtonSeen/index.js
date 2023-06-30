import Check from "./check.svg";
import { ButtonSeen, ButtonSeenStyle } from "./ButtonsStyle";
import CheckSeen from "./check-seen.svg";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const SeenButton = ({ movieId, isSeen, toggleSeen }) => {
  const [localIsSeen, setLocalIsSeen] = useState(isSeen);

  useEffect(() => {
    const watched = JSON.parse(localStorage.getItem("watched")) || [];
    setLocalIsSeen(watched.includes(movieId));
  }, [movieId]);

  const handleClick = () => {
    toggleSeen(movieId);
    setLocalIsSeen(!localIsSeen);
  };

  return (
    <ButtonSeen onClick={handleClick}>
      <ButtonSeenStyle>
        {localIsSeen ? (
          <Image src={CheckSeen} alt="Gesehen" width={20} height={20} />
        ) : (
          <Image src={Check} alt="Nicht Gesehen" width={20} height={20} />
        )}
      </ButtonSeenStyle>
    </ButtonSeen>
  );
};

export default SeenButton;
