import React, { useState, useEffect } from "react";
import Image from "next/image";
import styled from "styled-components";

import Check from "./check.svg";
import CheckSeen from "./check-seen.svg";
import { ButtonSeen } from "./ButtonsStyle";

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

  const ButtonSeenStyle = styled.button`
    text-align: center;
    background-image: linear-gradient(
      to bottom,
      #5a0000,
      #6b0804,
      #7d1405,
      #8f1f04,
      #a02b00
    );
    border-radius: 20px;
    box-shadow: 5px 10px 5px 0px rgba(0, 0, 0, 0.15);
    display: flex;
    justify-content: center;
    margin-bottom: 5px;
    width: 50%;
    background: none;
  `;

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
