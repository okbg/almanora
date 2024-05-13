const { argv } = require("process");

/**
 * Assumes args are passed like --name value
 * @param {string} name Name of the argument, including dashes
 * @param {string} defaultValue Default value if not found
 * @returns {string} The value
 */
function argOrDefault(name, defaultValue) {
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === name) {
      return argv[i + 1] || defaultValue;
    }
  }
  return defaultValue;
}

module.exports = { argOrDefault };
