import { collection, query, getDocs, addDoc } from 'firebase/firestore';
import { db } from './database';

const extractData = (querySnapshot) => {
  const data = [];

  querySnapshot.forEach((doc) => {
    if (doc.data()) {
      data.push(doc.data());
    }
  });

  return data;
};

const getChats = async () => {
  const q = query(collection(db, 'chats'));

  const querySnapshot = await getDocs(q);

  return extractData(querySnapshot);
};

const addChat = async (id) => {
  const q = query(collection(db, 'chats'));

  const querySnapshot = await getDocs(q);

  const chats = extractData(querySnapshot);

  const isChatExist = chats.find((chatId) => chatId.id === id);

  if (!isChatExist) {
    await addDoc(collection(db, 'chats'), {
      id: id,
    });
  }
};

const getTransactions = async () => {
  const q = query(collection(db, 'transactions'));

  const querySnapshot = await getDocs(q);
  const data = extractData(querySnapshot);
  return data;
};

export { getChats, addChat, getTransactions };
