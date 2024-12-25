import styled from "styled-components";

export const ChessBoardContainer = styled.div`
  height: 100vh;
  margin: 70px 50px;
  box-shadow: 5px 5px 25px #888888;
`;

export const ChessBlock = styled.span`
  border-radius: 3px;
  padding: 30px 40px;
  margin: 0;
  background: ${(props) =>
    props.item === "B"
      ? "linear-gradient(220deg, black,white)"
      : "linear-gradient(45deg, #c1bcbc, white)"};
  line-height: 70px;
  // border: 1px solid black;
  ${(props) =>
    props.isHovered &&
    `
    background: #9ec79e;
  `}
  ${(props) =>
    props.isAttacked &&
    `
    background : powderBlue
  `}
`;
