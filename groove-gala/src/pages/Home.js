import Navbar from "../components/Navbar";
import Foot from "../components/Foot";
import MainCard from "../components/MainCard";
import "../styles/Home.css";
import Search from "../components/Search";
import { useState } from "react";
import { useEffect } from "react";
import { fetchDocuments } from "../firebaseCom/firebase";
function App() {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchFestivals() {
      const data = await fetchDocuments("organizatoriFestivala");
      setItems(data);
    }

    fetchFestivals();
  }, []);
  const filteredItems = items.filter((item) =>
    item.naziv.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className='App'>
      <Navbar />
      <div className='search-container'>
        <Search setSearchQuery={setSearchQuery} />
      </div>

      <div className='fest-conatiner'>
        {filteredItems.map((item, index) => (
          <MainCard
            item={{
              ...item,
              naziv: highlightSearchTerm(item.naziv, searchQuery),
            }}
            key={index}
          />
        ))}
      </div>
      <Foot />
    </div>
  );
}
function highlightSearchTerm(name, searchTerm) {
  if (!searchTerm) return name;
  const regex = new RegExp(`(${searchTerm})`, "gi");
  return name.replace(regex, "<span class='highlight-main'>$1</span>");
}
export default App;
