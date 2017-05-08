'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.copyModule = copyModule;
exports.getCurrentDirectoryBase = getCurrentDirectoryBase;
exports.directoryExists = directoryExists;

var _fs = require('fs');

var fs = _interopRequireWildcard(_fs);

var _copyDir = require('copy-dir');

var _copyDir2 = _interopRequireDefault(_copyDir);

var _path = require('path');

var path = _interopRequireWildcard(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = Object.freeze({
  getCurrentDirectoryBase,

  copyModule,

  directoryExists
});
function copyModule(moduleName, toFolder, done) {
  const fromPath = path.resolve(__dirname, '../node_modules/', moduleName);
  const toPath = path.resolve(process.cwd(), toFolder);

  (0, _copyDir2.default)(fromPath, toPath, (stat, filePath, fileName) => {
    if (stat === 'file' && fileName === 'README.md') {
      return false;
    }

    return true;
  }, done);
}

function getCurrentDirectoryBase() {
  return path.basename(process.cwd());
}

function directoryExists(filePath) {
  try {
    return fs.statSync(filePath).isDirectory();
  } catch (err) {
    return false;
  }
}