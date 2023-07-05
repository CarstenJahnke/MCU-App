import styled, { css } from "styled-components";
import { ButtonStyle } from "../Buttons";

const BackgroundImage = css`
  background-image: linear-gradient(
    to bottom,
    #5a0000,
    #6b0804,
    #7d1405,
    #8f1f04,
    #a02b00
  );
`;

const colorGold = "#ffb833";
const textShadow = css`
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;
const boxShadow = css`
  box-shadow: 5px 10px 5px 0px rgba(0, 0, 0, 0.15);
`;

export const QuizLogo = styled.div`
  ${BackgroundImage}
  border: ${colorGold};
  border-radius: 22px;
  border-style: outset;
  ${boxShadow}
  color: ${colorGold};
  font-size: 25px;
  left: 65%;
  margin-bottom: 10px;
  position: fixed;
  text-align: center;
  ${textShadow};
  top: 5%;
  transform: translate(0%, 25px) rotate(-10deg);
  width: 90px;
`;

export const QuizCard = styled.div`
  ${BackgroundImage}
  border-radius: 20px;
  ${boxShadow}
  padding: 10%;
  width: 90%;
  margin-top: -10px;
`;

const QuizText = css`
  color: ${colorGold};
  font-size: 20px;
  margin-bottom: 10px;
  text-align: center;
  ${textShadow};
`;

export const QuizStartText = styled.div`
  ${QuizText};
`;

export const QuizTimer = styled.text`
  color: ${colorGold};
  font-size: 17px;
  margin-right: 4px;
  text-align: left;
  ${textShadow};
`;

export const QuizNumber = styled.text`
  color: ${colorGold};
  font-size: 17px;
  margin-left: 4px;
  ${textShadow};
`;

export const QuizTimeAndNumber = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
`;

export const QuizCountdownStart = styled.div`
  color: ${colorGold};
  font-size: 25px;
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
  ${textShadow};
`;

export const QuizTitle = styled.div`
  color: ${colorGold};
  font-size: 25px;
  margin-top: 30px;
  margin-bottom: 10px;
  text-align: center;
  ${textShadow};
`;

export const QuizHeadline = styled.div`
  ${BackgroundImage}
  border: ${colorGold};
  border-radius: 22px;
  border-style: outset;
  color: ${colorGold};
  font-size: 19px;
  padding: 20px;
  text-align: center;
  ${textShadow};
`;

export const QuizButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

export const QuizButtonStart = styled.button`
  ${ButtonStyle}
  ${BackgroundImage}
  color: ${colorGold};
  font-size: 16px;
  height: 50px;
  margin: 10px;
  width: 50%;
`;

export const QuizButtonBackContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const QuizButtonBack = styled.button`
  ${ButtonStyle}
  ${BackgroundImage}
  color: ${colorGold};
  font-size: 16px;
  height: 50px;
  margin: 10px;
  width: 50%;

  position: fixed;
  bottom: 10px;
`;

export const QuizButton = styled.button`
  ${ButtonStyle}
  ${BackgroundImage}
  color: ${colorGold};
  font-size: 16px;
  height: 100px;
  margin: 10px;
  width: 44%;
`;

export const QuizResult = styled.div`
  ${BackgroundImage}
  align-items: center;
  border: #ffb833;
  border-radius: 20px;
  border-style: outset;
  color: ${colorGold};
  display: flex;
  flex-direction: column;
  font-size: 20px;
  justify-content: center;
  margin-top: 10%;
  padding: 20px;
  text-align: center;
  ${textShadow};
`;

export const QuizResultHeadline = styled.div`
  color: #ffb833;
  font-size: 38px;
  margin-top: 20px;
  margin-bottom: 10px;
  text-align: center;
`;

export const QuizResultCorrect = styled.text`
  color: ${colorGold};
  font-size: 20px;
  margin-bottom: 10px;
`;

export const QuizResultTime = styled.text`
  color: ${colorGold};
  font-size: 18px;
  margin-bottom: 20px;
`;

export const QuizResultHighscore = styled.text`
  color: ${colorGold};
  font-size: 17px;
  margin-bottom: 10px;
`;

export const QuizRating = styled.text`
  color: ${colorGold};
  font-size: 20px;
  margin-bottom: 10px;
`;
