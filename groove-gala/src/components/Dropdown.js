import { useState } from "react";
import "../styles/DropDownStyles.css";
import ListComponent from "./ListFestivalComponent";
import dropdown from "../data/dropdown.svg";

function Dropdown({ options }) {
  const [isActive, setIsActive] = useState(false);

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
          {options.map((option) => (
            <div className='dropdown-item'>
              <ListComponent name={option} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
