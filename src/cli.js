import { program } from 'commander';
import { require } from '../utils/require.js'

const { version } = require('../package.json');
import { initGenerateComponentCommand, initTemplateCommand, welcome } from './commands/generate.js';

export default async function cli(args) {
  welcome(program);
  initGenerateComponentCommand(program);
  initTemplateCommand(program);

  program.version(version);
  program.parse(args);
};
