import chalk from 'chalk';

const timeStamp = () => chalk.gray(new Date().toISOString());

export const logInfo = (msg) => {
  console.log(`${timeStamp()} ${chalk.blue('[INFO]')} ${msg}`);
};

export const logSuccess = (msg) => {
  console.log(`${timeStamp()} ${chalk.green('[SUCCESS]')} ${msg}`);
};

export const logWarn = (msg) => {
  console.warn(`${timeStamp()} ${chalk.yellow('[WARN]')} ${msg}`);
};

export const logError = (msg) => {
  console.error(`${timeStamp()} ${chalk.red('[ERROR]')} ${msg}`);
};

export const logPing = (msg) => {
  console.log(`${timeStamp()} ${chalk.magenta('[PING]')} ${msg}`);
};
