// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAkUMTPxMNemklO2JIMpwc3ga7Vswq20r0",
  authDomain: "tuesdayclass-a0560.firebaseapp.com",
  projectId: "tuesdayclass-a0560",
  storageBucket: "tuesdayclass-a0560.appspot.com",
  messagingSenderId: "684619420346",
  appId: "1:684619420346:web:ed917e641ea9a409e06883"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);