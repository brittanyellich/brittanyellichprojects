import React, { useState, useEffect } from "react";

import "./ColorGameBlockAccessible.scss";
import { Color } from "../../containers/ColorGameAccessible/ColorGameAccessible";

interface Props {
  colors: Color;
  onClick: () => void;
  isCorrect: boolean;
  reset: boolean;
  onReset: () => void;
}

function ColorGameBlockAccessible({ colors, onClick, isCorrect, reset, onReset }: Props) {
  const [backgroundStyle, setBackgroundStyle] = useState(
    `rgb(${colors.rgb[0]}, ${colors.rgb[1]}, ${colors.rgb[2]})`
  );

  useEffect(() => {
    if (reset) {
      setBackgroundStyle(`rgb(${colors.rgb[0]}, ${colors.rgb[1]}, ${colors.rgb[2]})`);
      onReset();
    }
  }, [reset, colors, onReset]);

  return (
    <button
      className="color-game-block-accessible"
      style={{
        background: backgroundStyle,
        color: "white",
        fontWeight: "bold",
        fontSize: "1.5rem",
      }}
      onClick={() => {
        if (!isCorrect) {
          setBackgroundStyle("transparent");
        }
        onClick();
      }}
    >{colors.colorName}</button>
  );
}

export default ColorGameBlockAccessible;
