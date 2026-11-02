import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC7AMVf8AM4c7yQeZN-lGcPn3VriCHrlJ0",
  authDomain: "shreejihomes-11f49.firebaseapp.com",
  projectId: "shreejihomes-11f49",
  storageBucket: "shreejihomes-11f49.firebasestorage.app",
  messagingSenderId: "274498443130",
  appId: "1:274498443130:web:fa989552232852c15da8c3"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);