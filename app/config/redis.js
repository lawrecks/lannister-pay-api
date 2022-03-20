/* eslint-disable no-undef */
import { createClient } from 'redis';

const redisConfig = async () => {
  const client = createClient();
  client.on('error', (err) => logger.error('Redis Client Error', err));
  await client.connect();
  logger.info('Redis connected!');
  global.client = client;
};

export default redisConfig;
