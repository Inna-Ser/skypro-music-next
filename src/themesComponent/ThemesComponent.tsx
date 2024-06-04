import React, { useContext } from "react";

export const themes = {
  light: {
    mode: "light",
    color: "black",
    background: "white",
  },
  dark: {
    mode: "dark",
    color: "white",
    background: "black",
  },
};

export const ThemeContext = React.createContext({
  theme: themes.dark,
  toggleTheme: () => {},
});

export const useThemeContext = () => {
  const {theme, toggleTheme} = useContext(ThemeContext);
  if (!theme || !toggleTheme) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  } return {theme, toggleTheme};
};
