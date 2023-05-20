import express from "express";
import { routerProducts } from "./routes/products.routes.js";
import { routerCarts } from "./routes/carts.routes.js";

const app = express();
const port = 8080
app.use(express.urlencoded({extended: true}))


app.get('/', (req, res) => {
    res.status(200).send( "Welcome to my product manager API")
})

// products endpoint 
app.use('/api/products', routerProducts);
// cart endpoint
app.use('/api/carts', routerCarts);

app.listen(port, ()=> {
    console.log(`Example app listening on port ${port}`);
})

app.get('*', (req, res) => {
    res.status(404).send("ERROR 404 : The website you were trying to reach couldn't be found on the server.")
})

