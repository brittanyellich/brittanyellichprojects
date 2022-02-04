import { createContext } from "react";
import { getExistingTheme } from "../utils/localStorage";

export const themes = {
  dark: "dark",
  light: "light",
};

export const ThemeContext = createContext({
  theme: getExistingTheme(),
  changeTheme: (theme: string) => {},
});
