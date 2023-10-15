import dotenv from 'dotenv';

export const env = { MODE: process.argv[2] };

switch (process.argv[2]) {
  case 'PROD':
    dotenv.config({ path: './.env.production' });
  case 'DEV':
    dotenv.config({ path: './.env.development' });
    break;
  case 'TEST':
    dotenv.config({ path: './.env.testing' });
    break;
  default:
    throw new Error('NODE_ENV not set or unsupported environment');
}

env.PORT = process.env.PORT;
env.PERSISTENCE = process.env.PERSISTENCE;
env.MONGO_URL = process.env.MONGO_URL;
env.CLIENT_ID = process.env.CLIENT_ID;
env.GIT_KEY = process.env.GIT_KEY;
