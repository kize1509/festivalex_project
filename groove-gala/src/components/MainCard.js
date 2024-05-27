import { useState } from "react";
import "../styles/festCardStyles.css";
import { useNavigate } from "react-router-dom";

function FestCard({ item }) {
  const navigate = useNavigate();

  const data = {
    name: item.naziv,
    address: item.adresa,
    year: item.godinaOsnivanja,
    logo: item.logo,
    telephone: item.kontaktTelefon,
    email: item.email,
    festivals: item.festivali,
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
