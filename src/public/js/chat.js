const socket = io();
const getUserData = document.getElementById('userData')
const messageInput = document.getElementById('message-input')
const sendMessage = document.getElementById('sendMessage')
const chatLog = document.getElementById('chatLog')

let userName = ""

getUserData.addEventListener('submit', (event) => {
    event.preventDefault()
    return userName = document.getElementById('userName').value
})
getUserData.addEventListener('submit', () => {
    socket.emit("user_name_input",{
        user: userName
    }) 
})
sendMessage.addEventListener('click', () => {
    const  userMessage = messageInput.value
    socket.emit("sendMessage", {
        msg: userMessage,
        sender: userName
    })
})
socket.on('chat_update', (log) => {
    const arrLog = log.log
    let content = ""
    arrLog.forEach(msgSended => {
        content = content + `<p>${msgSended.user} says: ${msgSended.message}</p>`
    });
    chatLog.innerHTML = content;
    window.scrollTo(0, document.body.scrollHeight);
})