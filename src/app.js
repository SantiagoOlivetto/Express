import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import { __dirname} from './utils/utils.js'
import { routerProducts } from "./routes/products.routes.js";
import { productManager } from "./controllers/ProductManager.js";
import { routerViewProducts } from "./routes/products.view.router.js";
import {viewRouter} from "./routes/views.router.js"
import { routerCarts } from "./routes/carts.routes.js";
import { connectMongo } from "./utils/connections.js";
import { routerChat } from "./routes/chat.routes.js";
import { chatService } from "./services/chat.service.js";

const app = express();
const port = 8080;
connectMongo();
const httpServer = app.listen(port, ()=>console.log(`Listening on port ${port}`))
const socketServer = new Server(httpServer)

app.use(express.json());
app.use(express.urlencoded({extended: true}))

// HANDLEBARS ENGINE SETTINGS
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
        const adddedProduct = await productManager.addProducts(title, description, category, price, thumbnail, code, stock, status)

        socket.emit('productAdded', adddedProduct);
    })

    // Delete product reciever
    socket.on('deleteProduct', async productId => {
        const deletedProduct = await productManager.deleteProduct(productId)
        socket.emit('productDeleted', deletedProduct.title);
    })

    // Chat
    socket.on("user_name_input", (msg) => {
        console.log(msg);
    })
    socket.on("sendMessage", async (msg) => {
        const newMsgRecived = await chatService.newMessagge(msg.sender, msg.msg)
        const chatLog = await chatService.getChat()
        socketServer.emit('chat_update', {
            log: chatLog
        })
        return newMsgRecived
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
// Chat view
app.use('/chat', routerChat)

app.get('*', (req, res) => {
    res.status(404).send("ERROR 404 : The website you were trying to reach couldn't be found on the server.")
})

