import chalk from 'chalk';
import figlet from 'figlet';
import clear from 'clear';
import inquirer from 'inquirer';

import files from './files';

const print = data => console.log(data); // eslint-disable-line
const banner = chalk.green(figlet.textSync('node-boilerplate', { font: 'Bubble' }));
// Slant Bubble Rounded
clear();
print(`\n${banner}\n`);

if (files.directoryExists('.git')) {
  print(chalk.red('Already a git repository!'));
  process.exit();
}

function getGithubCredentials(callback) {
  const questions = [
    {
      name: 'username',
      type: 'input',
      message: 'Enter your Github username or e-mail address:',
      validate(value) {
        if (value.length) {
          return true;
        }
        return 'Please enter your username or e-mail address';
      }
    },
    {
      name: 'password',
      type: 'password',
      message: 'Enter your password:',
      validate(value) {
        if (value.length) {
          return true;
        }
        return 'Please enter your password';
      }
    }
  ];

  inquirer.prompt(questions).then(callback);
}

getGithubCredentials((...args) => {
  print(args);
});
