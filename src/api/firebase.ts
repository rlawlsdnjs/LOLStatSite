// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmkNVf2apBBFh-xgleKJ43JcFZiaZ3oPM",
  authDomain: "lolsite-7331d.firebaseapp.com",
  projectId: "lolsite-7331d",
  storageBucket: "lolsite-7331d.appspot.com",
  messagingSenderId: "663318866737",
  appId: "1:663318866737:web:c89ee3d649bbbc2c545e10",
  measurementId: "G-PEKM3362M3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)