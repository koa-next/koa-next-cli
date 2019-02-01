#!/usr/bin/env node

import * as meow from 'meow';
import * as execa from 'execa';
import * as Listr from 'listr';
import chalk from 'chalk';
import * as path from 'path';

const cli = meow({
  help: `
    ${chalk.bold('Description')}
      $ A Tool For Building Koa-next Project
    ${chalk.bold('Usage')}
      $ koa-next-cli <source>
    ${chalk.bold('Options')}
      --version           version
  `,
  description: false
});

const source = cli.input[0];
const PWD = process.cwd();
const DIR = path.resolve(PWD, source);

(() => {
  const tasks = new Listr([
    {
      title: `create project ${DIR}`,
      task: () => {
        return execa.shell(`mkdir ${DIR}`);
      }
    },
    {
      title: 'git clone',
      task: () => {
        return execa.shell(`git clone https://github.com/koa-next/koa-next ${DIR}`);
      }
    },
    {
      title: 'install modules',
      task: () => {
        return execa.shell(`cd ${DIR} && yarn`);
      }
    }
  ]);

  tasks
    .run()
    .then(() => {
      console.log(chalk.green(`
        We already ran yarn for you, so your next steps are:

        $ cd ${source}

        To build a version for production:

        $ yarn build

        To run the server in production:

        $ yarn start

        To start a local server for development:

        $ yarn dev
     `));
    })
    .catch((err: any) => {
      chalk.red(err);
    });
})();
