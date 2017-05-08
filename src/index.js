import chalk from 'chalk';
import figlet from 'figlet';
import clear from 'clear';
import inquirer from 'inquirer';
import Spinner from './console/spinner';

import files from './files';

const print = data => console.log(data); // eslint-disable-line
const banner = chalk.green(figlet.textSync('node-boilerplate', { font: 'Bubble' }));
// Slant Bubble Rounded
clear();
print(`\n${banner}\n`);

function getAnswers(done) {
  const questions = [
    {
      name: 'name',
      type: 'input',
      message: 'Enter the `name` of your new module:\n',
      validate(value) {
        if (!value.length) {
          return 'Enter the `name` of your new module!';
        }
        if (files.directoryExists(value)) {
          return chalk.red(`Already exists a directory ${chalk.blue(`"${value}"`)
            } in your current folder ${chalk.blue(`"${files.getCurrentDirectoryBase()}"`)}.`);
        }

        return true;
      }
    },
    {
      type: 'list',
      name: 'type',
      message: 'What type of module you will build?\n',
      choices: ['Node', 'Node and Browser'],
      filter(val) {
        return val.toLowerCase();
      }
    },
    {
      type: 'input',
      name: 'type',
      message: 'Choose a number?\n',
      validate(input) {
        const spinner = Spinner();

        spinner.setText('checking the name...');
        spinner.start();

        // Declare function as asynchronous, and save the done callback
        const done = this.async();

        // Do async stuff
        setTimeout(() => {
          spinner.stop();
          if (typeof input !== 'number') {
            // Pass the return value in the done callback
            done('You need to provide a number');
            return;
          }
          // Pass the return value in the done callback
          done(null, true);
        }, 3000);
      }
    }
  ];

  inquirer.prompt(questions).then(done);
}

getAnswers(({ name, type }) => {
  print(`${chalk.blue(name)} - ${chalk.yellow(type)}`);
});
