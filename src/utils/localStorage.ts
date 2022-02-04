export const getExistingTheme = () => {
  const theme = window.localStorage.getItem("theme");
  return theme ? theme : "dark";
};

export const setLocalStorageTheme = (theme: string) => {
  window.localStorage.setItem("theme", theme);
};
