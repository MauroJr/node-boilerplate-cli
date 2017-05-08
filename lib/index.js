'use strict';

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _figlet = require('figlet');

var _figlet2 = _interopRequireDefault(_figlet);

var _clear = require('clear');

var _clear2 = _interopRequireDefault(_clear);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _files = require('./files');

var _files2 = _interopRequireDefault(_files);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const print = data => console.log(data); // eslint-disable-line
const banner = _chalk2.default.green(_figlet2.default.textSync('node-boilerplate', { font: 'Bubble' }));
// Slant Bubble Rounded
(0, _clear2.default)();
print(`\n${banner}\n`);

if (_files2.default.directoryExists('.git')) {
  print(_chalk2.default.red('Already a git repository!'));
  process.exit();
}

function getGithubCredentials(callback) {
  const questions = [{
    name: 'username',
    type: 'input',
    message: 'Enter your Github username or e-mail address:',
    validate(value) {
      if (value.length) {
        return true;
      }
      return 'Please enter your username or e-mail address';
    }
  }, {
    name: 'password',
    type: 'password',
    message: 'Enter your password:',
    validate(value) {
      if (value.length) {
        return true;
      }
      return 'Please enter your password';
    }
  }];

  _inquirer2.default.prompt(questions).then(callback);
}

getGithubCredentials((...args) => {
  print(args);
});