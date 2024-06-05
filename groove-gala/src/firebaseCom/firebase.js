// Import the necessary functions from the Firebase SDK
import { initializeApp } from "firebase/app";
import { User, userConverter } from "../models/User";
import { Organizer, organizerConverter } from "../models/Organizer";
import { Festival, festivalConverter } from "../models/Festival";
import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
  query,
  where,
  doc,
  getDoc,
  setDoc,
  addDoc,
  deleteField,
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
    const newEl = single.data();
    newEl.id = single.id;
    data.push(newEl);
  });
  return data;
}

async function fetchDocument(endpoint, value) {
  try {
    const docRef = doc(db, `DATA/JSONDATA/${endpoint}`, value);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const newElKeys = Object.keys(docSnap.data());
      const newElVals = Object.values(docSnap.data());
      const reformated = [];
      for (let i = 0; i < newElKeys.length; i++) {
        newElVals[i]["id"] = newElKeys[i];
        reformated.push(newElVals[i]);
      }
      console.log("====================================");
      console.log(reformated);
      console.log("====================================");
      return reformated;
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error getting document:", error);
  }
}

//need to save data to the database, users, organizers, festivals

async function saveUserData(user) {
  const ref = doc(db, "DATA/JSONDATA/korisnici", user.id).withConverter(
    userConverter
  );
  await setDoc(ref, user);
}

async function deleteUser(userId) {
  await deleteDoc(doc(db, "DATA/JSONDATA/korisnici", userId));
}

async function deleteOrganizer(orgId) {
  await deleteDoc(doc(db, "DATA/JSONDATA/organizatoriFestivala", orgId));
}

async function updateOrganizer(updatedOrg, orgId) {
  const orgDocRef = doc(db, "DATA/JSONDATA/organizatoriFestivala", orgId);
  await updateDoc(orgDocRef, updatedOrg);
}

async function updateUser(userId, updatedUser) {
  const userDocRef = doc(db, "DATA/JSONDATA/korisnici", userId);
  await updateDoc(userDocRef, updatedUser);
}

async function saveFestData(festival, cluster) {
  console.log("Cluster data to save:", cluster);
  const ref = doc(db, `DATA/JSONDATA/festivali/${cluster}`);

  await updateDoc(ref, festival);
}

async function deleteFest(cluster, delId) {
  const ref = doc(db, `DATA/JSONDATA/festivali/${cluster}`);

  const delData = {};
  console.log("====================================");
  console.log("DELETING FESTIVAL", delId);
  console.log("====================================");
  delData[delId] = deleteField();
  await updateDoc(ref, delData);
}
export {
  fetchDocuments,
  fetchDocument,
  saveUserData,
  deleteUser,
  updateUser,
  deleteOrganizer,
  updateOrganizer,
  saveFestData,
  deleteFest,
};
