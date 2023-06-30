import { css } from "styled-components";

export const toastStyles = css`
  infotoast {
    background-image: linear-gradient(
      to bottom,
      #400000,
      #520602,
      #631104,
      #731a03,
      #842400
    );
    border-color: #d68c29;
    border-width: 0.3em;
    border-radius: 20px;
    box-shadow: 5px 10px 5px 0px rgba(0, 0, 0, 0.15);
    width: 100px;
    display: flex;
    align-items: center;
  }
  progressbar {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background-color: "#eaeaea";
  }
  infoprogressbar {
    background-color: "#888";
  }
  progressbarfill {
    height: 100%;
    background-color: "#4e8cff";
    transition: width 0.2s;
  }
`;
