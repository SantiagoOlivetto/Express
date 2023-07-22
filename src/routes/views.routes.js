import express from 'express';
import { productManager } from './products.routes.js';
import { productService } from '../services/products.service.js';
import { cartsService } from '../services/carts.service.js';
import { usersService } from '../services/users.service.js';
import { authUser } from '../middlewares/auth.js';
import passport from 'passport';

export const viewRoutes = express.Router();

// REALTIME PRODUCTS----------------------------

viewRoutes.get('/realtimeproducts', async (req, res) => {
  const products = await productManager.getProducts();
  return res.render('realTimeProducts', {
    title: 'Product list',
    style: 'realTimeProducts.css',
    products,
  });
});

// PRODUCTS-------------------------------------

viewRoutes.get('/products/:pid', async (req, res) => {
  const pid = req.params.pid;
  const product = await productService.findById(pid);
  return res.render('productId', {
    style: 'product.css',
    product,
  });
});

viewRoutes.get('/products', async (req, res) => {
  const name = req.session.firstName;
  const role = req.session.role;
  let { limit, page, sort, query } = req.query;
  const prodColl = await productService.findAll(limit, page, query, sort);
  const products = prodColl.docs.map((doc) => doc.toJSON());
  prodColl.prevLink != null ? (prodColl.prevLink = prodColl.prevLink.replace('/api', '')) : prodColl.prevLink;
  prodColl.nextLink != null ? (prodColl.nextLink = prodColl.nextLink.replace('/api', '')) : prodColl.nextLink;
  let arrPages = [];
  for (let i = 1; i <= prodColl.totalPages; i++) {
    arrPages.push(i);
  }

  return res.render('products', {
    title: 'Product list',
    style: 'realTimeProducts.css',
    products,
    prodColl,
    arrPages,
    name,
    role,
  });
});

// CART---------------------------------------

viewRoutes.get('/carts/:cid', async (req, res) => {
  const cId = req.params.cid;
  const cart = await cartsService.findById(cId);
  const cartProds = cart.products.map((prod) => prod.toJSON());

  return res.render('cart', {
    style: 'cart.css',
    cart,
    cartProds,
  });
});

// CHAT---------------------------------------
viewRoutes.get('/chat', (req, res) => {
  return res.render('chat', {
    style: 'chat.css',
  });
});

// SIGN UP---------------------------------------
viewRoutes.get('/signup', (req, res) => {
  return res.render('signup', {});
});
viewRoutes.post('/signup', passport.authenticate('singup', { failureRedirect: '/signup' }), async (req, res) => {
  if (!req.user) {
    let msg = 'Something went wrong';
    console.log(msg);
    return msg;
  }
  req.session.user = {
    _id: req.user._id,
    firstName: req.user.firstName,
    lasName: req.user.lastName,
    email: req.user.email,
    dob: req.user.dob,
    role: req.user.role,
  };
  res.redirect('/dashboard');
  /* const { firstName, lastName, email, dob, password } = req.body;
  const hashedPass = createHash(password);
  const newUser = usersService.createUser(firstName, lastName, email, dob, hashedPass); */

  //return res.render('signup', {});
});

// LOG IN---------------------------------------

viewRoutes.get('/login', (req, res) => {
  if (req.session.user) {
    return res.redirect('/dashboard');
  }
  return res.render('login', {
    style: 'login.css',
  });
});
viewRoutes.post('/login', passport.authenticate('login', { failureRedirect: '/!login' }), async (req, res) => {
  req.session.user = { _id: req.user._id, email: req.user.email, firstName: req.user.firstName, lastName: req.user.lastName, role: req.user.role };
  return res.redirect('/dashboard');
});

viewRoutes.get('/!login', (req, res) => {
  if (!req.user) {
    const msg = true;
    return res.render('login', {
      style: 'login.css',
      msg,
    });
  }
});

// DASHBOARD---------------------------------------
viewRoutes.get('/dashboard', authUser, (req, res) => {
  const userName = req.session.user.firstName;
  const role = req.session.user.role;

  return res.render('dashboard', {
    style: 'login.css',
    userName,
    role,
  });
});

// LOGOUT---------------------------------------
viewRoutes.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log('Error al destruir la sesión:', err);
    } else {
      res.redirect('/login');
    }
  });
});

// SESSION---------------------------------------
viewRoutes.get('/session', (req, res) => {
  if (req.session.counter) {
    req.session.counter++;
    res.send(`Se ha visitado el sitio ${req.session.counter} veces.`);
  } else {
    req.session.counter = 1;
    res.send('Welcome!!!');
  }
});
viewRoutes.get('/session/github', passport.authenticate('github', { scope: ['user:email'] }));

viewRoutes.get('/session/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
  req.session.user = req.user;
  res.redirect('http://localhost:8080/dashboard');
});

viewRoutes.get('/session/current', (req, res) => {
  return res.status(200).json({ status: 'OK', msg: 'Session data', payload: req.session.user || {} });
});
