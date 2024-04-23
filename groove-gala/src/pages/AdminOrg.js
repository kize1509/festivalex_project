import "../styles/AdminOrg.css";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Foot from "../components/Foot";
import AdminOrgCard from "../components/AdminOrgCard";
import { LogIn } from "react-feather";

function AdminOrg() {
  const location = useLocation();
  const data = location.state;

  const [items, setItems] = useState(data);

  const handleDelete = (index) => {
    const newItems = items.filter((item, i) => i !== index);
    setItems(newItems);
  };

  const [festData, setFestData] = useState([]);

  useEffect(() => {
    let helper = [];
    for (const festKey in data.festivals) {
      const festival = data.festivals[festKey];
      helper.push(festival);
    }

    setFestData(helper);
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
