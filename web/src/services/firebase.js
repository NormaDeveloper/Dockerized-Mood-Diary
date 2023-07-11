// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAix5Jvi-3hdvfYgWLLIWAfHp52zRoLUjo",
  authDomain: "first-firestore-a4ed0.firebaseapp.com",
  projectId: "first-firestore-a4ed0",
  storageBucket: "first-firestore-a4ed0.appspot.com",
  messagingSenderId: "48346282596",
  appId: "1:48346282596:web:7b95e0e1644c816c913d71"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//save the inizialitation in db and export db
export const db = getFirestore(app);

