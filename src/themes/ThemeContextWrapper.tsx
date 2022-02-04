import React, { useState, useEffect } from "react";
import { ThemeContext, themes } from "./ThemeContext";
import { getExistingTheme, setLocalStorageTheme } from "../utils/localStorage";

interface Props {
  children: any;
}
export default function ThemeContextWrapper({ children }: Props) {
  const existingTheme = getExistingTheme();
  const [theme, setTheme] = useState(existingTheme);

  function changeTheme(theme: string) {
    setTheme(theme);
    setLocalStorageTheme(theme);
  }

  useEffect(() => {
    switch (theme) {
      case themes.light:
        document.body.classList.add("light");
        document.body.classList.remove("dark");
        break;
      case themes.dark:
      default:
        document.body.classList.add("dark");
        document.body.classList.remove("light");
        break;
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme: theme, changeTheme: changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
