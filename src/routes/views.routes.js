import express from 'express';
import { authAdmin, authClient, authUser } from '../middlewares/auth.js';
import passport from 'passport';
import { productsController } from '../controllers/products.controller.js';
import { cartsController } from '../controllers/carts.controller.js';
import { chatController } from '../controllers/chat.controller.js';
import { signUpController } from '../controllers/users.controller.js';
import { logInController } from '../controllers/users.controller.js';
import { dashboardController } from '../controllers/dashboard.controller.js';
import { logOutController } from '../controllers/users.controller.js';
import { sessionsController } from '../controllers/sessions.controllers.js';
import { realTimeProdController } from '../controllers/realtimeproducts.controller.js';
import { orderController } from '../controllers/orders.controller.js';

export const viewRoutes = express.Router();

// REALTIME PRODUCTS----------------------------

viewRoutes.get('/realtimeproducts', authAdmin, realTimeProdController.get);

// PRODUCTS-------------------------------------

viewRoutes.get('/products/:pid', authUser, productsController.getOne);
viewRoutes.put('/products/:pid', authAdmin, productsController.update);

viewRoutes.get('/products', authUser, authClient, productsController.getAll);

// CART---------------------------------------

viewRoutes.get('/carts/:cid', authUser, authClient, cartsController.get);
viewRoutes.post('/carts/:pid', authUser, cartsController.post);

// CART TO ORDER------------------------------
viewRoutes.post('/carts/:cid/purchase', authUser, authClient, orderController.post);

// ORDER-------------------------------------
viewRoutes.get('/orders/:oid', authUser, authClient, orderController.get);
viewRoutes.post('/orders/:oid/confirmation', authUser, authClient, orderController.confirmPost);
viewRoutes.get('/orders/:oid/confirmation', authUser, authClient, orderController.confirmGet);

// CHAT---------------------------------------
viewRoutes.get('/chat', authClient, chatController.get);

// SIGN UP---------------------------------------
viewRoutes.get('/signup', signUpController.get);
viewRoutes.post('/signup', signUpController.postSesh);

// LOG IN---------------------------------------
viewRoutes.get('/login', logInController.get);
viewRoutes.get('/!login', logInController.noGet);
viewRoutes.post('/login', logInController.post);

// DASHBOARD---------------------------------------
viewRoutes.get('/dashboard', authUser, dashboardController.get);

// LOGOUT---------------------------------------
viewRoutes.get('/logout', logOutController.get);

// SESSION---------------------------------------
viewRoutes.get('/session', sessionsController.getCount);
viewRoutes.get('/session/github', passport.authenticate('github', { scope: ['user:email'] }));

viewRoutes.get('/sessions/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), sessionsController.getGHCallback);

viewRoutes.get('/session/current', sessionsController.getCurrent);
