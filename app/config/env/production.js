import 'dotenv/config';

export default {
  DATABASE_URL: process.env.DATABASE_PROD_URL,
  HOST: process.env.APP_HOST,
  API_VERSION: process.env.API_VERSION,
};
