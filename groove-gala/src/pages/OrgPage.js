import Foot from "../components/Foot";
import Navbar from "../components/Navbar";
import OrgCard from "../components/OrgCard";
import FestivalsCard from "../components/FestivalsCard";
import "../styles/OrgPage.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchDocument } from "../firebaseCom/firebase";
import Search from "../components/Search";
function OrgPage() {
  const location = useLocation();
  const data = location.state;

  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

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

  const filteredItems = items.filter(
    (item) =>
      item.naziv.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tip.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='orgPage'>
      <Navbar />
      <div className='org-container'>
        <OrgCard data={data} />
        <div className='festivals'>
          <h1 className='festivals-heading'>FESTIVALS</h1>
          <div className='search-container-fest'>
            <Search setSearchQuery={setSearchQuery} />
          </div>
          <div className='festival-container'>
            {filteredItems.map((item, index) => (
              <FestivalsCard
                data={highlightSearchTerm(item, searchQuery)}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
      <Foot />
    </div>
  );
}

function highlightSearchTerm(item, searchTerm) {
  if (!searchTerm) return item;

  const regex = new RegExp(`(${searchTerm})`, "gi");

  const highlightedNaziv = item.naziv.replace(
    regex,
    "<span class='highlight'>$1</span>"
  );
  const highlightedTip = item.tip.replace(
    regex,
    "<span class='highlight'>$1</span>"
  );

  return {
    ...item,
    naziv: highlightedNaziv,
    tip: highlightedTip,
  };
}

export default OrgPage;
