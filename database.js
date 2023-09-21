import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCbRu5dtazuzzW9kLUXdA5Gd9_SyaVt6Vc',
  authDomain: 'crypto-9f12c.firebaseapp.com',
  databaseURL: 'https://crypto-9f12c-default-rtdb.firebaseio.com',
  projectId: 'crypto-9f12c',
  storageBucket: 'crypto-9f12c.appspot.com',
  messagingSenderId: '428435514719',
  appId: '1:428435514719:web:067239b06f450d1ed142ea',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export default db;
