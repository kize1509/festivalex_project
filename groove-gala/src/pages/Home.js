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

  useEffect(() => {
    async function fetchFestivals() {
      const data = await fetchDocuments("organizatoriFestivala");
      setItems(data);
    }
    fetchFestivals();
  }, []);

  return (
    <div className='App'>
      <Navbar />
      <div className='search-container'>
        <Search />
      </div>

      <div className='fest-conatiner'>
        {items.map((item, index) => (
          <MainCard item={item} />
        ))}
      </div>
      <Foot />
    </div>
  );
}

export default App;
