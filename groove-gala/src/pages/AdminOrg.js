import "../styles/AdminOrg.css";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Foot from "../components/Foot";
import AdminOrgCard from "../components/AdminOrgCard";
import { LogIn } from "react-feather";
import { fetchDocuments } from "../firebase";

function AdminOrg() {
  const location = useLocation();

  const [items, setItems] = useState([]);

  const handleDelete = (index) => {
    const newItems = items.filter((item, i) => i !== index);
    setItems(newItems);
  };

  useEffect(() => {
    async function fetchOrganizers() {
      const fetched = await fetchDocuments(`organizatoriFestivala`);
      setItems(fetched);
    }
    fetchOrganizers();
  }, []);

  return (
    <div className='admin-org-container'>
      <Navbar />
      <div className='org-data-container'>
        {items.map((org, index) => (
          <AdminOrgCard org={org} index={index} onDelete={handleDelete} />
        ))}
      </div>
      <Foot />
    </div>
  );
}

export default AdminOrg;
