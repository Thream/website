const { componentGenerator } = require("./generators/component/index.js")
const { languageGenerator } = require("./generators/language/index.js")

module.exports = (
  /** @type {import('plop').NodePlopAPI} */
  plop,
) => {
  plop.setGenerator("component", componentGenerator())
  plop.setGenerator("language", languageGenerator(plop))
}
