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
        return _chalk2.default.red(`Already exists a directory ${_chalk2.default.blue(`"${value}"`)} in your current folder ${_chalk2.default.blue(`"${(0, _files.getCurrentDirectoryBase)()}"`)}.`);
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
  }
  // {
  //   type: 'input',
  //   name: 'type',
  //   message: 'Choose a number?\n',
  //   validate(input) {
  //     spinner.setText('checking the name...');
  //     spinner.start();

  //     // Declare function as asynchronous, and save the done callback
  //     const done = this.async();

  //     // Do async stuff
  //     setTimeout(() => {
  //       spinner.stop();
  //       if (typeof input !== 'number') {
  //         // Pass the return value in the done callback
  //         done('You need to provide a number');
  //         return;
  //       }
  //       // Pass the return value in the done callback
  //       done(null, true);
  //     }, 3000);
  //   }
  // }
  ];

  _inquirer2.default.prompt(questions).then(done);
}

getAnswers(({ name, type }) => {
  print(`${_chalk2.default.blue(name)} - ${_chalk2.default.yellow(type)}`);
  if (type === 'node') {
    spinner.setText('copying files...');
    spinner.start();
    (0, _files.copyModule)('node-module-boilerplate', name, err => {
      spinner.stop();
      if (err) {
        print(err);
        process.exit(1);
      }
      spinner.stop();
      print(_chalk2.default.green(`Files created in ${_chalk2.default.blue(`./${name}`)} directory.`));
      process.exit();
    });
  }
});