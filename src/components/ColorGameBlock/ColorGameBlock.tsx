import React, { useState } from "react";

import "./ColorGameBlock.scss";

interface Props {
  colors: number[];
  onClick: () => void;
  isCorrect: boolean;
}

function ColorGameBlock({ colors, onClick, isCorrect }: Props) {
  const [backgroundStyle, setBackgroundStyle] = useState(
    `rgb(${colors[0]}, ${colors[1]}, ${colors[2]})`
  );

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

export default ColorGameBlock;
