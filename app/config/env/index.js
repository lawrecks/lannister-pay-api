import rootPath from 'app-root-path';
import development from './development';
import test from './test';

const { PORT, NODE_ENV, REDIS_PORT } = process.env;

const currentEnv = {
  development,
  test,
}[NODE_ENV || 'development'];

export default {
  ...process.env,
  ...currentEnv,
  rootPath,
  PORT,
  NODE_ENV,
  REDIS_PORT,
};
