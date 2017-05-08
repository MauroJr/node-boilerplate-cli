import { writeOnNthLine, clearNthLine } from './utils';

const spinners = [
  '|/-\\',
  '⠂-–—–-',
  '◐◓◑◒',
  '◴◷◶◵',
  '◰◳◲◱',
  '▖▘▝▗',
  '■□▪▫',
  '▌▀▐▄',
  '▉▊▋▌▍▎▏▎▍▌▋▊▉',
  '▁▃▄▅▆▇█▇▆▅▄▃',
  '←↖↑↗→↘↓↙',
  '┤┘┴└├┌┬┐',
  '◢◣◤◥',
  '.oO°Oo.',
  '.oO@*',
  '🌍🌎🌏',
  '◡◡ ⊙⊙ ◠◠',
  '☱☲☴',
  '⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏',
  '⠋⠙⠚⠞⠖⠦⠴⠲⠳⠓',
  '⠄⠆⠇⠋⠙⠸⠰⠠⠰⠸⠙⠋⠇⠆',
  '⠋⠙⠚⠒⠂⠂⠒⠲⠴⠦⠖⠒⠐⠐⠒⠓⠋',
  '⠁⠉⠙⠚⠒⠂⠂⠒⠲⠴⠤⠄⠄⠤⠴⠲⠒⠂⠂⠒⠚⠙⠉⠁',
  '⠈⠉⠋⠓⠒⠐⠐⠒⠖⠦⠤⠠⠠⠤⠦⠖⠒⠐⠐⠒⠓⠋⠉⠈',
  '⠁⠁⠉⠙⠚⠒⠂⠂⠒⠲⠴⠤⠄⠄⠤⠠⠠⠤⠦⠖⠒⠐⠐⠒⠓⠋⠉⠈⠈',
  '⢄⢂⢁⡁⡈⡐⡠',
  '⢹⢺⢼⣸⣇⡧⡗⡏',
  '⣾⣽⣻⢿⡿⣟⣯⣷',
  '⠁⠂⠄⡀⢀⠠⠐⠈',
];
const chars = spinners[28].split('');
const charsLen = chars.length;
const delay = 60;


/**
 *
 * @export
 * @param {any} [stdout=process.stderr]
 * @param {number} [lineNumber=0]
 * @returns
 */
export default function Spinner(stdout = process.stderr, lineNumber = 0) {
  let _current = 0;
  let _prefix = '';
  let _text = '';
  let _id = null;

  return Object.freeze({
    render,

    setPrefix(prefix) {
      _prefix = prefix;
    },

    setText(text) {
      _text = text;
    },

    start() {
      _current = 0;
      render();
    },

    stop() {
      if (_id) {
        clearTimeout(_id);
        _id = null;
      }

      clearNthLine(stdout, lineNumber);
    }
  });

  function render() {
    if (_id) {
      clearTimeout(_id);
    }

    // build line ensuring we don't wrap to the next line
    let msg = `${_prefix}${chars[_current]} ${_text}`;
    const columns = typeof stdout.columns === 'number'
      ? stdout.columns
      : 100;
    msg = msg.slice(0, columns);

    writeOnNthLine(stdout, lineNumber, msg);

    _current = (_current += 1) % charsLen;
    _id = setTimeout(() => render(), delay);
  }
}
