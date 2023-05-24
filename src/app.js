import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import { __dirname} from './utils/utils.js'
import { routerProducts } from "./routes/products.routes.js";
import { productManager } from "./controllers/ProductManager.js";
import { routerViewProducts } from "./routes/products.view.router.js";
import {viewRouter} from "./routes/views.router.js"
import { routerCarts } from "./routes/carts.routes.js";

const app = express();
const port = 8080;
const httpServer = app.listen(port, ()=>console.log(`Listening on port ${port}`))
const socketServer = new Server(httpServer)

app.use(express.json());
app.use(express.urlencoded({extended: true}))

//CONFIGURACION DEL MOTOR DE HANDLEBARS
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static((__dirname + '/public')))
app.use('/', viewRouter)

socketServer.on('connection', socket => {
    console.log(`New connection: ID ${socket.id}`)

    // new product reciever
    socket.on('addProduct', async newProduct => {
        const {title, description, category, price, thumbnail, code, stock, status} = newProduct
        await productManager.addProducts(title, description, category, price, thumbnail, code, stock, status)
    })

    // Delete product reciever
    socket.on('deleteProduct', async productId => {
        await productManager.deleteProduct(productId)
    })

    // Show handshake finalization
    socket.on('disconnect', () => {
        console.log(`Connection finished: ID ${socket.id}`);
    })
})


// index endpoint
app.get('/', (req, res) => {
    let option = {
        welcome: "Greetings internet surfer, here are some options for you",
        option1: "/view/products/(insert a id nomber here or not)",
        style: 'main.css'
    }
    res.render('index', option)
})
// products endpoint 
app.use('/api/products', routerProducts);
// cart endpoint
app.use('/api/carts', routerCarts);
// products view
app.use('/products', routerViewProducts)

app.get('*', (req, res) => {
    res.status(404).send("ERROR 404 : The website you were trying to reach couldn't be found on the server.")
})

