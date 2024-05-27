import Foot from "../components/Foot";
import Navbar from "../components/Navbar";
import OrgCard from "../components/OrgCard";
import FestivalsCard from "../components/FestivalsCard";
import "../styles/OrgPage.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchDocument } from "../firebase";
function OrgPage() {
  const location = useLocation();
  const data = location.state;

  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchFestival() {
      const fetched = await fetchDocument(`festivali`, data.festivals);

      const append_data = [];
      for (const festKey in fetched) {
        append_data.push(fetched[festKey]);
      }

      setItems(append_data);
    }
    fetchFestival();
  }, []);

  return (
    <div className='orgPage'>
      <Navbar />
      <div className='org-container'>
        <OrgCard data={data} />
        <div className='festivals'>
          <h1 className='festivals-heading'>FESTIVALS</h1>
          <div className='festival-container'>
            {items.map((item, index) => (
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
