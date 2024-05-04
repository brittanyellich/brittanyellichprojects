import React, { useState, useEffect } from "react";

import "./ColorGameBlockAccessibleDemo.scss";

interface Props {
  colors: number[];
  onClick: () => void;
  isCorrect: boolean;
  reset: boolean;
  onReset: () => void;
}

function ColorGameBlockAccessibleDemo({ colors, onClick, isCorrect, reset, onReset }: Props) {
  const [backgroundStyle, setBackgroundStyle] = useState(
    `rgb(${colors[0]}, ${colors[1]}, ${colors[2]})`
  );

  useEffect(() => {
    if (reset) {
      setBackgroundStyle(`rgb(${colors[0]}, ${colors[1]}, ${colors[2]})`);
      onReset();
    }
  }, [reset, colors, onReset]);

  return (
    <div
      className="color-game-block"
      style={{
        background: backgroundStyle,
      }}
      onClick={() => {
        if (!isCorrect) {
          setBackgroundStyle("transparent");
        }
        onClick();
      }}
    ></div>
  );
}

export default ColorGameBlockAccessibleDemo;
