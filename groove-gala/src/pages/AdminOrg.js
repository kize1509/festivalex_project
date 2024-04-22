import "../styles/AdminOrg.css";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

function AdminOrg() {
  const location = useLocation();
  const data = location.state;

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
    <div>
      <div></div>
    </div>
  );
}

export default AdminOrg;
