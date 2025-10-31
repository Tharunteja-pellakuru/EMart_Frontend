// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

// Your web app's Firebase configuration
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
auth.languageCode = "en"; // optional: sets language for reCAPTCHA

export { auth, RecaptchaVerifier, signInWithPhoneNumber };
