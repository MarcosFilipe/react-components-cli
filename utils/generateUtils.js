import chalk from 'chalk';
import replace from 'replace';

import { templates } from '../templates/index.js';
import { require } from './require.js';

const { existsSync, outputFileSync } = require('fs-extra');
const { camelCase, kebabCase, snakeCase, upperFirst } = require('lodash');

function getTemplateScheme(templateName) {
  const template = templates[templateName];

  if (!template) {
    console.log(chalk.yellow(`Template ${chalk.blueBright(templateName)} não encontrado. Use o comando ${chalk.blueBright('freedom templates -l')} para listar os templates disponíveis.`));
    process.exit(1);
  }

  return template;
}

function componentTemplateGenerator({ templateName, componentName, options }) {
  let template = getTemplateScheme(templateName);
  let filename = `${componentName}.tsx`;

  return {
    componentPath: `${options.path}/${componentName}/${filename}`,
    filename,
    template,
  };
}


export function generateComponent(templateName, componentName, options) {

  const { componentPath, filename, template } = componentTemplateGenerator({ templateName, componentName, options });

  if (existsSync(componentPath)) {
    console.error(chalk.red(`${filename} já existe nesse caminho "${componentPath}".`));
  } else {
    try {
      if (!options.dryRun) {
        outputFileSync(componentPath, template);

        // Will replace the templatename in whichever format the user typed the component name in the command.
        replace({
          regex: "templatename",
          replacement: templateName,
          paths: [componentPath],
          recursive: false,
          silent: true,
        });

        // Will replace the TemplateName in PascalCase
        replace({
          regex: "TemplateName",
          replacement: upperFirst(camelCase(templateName)),
          paths: [componentPath],
          recursive: false,
          silent: true,
        });

        // Will replace the templateName in camelCase
        replace({
          regex: "templateName",
          replacement: camelCase(templateName),
          paths: [componentPath],
          recursive: false,
          silent: true,
        });

        // Will replace the template-name in kebab-case
        replace({
          regex: "template-name",
          replacement: kebabCase(templateName),
          paths: [componentPath],
          recursive: false,
          silent: true,
        });

        // Will replace the template_name in snake_case
        replace({
          regex: "template_name",
          replacement: snakeCase(templateName),
          paths: [componentPath],
          recursive: false,
          silent: true,
        });

        // Will replace the TEMPLATE_NAME in uppercase SNAKE_CASE
        replace({
          regex: "TEMPLATE_NAME",
          replacement: snakeCase(templateName).toUpperCase(),
          paths: [componentPath],
          recursive: false,
          silent: true,
        });
      }

      console.log(
        chalk.green(
          `${filename} foi criado com sucesso em ${componentPath}`
        )
      );
    } catch (error) {
      console.error(chalk.red(`${filename} falhou e não foi criado.`));
      console.error(error);
    }
  }

  if (options.dryRun) {
    console.log();
    console.log(
      chalk.yellow(`NOTE: O sinalizador "dry-run" significa que nenhuma alteração foi feita.`)
    );
  }
}
