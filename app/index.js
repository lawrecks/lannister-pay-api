/* eslint-disable no-undef */
import express from 'express';
import config, { initConfig } from './config';
import Logger from './config/logger';
import redisConfig from './config/redis';

const app = express();
const host = config.HOST;
const port = config.PORT || 3033;
const apiVersion = config.API_VERSION || 'v1';

const logger = Logger.createLogger({ label: 'LANNISTER-API' });
global.logger = logger;

initConfig(app);

redisConfig()
  .then(() => {
    app.listen(port, () => {
      logger.info(`Server started at ${host}:${port}/api/${apiVersion}/`);
    });
  })
  .catch((err) => {
    logger.error('Redis connection failed', err);
  });

export default app;
