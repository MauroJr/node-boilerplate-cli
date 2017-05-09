'use strict';

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _figlet = require('figlet');

var _figlet2 = _interopRequireDefault(_figlet);

var _clear = require('clear');

var _clear2 = _interopRequireDefault(_clear);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _spinner = require('./console/spinner');

var _spinner2 = _interopRequireDefault(_spinner);

var _files = require('./files');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const print = data => console.log(data); // eslint-disable-line
const banner = _chalk2.default.green(_figlet2.default.textSync('node-boilerplate', { font: 'Bubble' }));
// Slant Bubble Rounded
const spinner = (0, _spinner2.default)();

(0, _clear2.default)();
print(`\n${banner}\n`);

function getAnswers(done) {
  const questions = [{
    name: 'name',
    type: 'input',
    message: 'Enter the `name` of your new module:\n',
    validate(value) {
      if (!value.length) {
        return _chalk2.default.red('Enter the `name` of your new module!');
      }
      if ((0, _files.directoryExists)(value)) {
        return _chalk2.default.red(`Already exists a directory ${_chalk2.default.blue(`"${value}"`)} in your current folder ${_chalk2.default.blue(`"${(0, _files.getCurrentDirBaseName)()}"`)}.`);
      }

      return true;
    }
  }, {
    type: 'list',
    name: 'type',
    message: 'What type of module you will build?\n',
    choices: ['Node', 'Node and Browser'],
    filter(val) {
      return val.toLowerCase();
    }
  }, {
    name: 'version',
    type: 'input',
    message: 'Initial version:\n',
    default() {
      return '0.0.0-development';
    }
  }, {
    name: 'description',
    type: 'input',
    message: 'Module description:\n'
  }, {
    name: 'repository',
    type: 'input',
    message: 'Repository URL:\n'
  }, {
    name: 'author',
    type: 'input',
    message: 'Module author:\n'
  }, {
    name: 'license',
    type: 'input',
    message: 'License:\n',
    default() {
      return 'MIT';
    }
  }];

  _inquirer2.default.prompt(questions).then(done);
}

getAnswers(answers => {
  const { name } = answers;

  spinner.setText('copying files...');
  spinner.start();

  (0, _files.copyModule)(answers, next(() => {
    const packagePath = (0, _files.getNewModuleBasePath)(name);

    (0, _files.editPackageJson)(packagePath, {
      name: answers.name,
      version: answers.version,
      description: answers.description,
      repository: answers.repository,
      author: answers.author,
      license: answers.license,
      keywords: []
    }, next(() => {
      spinner.stop();
      print(_chalk2.default.green(`Files created in ${_chalk2.default.blue(`./${name}`)} directory.`));
      print(_chalk2.default.green(`Type: cd ${name} && npm run setup`));
      process.exit();
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