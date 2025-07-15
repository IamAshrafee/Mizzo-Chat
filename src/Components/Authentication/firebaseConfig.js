// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFBJi67UX7DZ3I3tdxWcQMJHlL2a_9ifw",
  authDomain: "mizochat-96a75.firebaseapp.com",
  databaseURL: "https://mizochat-96a75-default-rtdb.firebaseio.com",
  projectId: "mizochat-96a75",
  storageBucket: "mizochat-96a75.firebasestorage.app",
  messagingSenderId: "97165695349",
  appId: "1:97165695349:web:ab25f8793dc516c7439b3c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default firebaseConfig;
