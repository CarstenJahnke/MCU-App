import styled from "styled-components";
import { ToastContainer } from "react-toastify";

export const StyledToastContainer = styled(ToastContainer)`
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
