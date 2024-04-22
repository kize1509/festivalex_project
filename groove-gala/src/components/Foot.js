import copyright from "../data/copyright.svg";
import "../styles/footerStyles.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Foot() {
  const navigate = useNavigate();

  const handleHeadingClick = () => {
    navigate("/");
  };

  return (
    <div className='footer-container'>
      <div className='links-container'>
        <a className='foot-links'>LOGIN</a>
        <a className='foot-links' onClick={handleHeadingClick}>
          HOME
        </a>
        <a className='foot-links'>SIGNUP</a>
      </div>
      <div className='copyright-container'>
        <h3 className='foot-heading' onClick={handleHeadingClick}>
          GROOVE GALA
        </h3>
        <img src={copyright} />
      </div>
    </div>
  );
}

export default Foot;
