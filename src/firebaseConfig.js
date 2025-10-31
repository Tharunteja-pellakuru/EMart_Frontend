// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCsZT7kchSvao4z9rigqz6w1p8zpANHO2Y",
  authDomain: "emart-dceb9.firebaseapp.com",
  projectId: "emart-dceb9",
  storageBucket: "emart-dceb9.firebasestorage.app",
  messagingSenderId: "598518619157",
  appId: "1:598518619157:web:bd71e79c7676180479c21c",
  measurementId: "G-G6F3E2M0T7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export { app, auth, RecaptchaVerifier, signInWithPhoneNumber };
