// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEhsgy5KxHvLHQPhWUvCbA3BXRDYxmR7Y",
  authDomain: "procesos-judiciales-83343.firebaseapp.com",
  projectId: "procesos-judiciales-83343",
  storageBucket: "procesos-judiciales-83343.appspot.com",
  messagingSenderId: "280936509359",
  appId: "1:280936509359:web:d1be766ee9bf7ba325c95a",
};

// Initialize Firebase
export const fs = initializeApp(firebaseConfig);

// Initilize FireStore Services
export const db = getFirestore(fs);
export const auth = getAuth(fs);
export const functions = getFunctions(fs);

// Emulator
if (process.env.REACT_APP_EMULATOR === "true") {
  console.log("Emulator activated");
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(db, "localhost", 8085);
  connectFunctionsEmulator(functions, "localhost", 5001);
}
