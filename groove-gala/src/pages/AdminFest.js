import "../styles/AdminOrg.css";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Foot from "../components/Foot";
import AdminFestCard from "../components/AdminFestCard";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
async function fetchDataFromFirestore() {
  const docRef = doc(db, "DATA", "JSONDATA");

  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return docSnap.data();
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
}

function AdminFest() {
  const location = useLocation();
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchDataFromFirestore();
      setItems(data);
    }
    fetchData();
  }, []);

  const handleDelete = (index) => {
    const newItems = items.filter((item, i) => i !== index);
    setItems(newItems);
  };

  return (
    <div className='admin-org-container'>
      <Navbar />
      <div className='org-data-container'>
        {items.map((fest, index) => (
          <AdminFestCard
            fest={fest}
            images={fest.slike}
            index={index}
            onDelete={handleDelete}
          />
        ))}
      </div>
      <Foot />
    </div>
  );
}

export default AdminFest;
