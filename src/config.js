import dotenv from 'dotenv';

export const env = { MODE: process.argv[2] };

dotenv.config({ path: process.argv[2] === 'DEV' ? './.env.development' : './.env.production' });

env.PORT = process.env.PORT;
env.MONGO_URL = process.env.MONGO_URL;
env.CLIENT_ID = process.env.CLIENT_ID;
env.GIT_KEY = process.env.GIT_KEY;
