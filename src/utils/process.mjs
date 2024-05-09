import { argv } from "process";

/**
 * Get a command line argument by name
 * @param {string} name Name of the argument, including dashes
 * @param {string} defaultValue Default value if not found
 * @returns {string} The value
 */
export function argOrDefault(name, defaultValue) {
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === name) {
      return argv[i + 1] || defaultValue;
    }
  }
  return defaultValue;
}
