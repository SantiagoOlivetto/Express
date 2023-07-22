import { connect } from 'mongoose';
import { env } from '../config.js';

export async function connectMongo() {
  try {
    await connect(env.MONGO_URL);
    console.log('Plug to MongoDB');
  } catch (e) {
    console.log(e);
    throw 'Connection to mongoDB failed';
  }
}
