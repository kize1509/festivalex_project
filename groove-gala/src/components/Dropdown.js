import { useState, useEffect } from "react";
import "../styles/DropDownStyles.css";
import ListComponent from "./ListFestivalComponent";
import dropdown from "../data/dropdown.svg";
import { deleteFest } from "../firebaseCom/firebase";
function Dropdown({ options, cluster }) {
  const [items, setItems] = useState([]);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setItems(options);
  }, [options]);

  const handleDelete = (index) => {
    deleteFest(cluster, items[index].id);
    const newItems = items.filter((item, i) => i !== index);
    setItems(newItems);
  };

  return (
    <div className='dropdown'>
      <div className='dropdown-button' onClick={(e) => setIsActive(!isActive)}>
        <div className='dropdown-text'>
          <h2>FESTIVALS</h2>
        </div>
        <img src={dropdown} className='drop-down-image' />
      </div>
      {isActive && (
        <div className='dropdown-content'>
          {items.map((option, index) => (
            <div className='dropdown-item'>
              <ListComponent
                cluster={cluster}
                data={option}
                index={index}
                onDelete={handleDelete}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
