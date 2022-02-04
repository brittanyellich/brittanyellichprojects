import React from "react";
import { ThemeContext, themes } from "../../themes/ThemeContext";
import { getExistingTheme } from "../../utils/localStorage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdjust, faSearch } from "@fortawesome/free-solid-svg-icons";

import "./Nav.scss";
import NavToggle from "../../components/NavToggle/NavToggle";

function Nav() {
  const existingTheme = getExistingTheme();
  const [darkMode, setDarkMode] = React.useState(existingTheme === "dark");
  const [toggleOpen, setToggleOpen] = React.useState(false);

  return (
    <div className="Nav">
      <div className="Nav__site-title">
        <a href="https://brittanyellich.com/">Brittany Ellich</a>
      </div>
      <div className="Nav_nav-links Nav_desktop-nav">
        <a
          className="Nav_nav-links-item"
          href="https://brittanyellich.com/posts/"
        >
          Posts
        </a>
        <a
          className="Nav_nav-links-item"
          href="https://brittanyellich.com/tags/"
        >
          Tags
        </a>
        <span className="Nav_nav-links-item Nav_nav-links-delimiter" />
        <a className="Nav_nav-links-item" href="https://brittanyellich.com/">
          <FontAwesomeIcon icon={faSearch} className="Nav_nav-links-item" />
        </a>
        <ThemeContext.Consumer>
          {({ changeTheme }) => (
            <FontAwesomeIcon
              icon={faAdjust}
              className="Nav_nav-links-item Nav_nav-theme-switch"
              onClick={() => {
                setDarkMode(!darkMode);
                changeTheme(darkMode ? themes.light : themes.dark);
              }}
            />
          )}
        </ThemeContext.Consumer>
      </div>
      <div className="Nav_mobile-nav">
        <NavToggle
          isToggled={toggleOpen}
          onClick={() => setToggleOpen(!toggleOpen)}
        />
      </div>
    </div>
  );
}

export default Nav;
