import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactNative from "eslint-plugin-react-native";
import globals from "globals";
import jestPlugin from "eslint-plugin-jest";

export default [
  // Start with ESLint's recommended rules
  js.configs.recommended,

  {
    files: ["**/*.{js,jsx}"],

    languageOptions: {
      parser: "@babel/eslint-parser",
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
        "react-native/react-native": true,
      },
    },

    plugins: {
      react,
      "react-native": reactNative,
      jest: jestPlugin,
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    rules: {
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",

      "jest/no-disabled-tests": "warn",
      "jest/no-focused-tests": "error",
      "jest/no-identical-title": "error",
      "jest/prefer-to-have-length": "warn",
    },
  },
];
