import { useNavigate } from "react-router-dom";
import "../styles/AdminMain.css";

import jsonData from "../data/data.json";
import { useState } from "react";
import { useEffect } from "react";

function AdminPage() {
  const [organizerData, setOrganizerData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [festivalData, setFestivalData] = useState([]);

  useEffect(() => {
    const data = [];
    const data2 = [];
    const data3 = [];
    for (const organizerKey in jsonData.organizatoriFestivala) {
      const organizer = jsonData.organizatoriFestivala[organizerKey];

      data.push(organizer);
    }

    for (const festKey in jsonData.festivali) {
      const fests = jsonData.festivali[festKey];
      for (const fk in fests) {
        data3.push(fests[fk]);
      }
    }

    for (const userKey in jsonData.korisnici) {
      const user = jsonData.korisnici[userKey];
      data2.push(user);
    }

    console.log(data3);
    setFestivalData(data3);
    setUserData(data2);
    setOrganizerData(data);
  }, []);

  const navigate = useNavigate();

  const handleBtn1Click = () => {
    navigate("/adminUser", { state: userData });
  };
  const handleBtn3Click = () => {
    navigate("/adminFest", { state: festivalData });
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
      <button className='admin-main-btn' onClick={handleBtn3Click}>
        LOAD FESTIVALS
      </button>
    </div>
  );
}

export default AdminPage;
