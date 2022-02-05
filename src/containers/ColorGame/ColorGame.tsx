import React, { useState } from "react";

import "./ColorGame.scss";
import ColorGameBlock from "../../components/ColorGameBlock/ColorGameBlock";

const RGB_MAX = 255;

const DIFFICULTY = {
  HARD: 6,
  EASY: 3,
};

const generateRandomIndex = (totalColors: number): number => {
  return Math.floor(Math.random() * (totalColors - 1));
};

const generateRandomColorNumber = (): number => {
  return Math.floor(Math.random() * RGB_MAX);
};

const generateRandomRGB = (): number[] => {
  const first = generateRandomColorNumber();
  const second = generateRandomColorNumber();
  const third = generateRandomColorNumber();
  console.log(first);
  return [first, second, third];
};

const generateRandomRGBArray = (colors: number) => {
  const colorsArray = [];
  for (let i = 0; i < colors; i++) {
    colorsArray.push(generateRandomRGB());
  }
  console.log(colorsArray);
  return colorsArray;
};

function ColorGame() {
  const [difficulty, setDifficulty] = useState(DIFFICULTY.HARD);
  const [colors, setColors] = useState(generateRandomRGBArray(difficulty));
  const [correctIndex, setCorrectIndex] = useState(
    generateRandomIndex(difficulty)
  );
  const [hasWon, setHasWon] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);

  const reset = () => {
    setColors(generateRandomRGBArray(difficulty));
    setCorrectIndex(generateRandomIndex(difficulty));
    setHasWon(false);
    setHasClicked(false);
  };

  const changeDifficulty = () => {
    setDifficulty(
      difficulty === DIFFICULTY.HARD ? DIFFICULTY.EASY : DIFFICULTY.HARD
    );
    reset();
  };

  return (
    <div className="color-game">
      <div className="color-game__title">
        <div className="color-game__title-text">THE GREAT</div>
        <div className="color-game__title-color-text">
          RGB({colors[correctIndex][0]}, {colors[correctIndex][1]},{" "}
          {colors[correctIndex][2]})
        </div>
        <div className="color-game__title-text">COLOR GAME</div>
      </div>
      <div className="color-game__controls">
        <button onClick={reset}>Reset</button>
        <div className="color-game__controls-feedback-text">
          {hasClicked ? (hasWon ? "Congrats!" : "Try again!") : null}
        </div>
        <button onClick={changeDifficulty}>Change Difficulty</button>
      </div>
      <div className="color-game__play-area">
        {colors.map((color, index) => (
          <ColorGameBlock
            key={index}
            colors={color}
            isCorrect={index === correctIndex}
            onClick={() => console.log("clicked on: ", index)}
          />
        ))}
      </div>
    </div>
  );
}

export default ColorGame;
