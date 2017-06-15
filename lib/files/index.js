'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.copyModule = copyModule;
exports.editPackageJson = editPackageJson;
exports.createReadme = createReadme;
exports.getNewModuleBasePath = getNewModuleBasePath;
exports.getCurrentDirBaseName = getCurrentDirBaseName;
exports.directoryExists = directoryExists;

var _fs = require('fs');

var fs = _interopRequireWildcard(_fs);

var _path = require('path');

var path = _interopRequireWildcard(_path);

var _copyDir = require('copy-dir');

var _copyDir2 = _interopRequireDefault(_copyDir);

var _jsonfile = require('jsonfile');

var _jsonfile2 = _interopRequireDefault(_jsonfile);

var _readmeTemplate = require('./readme-template');

var _readmeTemplate2 = _interopRequireDefault(_readmeTemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function copyModule(opt = {}, done) {
  const moduleTypes = {
    node: 'node-module-boilerplate',
    'node and browser': 'node-browser-module-boilerplate'
  };
  const fromPath = path.resolve(__dirname, '../../node_modules/', moduleTypes[opt.type]);
  const toPath = path.resolve(process.cwd(), opt.name);

  (0, _copyDir2.default)(fromPath, toPath, (stat, filePath, fileName) => {
    if (stat === 'file' && fileName === 'README.md') {
      return false;
    }

    return true;
  }, done);
}

function editPackageJson(pathDir, fields, done) {
  const jsonPath = path.resolve(pathDir, 'package.json');

  _jsonfile2.default.readFile(jsonPath, (err, pck) => {
    if (err) {
      return done(err);
    }

    const newPackage = Object.assign({}, pck, fields);

    _jsonfile2.default.writeFile(jsonPath, newPackage, { spaces: 2 }, done);
  });
}

function createReadme(pathDir, { name, license, description }, done) {
  const readmePath = path.resolve(pathDir, 'README.md');

  const readme = (0, _readmeTemplate2.default)({ name, license, description });

  fs.writeFile(readmePath, readme, done);
}

function getNewModuleBasePath(name) {
  return path.resolve(process.cwd(), name);
}

function getCurrentDirBaseName() {
  return path.basename(process.cwd());
}

function directoryExists(filePath) {
  try {
    return fs.statSync(filePath).isDirectory();
  } catch (err) {
    return false;
  }
}