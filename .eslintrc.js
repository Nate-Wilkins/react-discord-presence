module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      impliedStrict: true,
    },
  },
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es6: true,
    "jest/globals": true,
  },
  plugins: ["@typescript-eslint", "bdd", "jsort", "react", "jest"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jest/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    "eol-last": ["error", "always"],
    "no-console": [
      "off",
      {
        allow: ["warn", "error"],
      },
    ],
    // NOTE: Has a lot of issues with typescript
    "no-unused-vars": [
      "off",
      {
        ignoreRestSiblings: true,
        argsIgnorePattern: "^_",
      },
    ],
    // TODO@nw: When this supports argsIgnorePattern
    "@typescript-eslint/no-unused-vars": "off",
    // TODO@nw: Eslint and prettier don't get along...
    "@typescript-eslint/member-delimiter-style": ["off"],
    "@typescript-eslint/camelcase": "off",
    // TODO@nw: Eslint has breaking changes that need to be turned off for this rule.
    "@typescript-eslint/no-explicit-any": "off",
    "bdd/focus": ["error"],
    "bdd/exclude": ["error"],
    "jsort/sort-imports": ["error"],
    "jsort/normalize-import-source": ["error"],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  overrides: [
    {
      files: ["**/*.stories.*"],
      rules: {
        "import/no-anonymous-default-export": "off",
      },
    },
  ],
};
