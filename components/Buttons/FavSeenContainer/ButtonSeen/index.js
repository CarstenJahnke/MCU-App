import { ButtonSeen, ButtonSeenStyle } from "./ButtonsStyle";
import { ProgressBar } from "react-toastify";
import { toast } from "react-toastify";
import { StyledToastContainer } from "..";
import Check from "./check.svg";
import CheckSeen from "./check-seen.svg";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const CustomProgressBar = ({ progress }) => {
  return (
    <ProgressBar
      {...progress}
      className="Toastify__progress-bar--controlled"
    ></ProgressBar>
  );
};

const SeenButton = ({ movieId, movieTitle, isSeen, toggleSeen }) => {
  const [localIsSeen, setLocalIsSeen] = useState(isSeen);

  useEffect(() => {
    const watched = JSON.parse(localStorage.getItem("watched")) || [];
    setLocalIsSeen(watched.includes(movieId));
  }, [movieId]);

  const handleClick = () => {
    toggleSeen(movieId);
    setLocalIsSeen(!localIsSeen);

    if (!localIsSeen) {
      toast.success(`'${movieTitle}' als gesehen markiert`);
    } else {
      toast.info(`'${movieTitle}' von gesehen entfernt`);
    }
  };

  return (
    <>
      <ButtonSeen onClick={handleClick}>
        <ButtonSeenStyle>
          {localIsSeen ? (
            <Image src={CheckSeen} alt="Gesehen" width={20} height={20} />
          ) : (
            <Image src={Check} alt="Nicht Gesehen" width={20} height={20} />
          )}
        </ButtonSeenStyle>
      </ButtonSeen>
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
