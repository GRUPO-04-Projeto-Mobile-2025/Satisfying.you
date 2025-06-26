// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqlwEY4v1h3hib4IEoxZRvbVpbjfk5dSo",
  authDomain: "satisfyingyou-es47a.firebaseapp.com",
  projectId: "satisfyingyou-es47a",
  storageBucket: "satisfyingyou-es47a.firebasestorage.app",
  messagingSenderId: "797649809841",
  appId: "1:797649809841:web:ae231966e33baa37450d90"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth_mod = getAuth(app)
