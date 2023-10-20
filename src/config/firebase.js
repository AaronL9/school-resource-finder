import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
const firebaseConfig = {
  apiKey: "AIzaSyCUdF76MhLgjc7HI48jnhlvIjT3KYz6r5Q",
  authDomain: "react-native-login-be81b.firebaseapp.com",
  databaseURL:
    "https://react-native-login-be81b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "react-native-login-be81b",
  storageBucket: "react-native-login-be81b.appspot.com",
  messagingSenderId: "22875957074",
  appId: "1:22875957074:web:c59424d233e08557ddbc8b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = app.firestore();
export const storage = app.storage();
export const googleProvider = new GoogleAuthProvider();
