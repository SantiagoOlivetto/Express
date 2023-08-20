import { chatModel } from '../dao/db/models/chat.model.js';

class ChatService {
  async newMessagge(user, message) {
    const msg = { user, message };
    const messageRecived = await chatModel.create({ user, message });
    return messageRecived;
  }
  async getChat() {
    const allMessages = await chatModel.find();
    console.log(allMessages);
    return allMessages;
  }
}

export const chatService = new ChatService();
