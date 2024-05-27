import ImageSlider from "./Carousel";
import { useRef } from "react";
import "../styles/newFestCardStyles.css";
import NewFestItem from "./subComponents/NewFestItem";
import { useEffect, useState } from "react";
import plus from "../data/plus.svg";
import done from "../data/done.svg";
import { color } from "framer-motion";

function NewFestCard({ data }) {
  const [imageCollection, setImageCollection] = useState([]);

  const [dataState, setDataState] = useState({
    naziv: "",
    cena: "",
    tip: "",
    prevoz: "",
    maxOsoba: "",
    opis: "",
    slike: [],
  });

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (data) {
      setDataState(data);
      const imdata = data.slike ? [...data.slike] : [];
      setImageCollection(imdata);
    }
  }, [data]);
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const data = imageCollection;
    data.push(file);
    setImageCollection(data);
    console.log(imageCollection);
    console.log("Selected file:", file);
  };

  return (
    <div className='nf-container'>
      <div className='nf-col-container'>
        <div className='nf-basic-info'>
          <NewFestItem name={"NAME"} value={dataState.naziv} tp={"text"} />
          <NewFestItem name={"PRICE"} value={dataState.cena} tp={"text"} />
          <NewFestItem name={"TYPE"} value={dataState.tip} tp={"text"} />
          <NewFestItem
            name={"TRAVEL TYPE"}
            value={dataState.prevoz}
            tp={"text"}
          />
          <NewFestItem
            name={"MAX PEOPLE"}
            value={dataState.maxOsoba}
            tp={"text"}
          />
        </div>
        <div className='nf-caption'>
          <div className='nf-heading-caption'>
            <h2 className='nf-heading'>CAPTION</h2>
          </div>
          <div className='nf-caption-field'>
            <textarea
              placeholder={dataState.opis}
              rows={4}
              cols={40}
              className='nf-caption-input'
            />
          </div>
        </div>
        <div className='nf-photos'>
          {imageCollection.length > 0 ? (
            <ImageSlider
              images={imageCollection}
              sliderStyle={"slider-nf"}
              imagesStyle={"images"}
            />
          ) : (
            <div
              style={{
                marginBottom: "0.5%",
                color: "white",
                fontFamily: "Noto Sans JP, sans-serif",
              }}
            >
              NO IMAGES
            </div>
          )}

          <div className='nf-add-photos'>
            <input
              type='file'
              className='nf-image-add'
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <img src={plus} className='nf-plus' onClick={handleImageClick} />
          </div>
        </div>
        <div className='nf-save'>
          <div className='nf-save-btn'>
            <img className='nf-save-img' src={done} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewFestCard;
