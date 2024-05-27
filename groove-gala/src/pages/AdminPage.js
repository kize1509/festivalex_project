import { useNavigate } from "react-router-dom";
import "../styles/AdminMain.css";

import { useState } from "react";
import { useEffect } from "react";

function AdminPage() {
  const navigate = useNavigate();

  const handleBtn1Click = () => {
    navigate("/adminUser");
  };

  const handleBtn2Click = () => {
    navigate("/adminOrg");
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
