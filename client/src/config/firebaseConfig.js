// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "auth-project-3e73a.firebaseapp.com",
  projectId: "auth-project-3e73a",
  storageBucket: "auth-project-3e73a.appspot.com",
  messagingSenderId: "245387579511",
  appId: "1:245387579511:web:29993f724b693cba5c7672",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
