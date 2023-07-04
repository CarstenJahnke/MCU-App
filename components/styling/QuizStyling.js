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
  margin-bottom: 10px;
  text-align: left;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

export const QuizTitle = styled.div`
  color: #ffb833;
  font-size: 30px;
  margin-top: 40px;
  margin-bottom: 30px;
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
  margin-bottom: 40px;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;
export const QuizButtonContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
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
  font-size: 20px;
  height: 100px;
  margin: 10px;
  width: 44%;
`;
