import "../styles/navbarStyles.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

function Navbar() {
  const handleBtnClick = () => {
    navigate("/adminMain");
  };

  let navbarClasses = "navbar-regular";

  const heightRef = useRef(null);

  const [scrolled, setScrolled] = useState(false);

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
  });
  if (scrolled) {
    navbarClasses = "scrolled";
  }

  const navigate = useNavigate();

  const handleHeadingClick = () => {
    navigate("/");
  };

  return (
    <nav className={navbarClasses} ref={heightRef}>
      <div className='nav-container'>
        <h2 className='heading' onClick={handleHeadingClick}>
          GROOVE GALA
        </h2>
        <ul className='nav-list'>
          <button className='logButton' onClick={handleBtnClick}>
            LOGIN
          </button>
          <button className='signButton'>REGISTER</button>
        </ul>
      </div>
    </nav>
  );
}
export default Navbar;
