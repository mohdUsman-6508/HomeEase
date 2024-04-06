// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "homeease-8440f.firebaseapp.com",
  projectId: "homeease-8440f",
  storageBucket: "homeease-8440f.appspot.com",
  messagingSenderId: "198693137669",
  appId: "1:198693137669:web:5405850d680e247237db6c",
  measurementId: "G-8K2VQY0DCR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app };
