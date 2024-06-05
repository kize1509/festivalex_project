import React from "react";
import "../../styles/dialogStyles/DoneAction.css";

function DoneAction({ show, handleClose, title, children }) {
  return (
    <div className={`modal ${show ? "show" : ""}`}>
      <div className='modal-content'>
        <h2>{title} DONE</h2>
        <button onClick={handleClose} className='close'>
          Close
        </button>
      </div>
    </div>
  );
}

export default DoneAction;
