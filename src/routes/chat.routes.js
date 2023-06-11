import  express from "express"

export const routerChat = express.Router()

routerChat.get('/', (req, res) => {
    return res.render("chat", {
        style: 'chat.css',
    })
})