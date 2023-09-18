const TelegramBot = require('node-telegram-bot-api');

const token = '6537097612:AAFLf_NsnT5ClUuoIc-5hbuvG0SyUPZX8Ew';

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];

  bot.sendMessage(chatId, resp);
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'Received your message');
});
