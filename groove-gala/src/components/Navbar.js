import "../styles/navbarStyles.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import LoginSignup from "./LoginSignup.js";

function Navbar() {
  const [display, setDisplay] = useState(false);
  const [name, setName] = useState(null);

  let navbarClasses = "navbar-regular";

  const heightRef = useRef(null);
  const popupRef = useRef(null);

  const [scrolled, setScrolled] = useState(false);

  const handleButtonClick = () => {
    setDisplay(true);
  };

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setDisplay(false);
      }
    };

    if (display) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [display]);

  if (scrolled) {
    navbarClasses = "scrolled";
  }

  const navigate = useNavigate();

  const handleHeadingClick = () => {
    navigate("/");
  };

  return (
    <nav className={navbarClasses} ref={heightRef}>
      {display && (
        <div className='popup-overlay'>
          <div className='popup-container' ref={popupRef}>
            <LoginSignup data={name} />
          </div>
        </div>
      )}

      <div className='nav-container'>
        <h2 className='heading' onClick={handleHeadingClick}>
          GROOVE GALA
        </h2>
        <ul className='nav-list'>
          <button
            className='logButton'
            onClick={() => {
              setName("Login");
              handleButtonClick();
            }}
          >
            LOGIN
          </button>
          <button
            className='signButton'
            onClick={() => {
              setName("Sign Up");
              handleButtonClick();
            }}
          >
            REGISTER
          </button>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
