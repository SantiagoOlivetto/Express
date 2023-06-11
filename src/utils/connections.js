import {connect} from "mongoose";

export async function connectMongo() {
    try {
        await connect(
            "mongodb+srv://santiolivetto:fuvpA6zHzTC4lX5V@cluster0.f7jkd3j.mongodb.net/ecommerce?retryWrites=true&w=majority"
        );
        console.log("Plug to MongoDB");
    }catch (e) {
        console.log(e);
        throw "Connection to mongoDB failed"
    }
}