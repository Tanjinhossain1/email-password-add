// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVcQGotVDAXOdBXShZwmEOeZLC-7XoaZs",
  authDomain: "email-password-add.firebaseapp.com",
  projectId: "email-password-add",
  storageBucket: "email-password-add.appspot.com",
  messagingSenderId: "606718850714",
  appId: "1:606718850714:web:91d6cc0e64973754e9d123",
  measurementId: "G-CSMY7R0Y72"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;