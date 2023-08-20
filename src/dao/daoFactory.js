import { env } from '../config.js';
import mongoose from 'mongoose';

export let usersService;

switch (env.PERSISTENCE) {
  case 'db':
    try {
      await mongoose.connect(env.MONGO_URL);
      console.log('Plug to MongoDB');
      const { usersService: usersMongo } = await import('../services/users.service.js');
      usersService = usersMongo;
    } catch (e) {
      console.log(e);
      throw 'Connection to mongoDB failed';
    }
    break;
  case 'mem':
    console.log('Testing on memory running');
    const { usersService: usersMem } = await import('./mem/users.memory.js');
    console.log(usersMem);
    usersService = usersMem;
    break;
}
