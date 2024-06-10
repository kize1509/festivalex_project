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
  const [searchByType, setSearchByType] = useState(false);
  const [searchByName, setSearchByName] = useState(false);

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

  const handleTypeClick = () => {
    setSearchByType((prev) => !prev);
  };

  const handleNameClick = () => {
    setSearchByName((prev) => !prev);
  };

  const filteredItems = items.filter((item) => {
    const searchLower = searchQuery.toLowerCase();
    const matchesName = item.naziv.toLowerCase().includes(searchLower);
    const matchesType = item.tip.toLowerCase().includes(searchLower);

    if (searchByType && searchByName) {
      return matchesName || matchesType;
    } else if (searchByType) {
      return matchesType;
    } else if (searchByName) {
      return matchesName;
    } else {
      return matchesName || matchesType;
    }
  });

  return (
    <div className='orgPage'>
      <Navbar />
      <div className='org-container'>
        <OrgCard data={data} />
        <div className='festivals'>
          <h1 className='festivals-heading'>FESTIVALS</h1>
          <div className='search-container-fest'>
            <Search setSearchQuery={setSearchQuery} />

            <div className='filter-btns-fest'>
              <button
                className={`btn-type ${searchByType ? "active" : ""}`}
                onClick={handleTypeClick}
              >
                type
              </button>
              <button
                className={`btn-name ${searchByName ? "active" : ""}`}
                onClick={handleNameClick}
              >
                name
              </button>
            </div>
          </div>
          <div className='festival-container'>
            {filteredItems.map((item, index) => (
              <FestivalsCard
                data={highlightSearchTerm(
                  item,
                  searchQuery,
                  searchByName,
                  searchByType
                )}
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

function highlightSearchTerm(item, searchTerm, searchByName, searchByType) {
  if (!searchTerm) return item;

  const regex = new RegExp(`(${searchTerm})`, "gi");

  if ((searchByType && searchByName) || (!searchByType && !searchByName)) {
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
  } else if (searchByType) {
    const highlightedNaziv = item.naziv;
    const highlightedTip = item.tip.replace(
      regex,
      "<span class='highlight'>$1</span>"
    );

    return {
      ...item,
      naziv: highlightedNaziv,
      tip: highlightedTip,
    };
  } else if (searchByName) {
    const highlightedNaziv = item.naziv.replace(
      regex,
      "<span class='highlight'>$1</span>"
    );
    const highlightedTip = item.tip;

    return {
      ...item,
      naziv: highlightedNaziv,
      tip: highlightedTip,
    };
  }
}

export default OrgPage;
