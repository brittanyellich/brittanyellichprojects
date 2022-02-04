import React from "react";

import "./NavToggle.scss";

interface Props {
  isToggled: boolean;
  onClick: () => void;
}

function NavToggle({ isToggled, onClick }: Props) {
  return (
    <div className="nav-toggle" onClick={onClick}>
      <>
        <span
          className={
            isToggled
              ? "nav-toggle__span nav-toggle__span-close"
              : "nav-toggle__span nav-toggle__span-hamburger"
          }
        />
        <span
          className={
            isToggled
              ? "nav-toggle__span nav-toggle__span-close"
              : "nav-toggle__span nav-toggle__span-hamburger"
          }
        />
        <span
          className={
            isToggled
              ? "nav-toggle__span nav-toggle__span-close"
              : "nav-toggle__span nav-toggle__span-hamburger"
          }
        />
      </>
    </div>
  );
}

export default NavToggle;
