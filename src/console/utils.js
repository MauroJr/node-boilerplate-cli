const readline = require('readline');
const { supportsColor } = require('chalk');

const CLEAR_WHOLE_LINE = 0;
const CLEAR_RIGHT_OF_CURSOR = 1;

export function clearLine(stdout) {
  if (!supportsColor) {
    return;
  }

  readline.clearLine(stdout, CLEAR_WHOLE_LINE);
  readline.cursorTo(stdout, 0, undefined);
}

export function toStartOfLine(stdout) {
  if (!supportsColor) {
    return;
  }

  readline.cursorTo(stdout, 0, undefined);
}

export function writeOnNthLine(stdout, n, msg) {
  if (!supportsColor) {
    return;
  }

  if (n === 0) {
    readline.cursorTo(stdout, 0, undefined);
    stdout.write(msg);
    readline.clearLine(stdout, CLEAR_RIGHT_OF_CURSOR);
    return;
  }
  readline.cursorTo(stdout, 0, undefined);
  readline.moveCursor(stdout, 0, -n);
  stdout.write(msg);
  readline.clearLine(stdout, CLEAR_RIGHT_OF_CURSOR);
  readline.cursorTo(stdout, 0, undefined);
  readline.moveCursor(stdout, 0, n);
}

export function clearNthLine(stdout, n) {
  if (!supportsColor) {
    return;
  }

  if (n === 0) {
    clearLine(stdout);
    return;
  }
  readline.cursorTo(stdout, 0, undefined);
  readline.moveCursor(stdout, 0, -n);
  readline.clearLine(stdout, CLEAR_WHOLE_LINE);
  readline.moveCursor(stdout, 0, n);
}
