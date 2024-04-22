import { useNavigate } from "react-router-dom";
import "../styles/AdminMain.css";

import jsonData from "../data/data.json";
import { useState } from "react";
import { useEffect } from "react";

function AdminPage() {
  const [organizerData, setOrganizerData] = useState([]);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const data = [];
    const data2 = [];
    for (const organizerKey in jsonData.organizatoriFestivala) {
      const organizer = jsonData.organizatoriFestivala[organizerKey];

      data.push(organizer);
    }

    for (const userKey in jsonData.korisnici) {
      const user = jsonData.korisnici[userKey];
      data2.push(user);
    }

    setUserData(data2);
    setOrganizerData(data);
  }, []);

  const navigate = useNavigate();

  const handleBtn1Click = () => {
    navigate("/adminUser", { state: userData });
  };

  const handleBtn2Click = () => {
    navigate("/adminOrg", { state: organizerData });
  };

  return (
    <div className='admin-main'>
      <button className='admin-main-btn' onClick={handleBtn2Click}>
        LOAD ORGANIZERS
      </button>
      <button className='admin-main-btn' onClick={handleBtn1Click}>
        LOAD USERS
      </button>
    </div>
  );
}

export default AdminPage;
