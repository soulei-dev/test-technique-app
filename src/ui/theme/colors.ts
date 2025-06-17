type ColorKeys = "text" | "primary" | "blue600" | "gray" | "gray300" | "gray325" | "gray350" | "white" | "black" | "green500" | "red";

export const COLORS: Record<ColorKeys, string> = {
  text: '#013A51',
  primary: '#11ABEC',
  blue600: '#1093CB',
  gray: '#354A61',
  gray300: '#DCE4ED',
  gray325: "#B3BBC0",
  gray350: '#686E75',
  white: '#FFFFFF',
  black: "#000000",
  green500: "#00BB81",
  red: "#FD755F",
} as const;
