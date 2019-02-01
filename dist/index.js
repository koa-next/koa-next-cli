#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const meow = require("meow");
const execa = require("execa");
const Listr = require("listr");
const chalk_1 = require("chalk");
const path = require("path");
const cli = meow({
    help: `
    ${chalk_1.default.bold('Description')}
      $ A Tool For Building Koa-next Project
    ${chalk_1.default.bold('Usage')}
      $ koa-next-cli <source>
    ${chalk_1.default.bold('Options')}
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
        console.log(chalk_1.default.green(`
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
        .catch((err) => {
        chalk_1.default.red(err);
    });
})();
//# sourceMappingURL=index.js.map