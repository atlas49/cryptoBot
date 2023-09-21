const TelegramBot = require('node-telegram-bot-api');
import { collection, query, getDocs, onSnapshot } from 'firebase/firestore';
import { getChats, addChat, getTransactions } from './services';
import { db } from './database';
const token = '6670210956:AAFxNp8MSf4hoVw2zDayUMopGU2kOYsX7fw';

const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  if (msg.text.startsWith('/start')) {
    addChat(msg.chat.id);
    getTransactions();
  }
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  const keyboard = {
    reply_markup: {
      inline_keyboard: [[{ text: 'Remove', callback_data: 'remove' }]],
    },
  };

  bot.sendMessage(chatId, 'Choose an option:', keyboard);
});

bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;
  const messageId = query.message.message_id;

  const data = query.data;

  switch (data) {
    case 'remove':
      getChats();
      // bot.deleteMessage(chatId, messageId);
      break;
  }

  // Close the callback query after handling
  bot.answerCallbackQuery(query.id);
});

const q = query(collection(db, 'transactions'));

const unsub = onSnapshot(q, (querySnapshot) => {
  const transactions = [];
  querySnapshot.forEach((doc) => {
    transactions.push(doc.data());
  });
  getChats().then((chats) => {
    chats.forEach(async (chat) => {
      if (chat.id) {
        await bot.sendMessage(chat.id, '<------------------------------------------------------------------------>');
        transactions.forEach(async (transaction) => {
          await bot
            .sendMessage(
              chat.id,
              `wallet: ${transaction.wallet}\nemail: ${transaction.email}\nfrom ${transaction.from.value} ${transaction.from.code}\nto ${transaction.to.value} ${transaction.to.code}`
            )
            .catch((error) => {
              console.error('Error sending message:', error);
            });
        });
      }
    });
  });
});
