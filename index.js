#!/usr/bin/env node

import cli  from './src/cli.js';

const isNotValidNodeVersion = () => {
  const currentNodeVersion = process.versions.node;
  const semver = currentNodeVersion.split('.');
  const major = semver[0];

  if (major < 12) {
    console.error(
      // eslint-disable-next-line
      'Você está executando o Node ' +
        currentNodeVersion +
        ' Freedom CLI requer o Node 12 ou superior. Atualize sua versão do Node.'
    );

    return true;
  }

  return false;
};

if (isNotValidNodeVersion()) {
  process.exit(1);
}

cli(process.argv);