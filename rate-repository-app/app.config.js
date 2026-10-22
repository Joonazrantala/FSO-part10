import "dotenv/config";

export default {
  expo: {
    name: "rate-repository-app",
    slug: "rate-repository-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      env: process.env.ENV,
      uri: process.env.APOLLO_URI,
      eas: {
        projectId: "51f6714a-7fae-4fa4-b843-f8d2c458b09f"
      }
    },
    updates: {
      url: "https://u.expo.dev/51f6714a-7fae-4fa4-b843-f8d2c458b09f",
    },

    runtimeVersion: {
      policy: "appVersion",
    },
  },
};
