module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es2021": true,
    "mocha": true
  },
  "extends": [
    "plugin:mocha/recommended",
    "eslint:recommended"
  ],
  "parserOptions": {
    "ecmaVersion": 12
  },
  "rules": {
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "windows"
    ],
    "quotes": [
      "error",
      "double"
    ],
    "semi": [
      "error",
      "always"
    ]
  },
  "plugins": [
    "mocha"
  ]
};
