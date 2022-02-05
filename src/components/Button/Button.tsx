import React from "react";

import "./Button.scss";

interface Props {
  onClick: () => void;
  text: string;
}

function Button({ onClick, text }: Props) {
  return (
    <button className="button" onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
