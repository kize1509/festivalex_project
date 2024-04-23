import "../styles/orgCardStyles.css";
import phone from "../data/phone.svg";
import mail from "../data/mail.svg";
import { useEffect, useState } from "react";

function OrgCard({ data }) {
  const [address, setAddress] = useState(false);

  useEffect(() => {
    let splitaData = data.address.split(",");
    let scheme = {
      street: splitaData[0],
      city: splitaData[1],
      postal: splitaData[2],
    };
    setAddress(scheme);
  }, []);

  const [isDrawer1Open, setIsDrawer1Open] = useState(false);
  const [isDrawer2Open, setIsDrawer2Open] = useState(false);

  const handleClickPhone = () => {
    setIsDrawer1Open((prevState) => !prevState);
  };

  const handleClickMail = () => {
    setIsDrawer2Open((prevState) => !prevState);
  };

  return (
    <div className='card-display'>
      <div className='organizer-box'>
        <div className='logo-box'>
          <img src={data.logo} className='logo-image' />
        </div>

        <div className='heading-container'>
          <h1 className='organiser-name'>{data.name}</h1>
          <div className='basic-info'>
            <h3 className='since-heading'>SINCE {data.year}</h3>
          </div>
        </div>
      </div>
      <div className='location-container'>
        <div className='location-item'>
          <div className='prop-field'>
            <h5 className='prop'>STREET</h5>
          </div>
          <h5 className='orga-value'>{address.street}</h5>
        </div>
        <div className='location-item'>
          <div className='prop-field'>
            <h5 className='prop'>CITY</h5>
          </div>
          <h5 className='orga-value'>{address.city}</h5>
        </div>
        <div className='location-item'>
          <div className='prop-field'>
            <h5 className='prop'>POSTAL CODE</h5>
          </div>
          <h5 className='orga-value'>{address.postal}</h5>
        </div>
      </div>
      <div className='icons-container'>
        <button className='icon-button-phone' onClick={handleClickPhone}>
          <img className='phone' src={phone} />
        </button>
        <button className='icon-button-mail' onClick={handleClickMail}>
          <img className='mail' src={mail} />
        </button>
      </div>
      <div className='drawers-container'>
        <div className={`drawer1 ${isDrawer1Open ? "open" : "closed"}`}>
          <p>{data.telephone}</p>
        </div>
        <div className={`drawer2 ${isDrawer2Open ? "open" : "closed"}`}>
          <p>{data.email}</p>
        </div>
      </div>
    </div>
  );
}

export default OrgCard;
