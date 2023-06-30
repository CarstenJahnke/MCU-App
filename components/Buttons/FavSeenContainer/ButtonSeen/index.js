import Check from "./check.svg";
import { ButtonSeen, ButtonSeenStyle } from "./ButtonsStyle";
import CheckSeen from "./check-seen.svg";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import { ToastContainer, ProgressBar } from "react-toastify";

const StyledToastContainer = styled(ToastContainer)`
  .Toastify__toast {
    background-image: linear-gradient(
      to left,
      #400000,
      #520602,
      #631104,
      #731a03,
      #842400
    );
    color: #ffb833;
    border: solid #ffb833;
    border-bottom: solid #d68c29;
    border-width: 2px;
    border-radius: 20px;
    box-shadow: 1px 5px 2px 1px rgba(70, 0, 0, 0.15);
    width: -50%;
  }

  .Toastify__progress-bar--controlled {
    background-color: gold;
  }

  .Toastify__emoji {
    display: inline-block;
    font-size: 16px;
    margin-right: 4px;
  }
`;

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
