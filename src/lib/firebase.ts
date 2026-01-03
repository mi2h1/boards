import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyB4XXVroUK7rzA3I-UQih0wFiQ2eOl8toU",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "incan-neo.firebaseapp.com",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://incan-neo-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "incan-neo",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "incan-neo.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "970322761382",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:970322761382:web:a123a5b96a34b90264c667"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
