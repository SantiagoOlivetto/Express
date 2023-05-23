import express from "express";
import handlebars from "express-handlebars";
import { __dirname} from './utils.js'
import { routerProducts } from "./routes/products.routes.js";
import { routerViewProducts } from "./routes/products.view.router.js";
import { routerCarts } from "./routes/carts.routes.js";

const app = express();
const port = 8080
app.use(express.json());
app.use(express.urlencoded({extended: true}))

//CONFIGURACION DEL MOTOR DE HANDLEBARS
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static((__dirname + '/public')))

// index endpoint
app.get('/', (req, res) => {
    let option = {
        welcome: "Greetings internet surfer, here are some options for you",
        option1: "/view/products/(insert a id nomber here)"
    }
    res.render('index', option)
})
// products endpoint 
app.use('/api/products', routerProducts);
// cart endpoint
app.use('/api/carts', routerCarts);
// products view
app.use('/view/products', routerViewProducts)

app.listen(port, ()=> {
    console.log(`Example app listening on port ${port}`);
})

app.get('*', (req, res) => {
    res.status(404).send("ERROR 404 : The website you were trying to reach couldn't be found on the server.")
})

