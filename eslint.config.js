const globals = require("globals");
const pluginJs = require("@eslint/js");
const jsdoc = require("eslint-plugin-jsdoc");

module.exports = [
  { ignores: ["examples/*"] },
  pluginJs.configs.recommended,
  jsdoc.configs["flat/recommended"],
  {
    languageOptions: { globals: globals.node },
  },
];
