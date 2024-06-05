import React from "react";
import "../../styles/dialogStyles/DoneAction.css";

function FailDialog({ show, handleClose, title }) {
  return (
    <div className={`modal ${show ? "show" : ""}`}>
      <div className='modal-content'>
        <h2>{title}</h2>
        <button onClick={handleClose} className='close'>
          Close
        </button>
      </div>
    </div>
  );
}

export default FailDialog;
