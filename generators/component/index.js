/**
 * @param {import('plop').NodePlopAPI} plop
 * @returns {import('node-plop').PlopGeneratorConfig}
 */
exports.componentGenerator = () => {
  return {
    description: 'Component Generator',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'component name'
      },
      {
        type: 'input',
        name: 'folder',
        message: 'folder in components'
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'components/{{folder}}/{{properCase name}}/{{properCase name}}.stories.tsx',
        templateFile: 'generators/component/Component.stories.tsx.hbs'
      },
      {
        type: 'add',
        path: 'components/{{folder}}/{{properCase name}}/{{properCase name}}.test.tsx',
        templateFile: 'generators/component/Component.test.tsx.hbs'
      },
      {
        type: 'add',
        path: 'components/{{folder}}/{{properCase name}}/{{properCase name}}.tsx',
        templateFile: 'generators/component/Component.tsx.hbs'
      },
      {
        type: 'add',
        path: 'components/{{folder}}/{{properCase name}}/index.ts',
        templateFile: 'generators/component/index.ts.hbs'
      }
    ]
  }
}
