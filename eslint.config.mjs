import globals from "globals";
import pluginJs from "@eslint/js";
import jsdoc from "eslint-plugin-jsdoc";

// "rules": {
//   "jsdoc/no-undefined-types": 1
// },
// "plugins": [
//   "jsdoc"
// ]

export default [
  { ignores: ["tests/manual/*"] },
  pluginJs.configs.recommended,
  jsdoc.configs["flat/recommended"],
  {
    languageOptions: { globals: globals.node },
  },
];
