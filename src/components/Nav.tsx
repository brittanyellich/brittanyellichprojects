import React from "react";
import { ThemeContext, themes } from "../themes/ThemeContext";
import { getExistingTheme } from "../utils/localStorage";

function Nav() {
  const existingTheme = getExistingTheme();
  const [darkMode, setDarkMode] = React.useState(existingTheme === "dark");
  return (
    <div className="Nav">
      <ThemeContext.Consumer>
        {({ changeTheme }) => (
          <button
            color="link"
            onClick={() => {
              setDarkMode(!darkMode);
              changeTheme(darkMode ? themes.light : themes.dark);
            }}
          >
            <i className={darkMode ? "fas fa-sun" : "fas fa-moon"}></i>
            <span className="d-lg-none d-md-block">Switch mode</span>
          </button>
        )}
      </ThemeContext.Consumer>
    </div>
  );
}

export default Nav;
