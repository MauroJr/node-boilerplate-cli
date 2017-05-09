'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = readmeTemplate;
function readmeTemplate({ name, description, license }) {
  return `${''}[![travis build](https://img.shields.io/travis/MY_GITHUB_USER/${name}.svg?style=flat)](https://travis-ci.org/MY_GITHUB_USER/${name})
[![Dependency Status](https://david-dm.org/MY_GITHUB_USER/${name}.svg?theme=shields.io)](https://david-dm.org/MY_GITHUB_USER/${name})
[![devDependency Status](https://david-dm.org/MY_GITHUB_USER/${name}/dev-status.svg?theme=shields.io)](https://david-dm.org/MY_GITHUB_USER/${name}#info=devDependencies)
[![Codecov](https://img.shields.io/codecov/c/github/MY_GITHUB_USER/${name}.svg)]()
[![${license} License](https://img.shields.io/github/license/MY_GITHUB_USER/${name}.svg?style=flat)](http://opensource.org/licenses/${license})
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat)](https://github.com/semantic-release/semantic-release)

## ${name}

${description}
`;
}
module.exports = exports['default'];