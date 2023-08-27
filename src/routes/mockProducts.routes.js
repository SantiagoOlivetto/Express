import express from 'express';
import { mockingController } from '../controllers/mockinPorducts.controller.js';
export const mockRoutes = express.Router();

mockRoutes.get('/', mockingController.get);
