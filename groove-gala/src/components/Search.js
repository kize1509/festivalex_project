import { useState } from "react";
import "../styles/searchStyles.css";

function Search({ setSearchQuery }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    setSearchQuery(value);
  };

  return (
    <div className='search'>
      <input
        className='search-input'
        type='text'
        placeholder='Search...'
        value={searchTerm}
        onChange={handleChange}
      />
      <div className='searchIcon'></div>
    </div>
  );
}

export default Search;
