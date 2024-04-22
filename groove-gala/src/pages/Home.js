import Navbar from "../components/Navbar";
import Foot from "../components/Foot";
import MainCard from "../components/MainCard";
import "../styles/Home.css";
import Search from "../components/Search";
import { useState } from "react";
import { useEffect } from "react";
import jsonData from "../data/data.json";
function App() {
  const [combinedData, setCombinedData] = useState([]);

  useEffect(() => {
    const data = [];

    for (const organizerKey in jsonData.organizatoriFestivala) {
      const organizer = jsonData.organizatoriFestivala[organizerKey];

      const festivalKey = organizer.festivals;

      const festival = jsonData.festivali[festivalKey];

      const combinedItem = {
        organizer,
        festival,
      };

      data.push(combinedItem);
    }

    setCombinedData(data);
  }, []);

  return (
    <div className='App'>
      <Navbar />
      <div className='search-container'>
        <Search />
      </div>

      <div className='fest-conatiner'>
        {combinedData.map((item, index) => (
          <MainCard item={item} />
        ))}
      </div>
      <Foot />
    </div>
  );
}

export default App;
