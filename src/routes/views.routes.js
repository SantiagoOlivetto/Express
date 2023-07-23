import express from 'express';
import { authUser } from '../middlewares/auth.js';
import passport from 'passport';
import { productsController } from '../controllers/products.controller.js';
import { cartsController } from '../controllers/carts.controller.js';
import { chatController } from '../controllers/chat.controller.js';
import { signUpController } from '../controllers/signup.controller.js';
import { logInController } from '../controllers/login.controller.js';
import { dashboardController } from '../controllers/dashboard.controller.js';
import { logOutController } from '../controllers/logout.controller.js';
import { sessionsController } from '../controllers/sessions.controllers.js';
import { realTimeProdController } from '../controllers/realtimeproducts.controller.js';

export const viewRoutes = express.Router();

// REALTIME PRODUCTS----------------------------

viewRoutes.get('/realtimeproducts', realTimeProdController.get);

// PRODUCTS-------------------------------------

viewRoutes.get('/products/:pid', productsController.getOne);

viewRoutes.get('/products', productsController.getAll);

// CART---------------------------------------

viewRoutes.get('/carts/:cid', cartsController.get);

// CHAT---------------------------------------
viewRoutes.get('/chat', chatController.get);

// SIGN UP---------------------------------------
viewRoutes.get('/signup', signUpController.get);
viewRoutes.post('/signup', passport.authenticate('singup', { failureRedirect: '/signup' }), signUpController.postSesh);

// LOG IN---------------------------------------

viewRoutes.get('/login', logInController.get);
viewRoutes.get('/!login', logInController.noGet);
viewRoutes.post('/login', passport.authenticate('login', { failureRedirect: '/!login' }), logInController.post);

// DASHBOARD---------------------------------------
viewRoutes.get('/dashboard', authUser, dashboardController.get);

// LOGOUT---------------------------------------
viewRoutes.get('/logout', logOutController.get);

// SESSION---------------------------------------
viewRoutes.get('/session', sessionsController.getCount);
viewRoutes.get('/session/github', passport.authenticate('github', { scope: ['user:email'] }));

viewRoutes.get('/session/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), sessionsController.getGHCallback);

viewRoutes.get('/session/current', sessionsController.getCurrent);
