import * as fs from 'fs';
import * as path from 'path';

import copydir from 'copy-dir';
import jsonfile from 'jsonfile';

import readTemplate from './readme-template';

export function copyModule(opt = {}, done) {
  const moduleTypes = {
    node: 'node-module-boilerplate',
    'node and browser': 'node-browser-module-boilerplate'
  };
  const fromPath = path.resolve(__dirname, '../../node_modules/', moduleTypes[opt.type]);
  const toPath = path.resolve(process.cwd(), opt.name);

  copydir(fromPath, toPath, (stat, filePath, fileName) => {
    if (stat === 'file' && fileName === 'README.md') {
      return false;
    }

    return true;
  }, done);
}

export function editPackageJson(pathDir, fields, done) {
  const jsonPath = path.resolve(pathDir, 'package.json');

  jsonfile.readFile(jsonPath, (err, pck) => {
    if (err) {
      return done(err);
    }

    const newPackage = Object.assign({}, pck, fields);

    jsonfile.writeFile(jsonPath, newPackage, { spaces: 2 }, done);
  });
}

export function createReadme(pathDir, { name, license, description }, done) {
  const readmePath = path.resolve(pathDir, 'README.md');

  const readme = readTemplate({ name, license, description });

  fs.writeFile(readmePath, readme, done);
}


export function getNewModuleBasePath(name) {
  return path.resolve(process.cwd(), name);
}


export function getCurrentDirBaseName() {
  return path.basename(process.cwd());
}


export function directoryExists(filePath) {
  try {
    return fs.statSync(filePath).isDirectory();
  } catch (err) {
    return false;
  }
}
