// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCS82pWsW7ayi9UPydwdL2KI5KP-dvn99o",
  authDomain: "invoice-generator-bb9bf.firebaseapp.com",
  projectId: "invoice-generator-bb9bf",
  storageBucket: "invoice-generator-bb9bf.firebasestorage.app",
  messagingSenderId: "267674218649",
  appId: "1:267674218649:web:58d49b1aeca596a47f0808"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);