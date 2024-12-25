import React, { useState } from "react";
import { ChessBlock, ChessBoardContainer } from "../styles/chessBoardStyles.js";

const ChessBoard = () => {
  const [hoveredBlock, setHoveredBlock] = useState([]);
  const [attackingState, setAttackingState] = useState([]);
  let rows = 8;
  let columns = 8;
  let arr = Array.from({ length: rows }, () => Array(columns).fill(0));

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if ((parseInt(i) + parseInt(j)) % 2 === 0) {
        arr[i][j] = "B";
      } else {
        arr[i][j] = "W";
      }
    }
  }
  const captureDiagonalIndices = (row, col) => {
    let tempAttackingIndices = [];
    // Top left diagonal blocks
    for (let i = row - 1, j = col - 1; i >= 0, j >= 0; i--, j--) {
      tempAttackingIndices.push({ row: i, col: j });
    }
    // Top right diagonal blocks
    for (let i = row - 1, j = col + 1; i >= 0, j < columns; i--, j++) {
      tempAttackingIndices.push({ row: i, col: j });
    }
    // Bottom left diagonal blocks
    for (let i = row + 1, j = col - 1; i < rows, j >= 0; i++, j--) {
      tempAttackingIndices.push({ row: i, col: j });
    }
    // Bottom right diagonal blocks
    for (let i = row + 1, j = col + 1; i < rows, j < columns; i++, j++) {
      tempAttackingIndices.push({ row: i, col: j });
    }
    // console.log("tempAttackingIndices ", tempAttackingIndices);
    setAttackingState(tempAttackingIndices);
  };
  const handleMouseEnter = (row, column) => {
    setHoveredBlock({ row, column });
    captureDiagonalIndices(row, column);
  };

  const handleMouseLeave = () => {
    setHoveredBlock([]);
    setAttackingState([]);
  };

  const isSquareGettingAttacked = (rowIndex, colIndex) => {
    return attackingState.some(
      (square) => square.row === rowIndex && square.col === colIndex
    );
  };

  return (
    <ChessBoardContainer>
      {arr.map((row, rowIndex) =>
        row.map((item, colIndex) => {
          const isHovered =
            hoveredBlock &&
            hoveredBlock.row === rowIndex &&
            hoveredBlock.column === colIndex;
          const isAttacked = isSquareGettingAttacked(rowIndex, colIndex);
          return (
            <>
              {parseInt(colIndex) === 0 && <br />}
              <ChessBlock
                key={colIndex}
                item={item}
                onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                onMouseLeave={handleMouseLeave}
                isHovered={isHovered}
                isAttacked={isAttacked}
              ></ChessBlock>
            </>
          );
        })
      )}
    </ChessBoardContainer>
  );
};

export default ChessBoard;
