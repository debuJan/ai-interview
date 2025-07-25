// Import the functions you need from the SDKs you need
// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6QVobwnk1oDhDnuJMHGCBpwhk9zHrX9Y",
  authDomain: "ai-interview-34a2e.firebaseapp.com",
  projectId: "ai-interview-34a2e",
  storageBucket: "ai-interview-34a2e.firebasestorage.app",
  messagingSenderId: "661188369502",
  appId: "1:661188369502:web:b3f37d58a408b5e5eae8cf",
  measurementId: "G-746EF9QT9T"
};

const app = initializeApp(firebaseConfig);

// Initialize Auth and Providers
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

// ✅ Correctly export
export { auth, googleProvider, githubProvider };