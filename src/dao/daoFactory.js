import { env } from '../config.js';
import mongoose from 'mongoose';
import { logger } from '../utils/logger.js';

export let usersService;

switch (env.PERSISTENCE) {
  case 'db':
    try {
      await mongoose.connect(env.MONGO_URL);
      logger.info('Plug to MongoDB');
      const { usersService: usersMongo } = await import('../services/users.service.js');
      usersService = usersMongo;
    } catch (e) {
      throw 'Connection to mongoDB failed' + e;
    }
    break;
  case 'mem':
    logger.info('Testing on memory running');
    const { usersService: usersMem } = await import('./mem/users.memory.js');
    logger.info(usersMem);
    usersService = usersMem;
    break;
}
