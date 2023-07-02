import { connect } from 'mongoose';
import fs from 'fs';

const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
export const mongoURI = config.mongoURI;
export async function connectMongo() {
  try {
    await connect(mongoURI);
    console.log('Plug to MongoDB');
  } catch (e) {
    console.log(e);
    throw 'Connection to mongoDB failed';
  }
}
