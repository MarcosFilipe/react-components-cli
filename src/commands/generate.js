import chalk from 'chalk';
import figlet from 'figlet';
import { templates } from '../../templates/index.js';
import { generateComponent } from '../../utils/generateUtils.js';

export function welcome(program) {
  program
    .addHelpText('before', chalk.blueBright(figlet.textSync('Freedom CLI', { horizontalLayout: 'full' })));
}

export function initGenerateComponentCommand(program) {

  const generate = program
    .command('generate')
    .alias('g')
    .description('Gera um novo componente através dos templates disponíveis.')
    .argument('<templateName>')
    .argument('<componentName>')
    .option('-p, --path <path>', 'O caminho onde o componente será gerado')
    .option('--dry-run', 'Mostrar o que será gerado sem gravar no disco');

  generate.action((template, componentName, options) => {
    generateComponent(template, componentName, options);
  });
}

export function initTemplateCommand(program) {
  const template = program
    .command('template')
    .alias('t')
    .description('Lista os templates disponíveis.');

  template.action(() => {
    const templatesKeys = Object.keys(templates);
    console.log(chalk.bgBlueBright('Templates disponíveis:'));
    templatesKeys.forEach((template) => {
      console.log(chalk.green(template));
    });
  });
}
