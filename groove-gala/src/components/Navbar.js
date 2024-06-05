import "../styles/navbarStyles.css";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import LoginSignup from "./LoginSignup.js";
import DoneAction from "./dialogs/DoneAction.js";
import FailDialog from "./dialogs/FailDialog.js";

function Navbar() {
  const [display, setDisplay] = useState(false);
  const [name, setName] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showFailModal, setShowFailModal] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  let navbarClasses = "navbar-regular";

  const heightRef = useRef(null);
  const popupRef = useRef(null);

  const [scrolled, setScrolled] = useState(false);

  const handleButtonClick = () => {
    setDisplay(true);
  };

  const handleButtonCloseClick = () => {
    setDisplay(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCloseFailModal = () => {
    setShowFailModal(false);
  };

  const handleOpenFailModal = () => {
    setShowFailModal(true);
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

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      setLoggedIn(true);
      setUserEmail(loggedInUser);
    }
  }, []);

  if (scrolled) {
    navbarClasses = "scrolled";
  }

  const navigate = useNavigate();

  const handleHeadingClick = () => {
    navigate("/");
  };

  const handleLogin = (email) => {
    setLoggedIn(true);
    setUserEmail(email);
    localStorage.setItem("loggedInUser", email);
    navigate("/");
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setName("LOGGING OUT");
    handleOpenModal();
    setUserEmail("");
    localStorage.removeItem("loggedInUser");
  };

  return (
    <nav className={navbarClasses} ref={heightRef}>
      {display && (
        <div className='popup-overlay'>
          <div className='popup-container' ref={popupRef}>
            <LoginSignup
              onLogin={handleLogin}
              onClose={handleButtonCloseClick}
              onSub={handleOpenModal}
              setTitle={setName}
              currName={name}
              onFailLogin={handleOpenFailModal}
            />
          </div>
        </div>
      )}

      <DoneAction
        show={showModal}
        handleClose={handleCloseModal}
        title={name}
      />

      <FailDialog
        show={showFailModal}
        handleClose={handleCloseFailModal}
        title={"LOGIN FAILED"}
      />
      <div className='nav-container'>
        <h2 className='heading' onClick={handleHeadingClick}>
          GROOVE GALA
        </h2>
        <ul className='nav-list'>
          {loggedIn ? (
            <>
              <div className='loggedin-nav'>
                <div className='logged-in-cntr'>
                  <h2 className='logged-in-head'>LOGGED IN AS</h2>
                  <h2 className='logged-in-val'>{userEmail}</h2>
                </div>

                <button className='logoutButton' onClick={handleLogout}>
                  LOGOUT
                </button>
              </div>
            </>
          ) : (
            <>
              <button
                className='logButton'
                onClick={() => {
                  handleButtonClick();
                  setName("Login");
                }}
              >
                LOGIN
              </button>
              <button
                className='signButton'
                onClick={() => {
                  handleButtonClick();
                  setName("Sign Up");
                }}
              >
                REGISTER
              </button>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
