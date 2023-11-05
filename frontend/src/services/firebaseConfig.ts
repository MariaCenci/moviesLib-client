
import { initializeApp } from "firebase/app";
import { getAuth } from "@firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBvubYR73DkoRjOC8I8coUxnYSY6x5qUMw",
  authDomain: "movieslib-auth.firebaseapp.com",
  projectId: "movieslib-auth",
  storageBucket: "movieslib-auth.appspot.com",
  messagingSenderId: "514800161919",
  appId: "1:514800161919:web:9c0c215e929f616ca15b4a"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)