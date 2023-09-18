import TelegramBot from 'node-telegram-bot-api';
import env from 'dotenv';
env.config();

console.log(process.env.TOKEN);
const bot = new TelegramBot(process.env.TOKEN, { polling: true });

bot.on('message', (msg) => {
  const {
    chat: { id },
  } = msg;

  bot.sendMessage(id, 'Pong');
});
