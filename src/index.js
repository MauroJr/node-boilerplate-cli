import chalk from 'chalk';
import figlet from 'figlet';
import clear from 'clear';
import inquirer from 'inquirer';
import Spinner from './console/spinner';

import {
  getCurrentDirBaseName,
  getNewModuleBasePath,
  directoryExists,
  copyModule,
  editPackageJson,
  createReadme
} from './files';

const print = data => console.log(data); // eslint-disable-line
const banner = chalk.green(figlet.textSync('node-boilerplate', { font: 'Bubble' }));
// Slant Bubble Rounded
const spinner = Spinner();

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
          return chalk.red('Enter the `name` of your new module!');
        }
        if (directoryExists(value)) {
          return chalk.red(`Already exists a directory ${chalk.blue(`"${value}"`)
            } in your current folder ${chalk.blue(`"${getCurrentDirBaseName()}"`)}.`);
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
      name: 'version',
      type: 'input',
      message: 'Initial version:\n',
      default() {
        return '0.0.0-development';
      }
    },
    {
      name: 'description',
      type: 'input',
      message: 'Module description:\n'
    },
    {
      name: 'repository',
      type: 'input',
      message: 'Repository URL:\n'
    },
    {
      name: 'author',
      type: 'input',
      message: 'Module author:\n'
    },
    {
      name: 'license',
      type: 'input',
      message: 'License:\n',
      default() {
        return 'MIT';
      }
    }
  ];

  inquirer.prompt(questions).then(done);
}

getAnswers((answers) => {
  const { name } = answers;

  spinner.setText('copying files...');
  spinner.start();

  copyModule(answers, next(() => {
    const packagePath = getNewModuleBasePath(name);

    editPackageJson(packagePath, {
      name: answers.name,
      version: answers.version,
      description: answers.description,
      repository: answers.repository,
      author: answers.author,
      license: answers.license,
      keywords: []
    },
    next(() => {
      createReadme(packagePath, answers,
      next(() => {
        spinner.stop();
        print(chalk.green(`Files created in ${chalk.blue(`./${name}`)} directory.`));
        print(chalk.green(`Type: cd ${name} && npm run setup`));
        process.exit();
      }));
    }));
  }));
});

function next(done) {
  return (err, result) => {
    if (err) {
      spinner.stop();
      print(err);
      return process.exit(1);
    }

    return done(result);
  };
}
