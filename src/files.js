import * as fs from 'fs';
import copydir from 'copy-dir';
import * as path from 'path';


export default Object.freeze({
  getCurrentDirectoryBase,

  copyModule,

  directoryExists
});


export function copyModule(moduleName, toFolder, done) {
  const fromPath = path.resolve(__dirname, '../node_modules/', moduleName);
  const toPath = path.resolve(process.cwd(), toFolder);

  copydir(fromPath, toPath, (stat, filePath, fileName) => {
    if (stat === 'file' && fileName === 'README.md') {
      return false;
    }

    return true;
  }, done);
}


export function getCurrentDirectoryBase() {
  return path.basename(process.cwd());
}


export function directoryExists(filePath) {
  try {
    return fs.statSync(filePath).isDirectory();
  } catch (err) {
    return false;
  }
}
