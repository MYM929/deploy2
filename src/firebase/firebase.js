import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAleARi8B8XdD1bmRQBAKHp_upA0WBM8jY",
  authDomain: "birthday-2b2b9.firebaseapp.com",
  projectId: "birthday-2b2b9",
  storageBucket: "birthday-2b2b9.appspot.com",
  messagingSenderId: "1040015185245",
  appId: "1:1040015185245:web:a60fb6f2a9e78c061c04b4",
  measurementId: "G-56J8562X2B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage();

