// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC4psVkpML8HYKUxBhiR-7HlEjnT-XY0yg",
  authDomain: "invoice-generator-2d1c4.firebaseapp.com",
  projectId: "invoice-generator-2d1c4",
  storageBucket: "invoice-generator-2d1c4.firebasestorage.app",
  messagingSenderId: "880908435073",
  appId: "1:880908435073:web:13c223ecb71bd3da595780"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
