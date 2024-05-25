import "../styles/userCardStyles.css";
import del from "../data/delete.svg";
import edit from "../data/edit.svg";
import x from "../data/x.svg";
import done from "../data/done_FILL0_wght400_GRAD0_opsz24.svg";
import { useState } from "react";
import { useEffect } from "react";
import ImageSlider from "./Carousel";
import React from "react";

function AdminFestCard({ fest, images, index, onDelete }) {
  const [inputState, setInputState] = useState(true);

  function handleDelClick() {
    onDelete(index);
  }

  const toggleStatus = () => {
    if (inputState) {
      setInputState(false);
    } else {
      setInputState(true);
    }
  };

  return (
    <div className='user-container'>
      <form className='col-container'>
        <div className='col'>
          <div className='user-data-item'>
            <div className='user-prop'>
              <h5 className='prop-head'>NAME</h5>
            </div>
            <input
              className='user-value'
              placeholder={fest.naziv}
              disabled={inputState}
            />
            <img
              className={`check-x ${
                inputState ? "active-state" : "inactive-state"
              }`}
              src={x}
            />
            <img
              className={`check-done ${
                inputState ? "inactive-state" : "active-state"
              }`}
              src={done}
            />
          </div>
          <div className='user-data-item'>
            <div className='user-prop'>
              <h5 className='prop-head'>DESCRIPTION</h5>
            </div>
            <input
              className='user-value'
              placeholder={fest.opis}
              disabled={inputState}
            />
            <img
              className={`check-x ${
                inputState ? "active-state" : "inactive-state"
              }`}
              src={x}
            />
            <img
              className={`check-done ${
                inputState ? "inactive-state" : "active-state"
              }`}
              src={done}
            />
          </div>
          <div className='user-data-item'>
            <div className='user-prop'>
              <h5 className='prop-head'>MAX PEOPLE</h5>
            </div>
            <input
              className='user-value'
              placeholder={fest.maxOsoba}
              disabled={inputState}
            />
            <img
              className={`check-x ${
                inputState ? "active-state" : "inactive-state"
              }`}
              src={x}
            />
            <img
              className={`check-done ${
                inputState ? "inactive-state" : "active-state"
              }`}
              src={done}
            />
          </div>
        </div>
        <div className='col'>
          <div className='user-data-item'>
            <div className='user-prop'>
              <h5 className='prop-head'>TYPE</h5>
            </div>
            <input
              className='user-value'
              placeholder={fest.tip}
              disabled={inputState}
            />
            <img
              className={`check-x ${
                inputState ? "active-state" : "inactive-state"
              }`}
              src={x}
            />
            <img
              className={`check-done ${
                inputState ? "inactive-state" : "active-state"
              }`}
              src={done}
            />
          </div>
          <div className='user-data-item'>
            <div className='user-prop'>
              <h5 className='prop-head'>TRAVEL TYPE</h5>
            </div>
            <input
              className='user-value'
              placeholder={fest.prevoz}
              disabled={inputState}
            />
            <img
              className={`check-x ${
                inputState ? "active-state" : "inactive-state"
              }`}
              src={x}
            />
            <img
              className={`check-done ${
                inputState ? "inactive-state" : "active-state"
              }`}
              src={done}
            />
          </div>
          <div className='user-data-item'>
            <div className='user-prop'>
              <h5 className='prop-head'>PRICE</h5>
            </div>
            <input
              className='user-value'
              placeholder={fest.cena}
              disabled={inputState}
            />
            <img
              className={`check-x ${
                inputState ? "active-state" : "inactive-state"
              }`}
              src={x}
            />
            <img
              className={`check-done ${
                inputState ? "inactive-state" : "active-state"
              }`}
              src={done}
            />
          </div>
        </div>
        <div className='col'>
          <div className='user-prop'>
            <h5 className='prop-head'>PHOTOS</h5>
          </div>
          <ImageSlider
            images={images}
            sliderStyle={"slider-profile"}
            imagesStyle={"images-profile"}
          />
        </div>
      </form>
      <div className='del-edit-ics'>
        <button className='del-btn' onClick={handleDelClick}>
          <img className='del-btn-img' src={del} />
        </button>
        <button className='edit-btn' onClick={toggleStatus}>
          <img className='edit-btn-img' src={edit} />
        </button>
      </div>
    </div>
  );
}

export default React.memo(AdminFestCard);
