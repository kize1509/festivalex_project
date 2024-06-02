import Navbar from "../components/Navbar";
import Foot from "../components/Foot";
import UserCard from "../components/UserCard";
import "../styles/AdminUser.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchDocuments } from "../firebaseCom/firebase";

function AdminUser() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    async function fetchUsers() {
      const fetched = await fetchDocuments(`korisnici`);

      setItems(fetched);
    }
    fetchUsers();
  }, []);

  const handleDelete = (index) => {
    const newItems = items.filter((item, i) => i !== index);
    setItems(newItems);
  };

  return (
    <div className='admin-user-container'>
      <Navbar />
      <div className='user-data-container'>
        {items.map((user, index) => (
          <UserCard user={user} index={index} onDelete={handleDelete} />
        ))}
      </div>
      <Foot />
    </div>
  );
}

export default AdminUser;
