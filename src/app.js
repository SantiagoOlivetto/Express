import express from 'express';
import session from 'express-session';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import { __dirname } from './utils/utils.js';
import { routerProducts } from './routes/products.routes.js';
import { mockRoutes } from './routes/mockProducts.routes.js';
import { viewRoutes } from './routes/views.routes.js';
import { routerCarts } from './routes/carts.routes.js';
import { productManager } from './dao/fs/ProductManager.js';
import { chatService } from './services/chat.service.js';
import MongoStore from 'connect-mongo';
import { iniPassport } from './config/passport.config.js';
import passport from 'passport';
import { env } from './config.js';
import errHandler from './middlewares/err.js';
import expressAsyncErrors from 'express-async-errors';
import { logger } from './utils/logger.js';
import swaggerUiExpress from 'swagger-ui-express';
import { specs } from './utils/swagger.js';
import { productService } from './services/products.service.js';

export const app = express();
const port = env.PORT;
const httpServer = app.listen(port, () => logger.info(`Listening on port http://localhost:${port}/`));
const socketServer = new Server(httpServer);
// Swagger setup
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// HANDLEBARS ENGINE SET
app.engine(
  'handlebars',
  handlebars.engine({
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
);
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
// SESSION SET
app.use(
  session({
    store: MongoStore.create({ mongoUrl: env.MONGO_URL }),
    secret: 'e-commercePass',
    resave: true,
    saveUninitialized: true,
  })
);

//PASSPORT INIT
iniPassport();
app.use(passport.initialize());
app.use(passport.session());

socketServer.on('connection', (socket) => {
  logger.info(`New connection: ID ${socket.id}`);

  // new product reciever
  socket.on('addProduct', async (newProduct) => {
    const { title, description, category, price, thumbnail, code, stock, status } = newProduct;
    const adddedProduct = await productService.createProduct(title, description, category, price, thumbnail, code, stock, status);

    socket.emit('productAdded', adddedProduct);
  });

  // Delete product reciever
  socket.on('deleteProduct', async (productId) => {
    const deletedProduct = await productService.deleteProduct(productId);
    deletedProduct ? socket.emit('productDeleted', deletedProduct.title) : socket.emit('productDeleted', deletedProduct);
  });

  // Chat
  socket.on('user_name_input', (msg) => {
    logger.info(msg);
  });
  socket.on('sendMessage', async (msg) => {
    const newMsgRecived = await chatService.newMessagge(msg.sender, msg.msg);
    const chatLog = await chatService.getChat();
    socketServer.emit('chat_update', {
      log: chatLog,
    });
    return newMsgRecived;
  });

  // Show handshake finalization
  socket.on('disconnect', () => {
    logger.info(`Connection finished: ID ${socket.id}`);
  });
});

// index endpoint
app.get('/', (req, res) => {
  res.redirect('/login');
});
// products endpoint
app.use('/api/products', routerProducts);
// cart endpoint
app.use('/api/carts', routerCarts);
// View endpoint
app.use('/', viewRoutes);
// Mock products
app.use('/mockingproducts', mockRoutes);
// Errors catcher
app.use(errHandler);

app.get('*', (req, res) => {
  res.status(404).send("ERROR 404 : The website you were trying to reach couldn't be found on the server.");
});
