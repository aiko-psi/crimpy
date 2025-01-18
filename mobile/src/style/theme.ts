import { DefaultTheme } from "react-native-paper";

// Define what props.theme will look like
export const colors = {
  main: "#491A6F",
  secondary: "#9B9DA1",
  mainLight: "#9537e2",
  background: "#22252C",
  textLight: "#FFFFFF",
};

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...colors,
  },
};
