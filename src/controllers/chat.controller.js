class ChatController {
  async get(req, res) {
    return res.render('chat', {
      style: 'chat.css',
    });
  }
}

export const chatController = new ChatController();
