// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: "recipe-2c4b7.firebaseapp.com",
    projectId: "recipe-2c4b7",
    storageBucket: "recipe-2c4b7.appspot.com",
    messagingSenderId: "434733557953",
    appId: "1:434733557953:web:5a43f7819dc65eebd80c40"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);