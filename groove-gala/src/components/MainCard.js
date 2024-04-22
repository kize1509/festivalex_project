import { useState } from "react";
import "../styles/festCardStyles.css";
import { useNavigate } from "react-router-dom";

function FestCard({ item }) {
  const navigate = useNavigate();

  const data = {
    name: item.organizer.name,
    address: item.organizer.address,
    year: item.organizer.year,
    logo: item.organizer.logo,
    telephone: item.organizer.telephone,
    email: item.organizer.email,
    festivals: item.festival,
  };

  console.log(data);

  const handleCardClick = () => {
    navigate("/singleOrg", { state: data });
  };

  return (
    <div className='FestCard' onClick={handleCardClick}>
      <img src={data.logo} className='fest-image' alt='festival' />
      <h2 className='fest-title'>{data.name}</h2>
      <p className='fest-description'>
        {data.email}
        <br />
        {data.address}
        <br />
        <b>SINCE:</b> {data.year}
      </p>
    </div>
  );
}

export default FestCard;
