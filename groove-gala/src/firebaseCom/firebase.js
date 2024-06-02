// Import the necessary functions from the Firebase SDK
import { initializeApp } from "firebase/app";
import { User, userConverter } from "../models/User";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCQlxhbfnu9ilHyUMCACAWgTNYJsJBOa-E",
  authDomain: "groove-gala.firebaseapp.com",
  projectId: "groove-gala",
  storageBucket: "groove-gala.appspot.com",
  messagingSenderId: "268904776461",
  appId: "1:268904776461:web:4054a34c6b69936cd6e644",
  measurementId: "G-22CGL249TC",
};
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

async function fetchDocuments(endpoint) {
  const data = [];
  const col = collection(db, `DATA/JSONDATA/${endpoint}`);
  const docSnap = await getDocs(col);

  docSnap.forEach((single) => {
    data.push(single.data());
    console.log(single.data());
  });
  return data;
}

async function fetchDocument(endpoint, value) {
  try {
    const docRef = doc(db, `DATA/JSONDATA/${endpoint}`, value);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("DOCUMENT FETCHED:", docSnap.data());
      return docSnap.data();
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error getting document:", error);
  }
}

//need to save data to the database, users, organizers, festivals

async function saveUserData(user) {
  // Set with cityConverter
  const ref = doc(db, "DATA/JSONDATA/korisnici", user.id).withConverter(
    userConverter
  );
  console.log("User data to save:", user);
  await setDoc(ref, user);
}

export { fetchDocuments, fetchDocument, saveUserData };
