// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQlxhbfnu9ilHyUMCACAWgTNYJsJBOa-E",
  authDomain: "groove-gala.firebaseapp.com",
  projectId: "groove-gala",
  storageBucket: "groove-gala.appspot.com",
  messagingSenderId: "268904776461",
  appId: "1:268904776461:web:4054a34c6b69936cd6e644",
  measurementId: "G-22CGL249TC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
