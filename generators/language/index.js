const fs = require("node:fs")

const prettier = require("prettier")

/**
 * @param {import('plop').NodePlopAPI} plop
 * @returns {import('node-plop').PlopGeneratorConfig}
 */
exports.languageGenerator = (plop) => {
  return {
    description: "Add a new language for translations",
    prompts: [
      {
        type: "input",
        name: "locale",
        message: "locale",
      },
    ],
    actions: [
      {
        type: "addMany",
        base: "locales/en",
        destination: "locales/{{locale}}",
        templateFiles: "locales/en/**",
      },
      async (answers) => {
        process.chdir(plop.getPlopfilePath())
        const data = JSON.parse(
          await fs.promises.readFile("i18n.json", { encoding: "utf-8" }),
        )
        data.locales.push(answers.locale)
        const formatted = prettier.format(JSON.stringify(data, null, 2), {
          filepath: "i18n.json",
        })
        await fs.promises.writeFile("i18n.json", formatted, {
          encoding: "utf-8",
        })
        return plop.renderString(
          `
            Added '{{locale}}' to the 'locales' array inside 'i18n.json'
            Don't forget to add the flag at 'public/images/svg/languages/{{locale}}.svg'
          `,
          answers,
        )
      },
    ],
  }
}
