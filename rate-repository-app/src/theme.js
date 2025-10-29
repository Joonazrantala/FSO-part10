import { Platform } from "react-native";
const theme = {
  colors: {
    textPrimary: "#24292e",
    textSecondary: "#586069",
    primary: "#0366d6",
    backgroundPrimary: "#ffffff",
    backgroundSecondary: "#f6f8fa",
  },

  fontSizes: {
    small: 12,
    body: 14,
    subheading: 16,
    heading: 20,
  },

  fonts: {
    main: Platform.select({
      ios: "Arial",
      android: "Roboto",
      default: "System",
    }),
  },

  fontWeights: {
    light: "300",
    normal: "400",
    medium: "500",
    bold: "700",
  },

  spacing: {
    xs: 4,
    s: 8,
    m: 12,
    l: 16,
    xl: 24,
  },

  roundness: 6,
};

export default theme;
