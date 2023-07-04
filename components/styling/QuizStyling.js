import styled, { css } from "styled-components";
import { ButtonStyle } from "../Buttons";

export const QuizCard = css`
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
  padding: 10%;
  width: 90%;
  margin-top: -10px;
`;

export const QuizText = styled.text`
  color: #ffb833;
  font-size: 17px;
  margin-bottom: 10px;
  text-align: left;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

export const QuizTimer = styled.text`
  color: #ffb833;
  font-size: 17px;
  margin-right: 4px;
  text-align: left;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

export const QuizNumber = styled.text`
  color: #ffb833;
  font-size: 17px;
  margin-left: 4px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

export const QuizTimeAndNumber = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
`;

export const QuizCountdownStart = styled.div`
  color: #ffb833;
  font-size: 25px;
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

export const QuizTitle = styled.div`
  color: #ffb833;
  font-size: 25px;
  margin-top: 30px;
  margin-bottom: 10px;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

export const QuizHeadline = styled.div`
  background-image: linear-gradient(
    to bottom,
    #5a0000,
    #6b0804,
    #7d1405,
    #8f1f04,
    #a02b00
  );
  border: #ffb833;
  border-radius: 20px;
  border-style: outset;
  color: #ffb833;
  font-size: 20px;
  padding: 20px;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

export const QuizButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

export const QuizButtonStart = styled.button`
  ${ButtonStyle}
  background-image: linear-gradient(
    to bottom,
    #5a0000,
    #6b0804,
    #7d1405,
    #8f1f04,
    #a02b00
  );
  color: #ffb833;
  font-size: 16px;
  height: 50px;
  margin: 10px;
  width: 50%;
`;

export const QuizButtonBack = styled.button`
  ${ButtonStyle}
  background-image: linear-gradient(
    to bottom,
    #5a0000,
    #6b0804,
    #7d1405,
    #8f1f04,
    #a02b00
  );
  color: #ffb833;
  font-size: 16px;
  height: 50px;
  margin: 10px;
  width: 50%;

  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
`;

export const QuizButton = styled.button`
  ${ButtonStyle}
  background-image: linear-gradient(
    to bottom,
    #5a0000,
    #6b0804,
    #7d1405,
    #8f1f04,
    #a02b00
  );
  color: #ffb833;
  font-size: 16px;
  height: 100px;
  margin: 10px;
  width: 44%;
`;

export const QuizResult = styled.div`
  align-items: center;
  background-image: linear-gradient(
    to bottom,
    #5a0000,
    #6b0804,
    #7d1405,
    #8f1f04,
    #a02b00
  );
  border: #ffb833;
  border-radius: 20px;
  border-style: outset;
  color: #ffb833;
  display: flex;
  flex-direction: column;
  font-size: 20px;
  justify-content: center;
  margin-top: 10%;
  padding: 20px;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

export const QuizResultHeadline = styled.div`
  color: #ffb833;
  font-size: 25px;
  margin-top: 30px;
  margin-bottom: 10px;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

export const QuizResultCorrect = styled.text`
  color: #ffb833;
  font-size: 17px;
  margin-bottom: 10px;
  text-align: left;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

export const QuizResultTime = styled.text`
  color: #ffb833;
  font-size: 17px;
  margin-bottom: 10px;
  text-align: left;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

export const QuizResultHighscore = styled.text`
  color: #ffb833;
  font-size: 17px;
  margin-bottom: 10px;
  text-align: left;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;
