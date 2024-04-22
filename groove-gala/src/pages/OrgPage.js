import Foot from "../components/Foot";
import Navbar from "../components/Navbar";
import OrgCard from "../components/OrgCard";
import FestivalsCard from "../components/FestivalsCard";
import "../styles/OrgPage.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function OrgPage() {
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
    <div className='orgPage'>
      <Navbar />
      <div className='org-container'>
        <OrgCard data={data} />
        <div className='festivals'>
          <h1 className='festivals-heading'>FESTIVALS</h1>
          <div className='festival-container'>
            {festData.map((item, index) => (
              <FestivalsCard data={item} />
            ))}
          </div>
        </div>
      </div>
      <Foot />
    </div>
  );
}

export default OrgPage;
