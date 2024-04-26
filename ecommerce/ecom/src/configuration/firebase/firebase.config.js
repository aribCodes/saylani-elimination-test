import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDq4T2s_qz2YmNOA3RHvWM7iWweu_qGTJk",
  authDomain: "ecom-bf348.firebaseapp.com",
  databaseURL: "https://ecom-bf348-default-rtdb.firebaseio.com",
  projectId: "ecom-bf348",
  storageBucket: "ecom-bf348.appspot.com",
  messagingSenderId: "869114026255",
  appId: "1:869114026255:web:f4f2bab0fd56c9ea29467a",
  measurementId: "G-2C2JZNHFB0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db  = getDatabase(app);
export const storage =getStorage(app)