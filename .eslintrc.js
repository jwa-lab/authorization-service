module.exports = {
    "plugins": [
        "prettier",
      ],
      "extends": [
        "plugin:prettier/recommended",
        "prettier"
      ],
      "parserOptions": {
        "ecmaVersion": 2020,
        "sourceType": "module"
      },
      "env": {
        "es6": true,
        "node": true
      }
};