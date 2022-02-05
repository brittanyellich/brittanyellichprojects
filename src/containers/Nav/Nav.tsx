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
    <div className="nav">
      <div className="nav__site-title">
        <a href="https://brittanyellich.com/">Brittany Ellich</a>
      </div>
      <div className="nav_nav-links nav_desktop-nav">
        <a
          className="nav_nav-links-item"
          href="https://brittanyellich.com/posts/"
        >
          Posts
        </a>
        <a
          className="nav_nav-links-item"
          href="https://brittanyellich.com/tags/"
        >
          Tags
        </a>
        <span className="nav_nav-links-item nav_nav-links-delimiter" />
        <a className="nav_nav-links-item" href="https://brittanyellich.com/">
          <FontAwesomeIcon icon={faSearch} className="nav_nav-links-item" />
        </a>
        <ThemeContext.Consumer>
          {({ changeTheme }) => (
            <FontAwesomeIcon
              icon={faAdjust}
              className="nav_nav-links-item nav_nav-theme-switch"
              onClick={() => {
                setDarkMode(!darkMode);
                changeTheme(darkMode ? themes.light : themes.dark);
              }}
            />
          )}
        </ThemeContext.Consumer>
      </div>
      <div className="nav_mobile-nav">
        <NavToggle
          isToggled={toggleOpen}
          onClick={() => setToggleOpen(!toggleOpen)}
        />
        {toggleOpen && (
          <div className="nav_mobile-nav-menu">
            <a
              className="nav_mobile-nav-menu-item"
              href="https://brittanyellich.com/posts/"
            >
              Posts
            </a>
            <a
              className="nav_mobile-nav-menu-item"
              href="https://brittanyellich.com/tags/"
            >
              Tags
            </a>
            <ThemeContext.Consumer>
              {({ changeTheme }) => (
                <FontAwesomeIcon
                  icon={faAdjust}
                  className="nav_mobile-nav-menu-item nav_nav-theme-switch"
                  onClick={() => {
                    setDarkMode(!darkMode);
                    changeTheme(darkMode ? themes.light : themes.dark);
                  }}
                />
              )}
            </ThemeContext.Consumer>
          </div>
        )}
      </div>
    </div>
  );
}

export default Nav;
