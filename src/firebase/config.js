import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyD9JNVQ-xy6pLgUuydi_JlyfiYFW2z42F4",
    authDomain: "pop-a-balloon-ef79b.firebaseapp.com",
    projectId: "pop-a-balloon-ef79b",
    storageBucket: "pop-a-balloon-ef79b.firebasestorage.app",
    messagingSenderId: "707644975832",
    appId: "1:707644975832:web:b2055e40cfab91728085ad"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);