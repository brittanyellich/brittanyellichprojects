import React, { useState } from "react";
import ColorGameBlockAccessibleDemo from "../../components/ColorGameBlockAccessibleDemo/ColorGameBlockAccessibleDemo";

import "./ColorGameAccessibleDemo.scss";
import Button from "../../components/Button/Button";

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

  return [first, second, third];
};

const generateRandomRGBArray = (colors: number) => {
  const colorsArray = [];
  for (let i = 0; i < colors; i++) {
    colorsArray.push(generateRandomRGB());
  }

  return colorsArray;
};

function ColorGameAccessible() {
  const [difficulty, setDifficulty] = useState(DIFFICULTY.HARD);
  const [colors, setColors] = useState(generateRandomRGBArray(difficulty));
  const [correctIndex, setCorrectIndex] = useState(
    generateRandomIndex(difficulty)
  );
  const [hasWon, setHasWon] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);
  const [resetAll, setResetAll] = useState(false);

  const reset = () => {
    setColors(generateRandomRGBArray(difficulty));
    setCorrectIndex(generateRandomIndex(difficulty));
    setHasWon(false);
    setHasClicked(false);
    setResetAll(true);
  };

  //TODO: Fix race condition in initial difficulty setting
  const changeDifficulty = () => {
    setDifficulty(
      difficulty === DIFFICULTY.HARD ? DIFFICULTY.EASY : DIFFICULTY.HARD
    );
    reset();
  };

  return (
    <div
      className="color-game"
      style={{
        background: hasWon
          ? `rgb(${colors[correctIndex][0]}, ${colors[correctIndex][1]}, ${colors[correctIndex][2]})`
          : "transparent",
      }}
    >
      <div className="color-game__title">
        <div className="color-game__title-text">THE GREAT</div>
        <div className="color-game__title-color-text">
          RGB({colors[correctIndex][0]}, {colors[correctIndex][1]},{" "}
          {colors[correctIndex][2]})
        </div>
        <div className="color-game__title-text">COLOR GAME</div>
      </div>
      <div className="color-game__controls">
        <Button text="Reset" onClick={reset} />
        <div className="color-game__controls-feedback-text">
          {hasClicked ? (hasWon ? "Congrats!" : "Try again!") : ""}
        </div>
        <Button
          onClick={changeDifficulty}
          text={
            difficulty === DIFFICULTY.HARD ? "Make it easier" : "Make it harder"
          }
        />
      </div>
      <div className="color-game__play-area">
        {colors.map((color, index) => (
          <ColorGameBlockAccessibleDemo
            key={index}
            colors={color}
            isCorrect={index === correctIndex}
            onClick={() => {
              if (index === correctIndex) {
                setHasWon(true);
              }
              setHasClicked(true);
            }}
            reset={resetAll}
            onReset={() => {
              setResetAll(false);
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default ColorGameAccessible;
