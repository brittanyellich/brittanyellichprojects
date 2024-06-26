import React, { useState } from "react";
import ColorGameBlockAccessible from "../../components/ColorGameBlockAccessible/ColorGameBlockAccessible";

import "./ColorGameAccessible.scss";
import Button from "../../components/Button/Button";
import { ntc } from "../../utils/ntc";

export type Color = {
  rgb: number[],
  hex: string,
  colorName: string
}

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

const generateRandomRGB = (): Color => {
  const first = generateRandomColorNumber();
  const second = generateRandomColorNumber();
  const third = generateRandomColorNumber();

  const hex = `#${first.toString(16)}${second.toString(16)}${third.toString(16)}`;

  // ntc.js
  const colorName = ntc.name(hex);

  // Make sure color name [1] is a string
  if (typeof colorName[1] !== "string") {
    colorName[1] = "Unknown Color";
  }

  const color = {
    rgb: [first, second, third],
    hex: hex,
    colorName: colorName[1]
  }

  return color;
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
    >
      <h1 className="color-game__title">The Great RGB Color Game</h1>
      <p>RGB (Red, Green, Blue) is a color model used to create a vast variety of colors 
        by combining red, green, and blue (the three primary colors of light) together to 
        create a large variety of colors. The goal of this game is to take the RGB value 
        below and guess which of the color block options corresponds to the value. Each 
        RGB value can be between 0 and 255. As a hint, the larger the number, the more of 
        that value is present. <a href="https://en.wikipedia.org/wiki/RGB_color_model">Learn more about RGB values here!</a></p>
      <h2 className="color-game__title-color-text">RGB({colors[correctIndex].rgb[0]}, {colors[correctIndex].rgb[1]},{" "}
          {colors[correctIndex].rgb[2]})</h2>
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
      <div className="color-game__play-area" style={{
        background: hasWon
          ? `rgb(${colors[correctIndex].rgb[0]}, ${colors[correctIndex].rgb[1]}, ${colors[correctIndex].rgb[2]})`
          : "transparent",
      }}>
        {colors.map((color, index) => (
          <ColorGameBlockAccessible
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
