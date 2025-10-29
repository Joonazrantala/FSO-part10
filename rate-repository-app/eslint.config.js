// eslint.config.js
import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactNative from "eslint-plugin-react-native";
import globals from "globals";

export default [
  // Start with ESLint's base recommended rules
  js.configs.recommended,

  {
    files: ["**/*.{js,jsx}"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
        __dirname: true,
      },
    },

    plugins: {
      react,
      "react-native": reactNative,
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    rules: {
      // General
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "no-console": "off",

      // React
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "react/display-name": "off",

      // React Native
      "react-native/no-unused-styles": "warn",
      "react-native/no-inline-styles": "off",
      "react-native/no-color-literals": "off",
      "react-native/no-raw-text": "off",
    },
  },
];
