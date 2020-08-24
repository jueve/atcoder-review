module.exports = {
  env: {
    browser: true,
    node: true,
  },
  globals: {
    __static: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  plugins: ["prettier", "react"],
  rules: {
    "@typescript-eslint/camelcase": [
      "off",
      { properties: "always", ignoreDestructuring: true },
    ],
    "@typescript-eslint/no-unused-vars": ["off", { argsIgnorePattern: "^_" }],
    "prettier/prettier": "error",
    "no-restricted-imports": [
      "error",
      {
        patterns: ["@material-ui/*/*/*", "!@material-u/core/test-utils/*"],
      },
    ],
  },
};
