import { useEffect } from "react";
import { useState } from "react";
import ImageSlider from "../components/Carousel";
import mail from "../data/mail.svg";
import phone from "../data/phone.svg";
import "../styles/festProfileStyles.css";

function FestProfile({ data }) {
  const [imageCollection, setImageCollection] = useState([]);

  useEffect(() => {
    let helepr = [];

    for (const image in data.slike) {
      helepr.push(data.slike[image]);
    }

    setImageCollection(helepr);
  }, []);

  return (
    <div className='profile-display'>
      <div className='festivals-box'>
        <div className='heading-container'>
          <h1 className='festival-name'>{data.naziv}</h1>
        </div>
        <ImageSlider
          images={imageCollection}
          sliderStyle={"slider-profile"}
          imagesStyle={"images-profile"}
        />
        <div className='caption-container'>
          <p className='caption-heading'>{data.opis}</p>
        </div>
      </div>
      <div className='fest-data-container'>
        <div className='info-item'>
          <div className='property-field'>
            <h5 className='property'>FESTIVAL TYPE </h5>
          </div>
          <h5 className='fest-value'>{data.tip}</h5>
        </div>
        <div className='info-item'>
          <div className='property-field'>
            <h5 className='property'>TRAVEL TYPE</h5>
          </div>
          <h5 className='fest-value'>{data.prevoz}</h5>
        </div>
        <div className='info-item'>
          <div className='property-field'>
            <h5 className='property'>PRICE </h5>
          </div>
          <h5 className='fest-value'>{data.cena}</h5>
        </div>
        <div className='info-item'>
          <div className='property-field'>
            <h5 className='property'>MAX PEOPLE </h5>
          </div>
          <h5 className='fest-value'>{data.maxOsoba}</h5>
        </div>
      </div>
    </div>
  );
}

export default FestProfile;
