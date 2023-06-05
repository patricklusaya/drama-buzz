// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider,signInWithPopup} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCj1-fpA026GBM0K6G0WM5nUP2lrxVjO-c",
  authDomain: "drama-buzz.firebaseapp.com",
  projectId: "drama-buzz",
  storageBucket: "drama-buzz.appspot.com",
  messagingSenderId: "603424020843",
  appId: "1:603424020843:web:2cfde7b0e4d415fb08142e",
  measurementId: "G-BBM1JETLDL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);