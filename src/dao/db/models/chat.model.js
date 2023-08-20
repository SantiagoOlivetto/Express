import { Schema, model } from "mongoose";

export const chatModel = model(
    'chat',
    new Schema ({
        user: {type: String, require: true, max: 100},
        message: {type: String, require: true}
    })
)