import React, { useEffect, useState } from "react";
import ImageSlider from "./Carousel";
import NewFestItem from "./subComponents/NewFestItem";
import plus from "../data/plus.svg";
import done from "../data/done.svg";
import { saveFestData } from "../firebaseCom/firebase";
import "../styles/newFestCardStyles.css";
import DoneAction from "./dialogs/DoneAction";
import ImageLinkItem from "./subComponents/ImageLinkItem";
import charactersJson from "../data/constants.json";
import { LogIn } from "react-feather";

const generateRandomId = (length = 19) => {
  const characters = charactersJson.characters;
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

function NewFestCard({ data, cluster }) {
  const [pageState, setPageState] = useState("add");
  const [imageCollection, setImageCollection] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [dataState, setDataState] = useState({
    naziv: "",
    cena: "",
    tip: "",
    prevoz: "",
    maxOsoba: "",
    opis: "",
    slike: [],
  });

  useEffect(() => {
    if (data) {
      setPageState("edit");
      setDataState(data);
      const imdata = data.slike ? [...data.slike] : [];
      setImageCollection(imdata);
    }
  }, [data]);

  const handleInputChange = (name, value) => {
    setDataState((prevState) => ({ ...prevState, [name]: value }));
  };

  const validateInputs = () => {
    if (
      !dataState.naziv ||
      !dataState.cena ||
      !dataState.tip ||
      !dataState.prevoz ||
      !dataState.maxOsoba ||
      !dataState.opis ||
      imageCollection.length === 0
    ) {
      alert("All fields are required.");
      return false;
    }

    if (isNaN(parseInt(dataState.cena)) || parseInt(dataState.cena) <= 0) {
      alert("Price must be a positive integer.");
      return false;
    }

    if (
      isNaN(parseInt(dataState.maxOsoba)) ||
      parseInt(dataState.maxOsoba) <= 0
    ) {
      alert("Maximum number of people must be a positive integer.");
      return false;
    }
    for (const imageUrl of imageCollection) {
      if (!isValidImageUrl(imageUrl)) {
        alert("ENTERED AND INVALID IMAGE URL.");
        return false;
      }
    }

    return true;
  };

  const isValidImageUrl = (url) => {
    // Basic check for valid image URL
    return url.match(/\.(jpeg|jpg|gif|png|webp)$/) != null;
  };

  const handleSave = () => {
    if (!validateInputs()) {
      return;
    }

    const newFestivalId = generateNewFestivalId();

    const festData = {
      cena: dataState.cena,
      maxOsoba: dataState.maxOsoba,
      naziv: dataState.naziv,
      opis: dataState.opis,
      prevoz: dataState.prevoz,
      slike: imageCollection,
      tip: dataState.tip,
    };

    if (pageState === "add") {
      const hd = { [newFestivalId]: festData };
      saveFestData(hd, cluster);
      handleOpenModal();
    } else {
      const hd = { [data.id]: festData };
      saveFestData(hd, cluster);
      handleOpenModal();
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const generateNewFestivalId = () => {
    return "-" + generateRandomId();
  };

  const handleImageDelete = (index) => {
    const newItems = imageCollection.filter((item, i) => i !== index);
    setImageCollection(newItems);
  };

  const handleAddImage = () => {
    if (imageUrl) {
      setImageCollection((prevImages) => [...prevImages, imageUrl]);
      setImageUrl("");
    }
  };

  return (
    <div className='nf-container'>
      <DoneAction
        show={showModal}
        handleClose={handleCloseModal}
        title={pageState === "add" ? "ADDING FESTIVAL" : "EDITING FESTIVAL"}
      />
      <form className='nf-col-container'>
        <div className='nf-basic-info'>
          <NewFestItem
            name={"naziv"}
            value={dataState.naziv}
            tp={"text"}
            onInputChange={handleInputChange}
          />
          <NewFestItem
            name={"cena"}
            value={dataState.cena}
            tp={"text"}
            onInputChange={handleInputChange}
          />
          <NewFestItem
            name={"tip"}
            value={dataState.tip}
            tp={"text"}
            onInputChange={handleInputChange}
          />
          <NewFestItem
            name={"prevoz"}
            value={dataState.prevoz}
            tp={"text"}
            onInputChange={handleInputChange}
          />
          <NewFestItem
            name={"maxOsoba"}
            value={dataState.maxOsoba}
            tp={"text"}
            onInputChange={handleInputChange}
          />
        </div>
        <div className='nf-caption'>
          <div className='nf-heading-caption'>
            <h2 className='nf-heading'>CAPTION</h2>
          </div>
          <div className='nf-caption-field'>
            <textarea
              name='opis'
              placeholder='Enter description'
              value={dataState.opis}
              onChange={(e) => handleInputChange("opis", e.target.value)}
              rows={4}
              cols={40}
              className='nf-caption-input'
            />
          </div>
        </div>
        <div className='nf-photos'>
          {imageCollection.map((link, index) => (
            <ImageLinkItem
              key={index}
              index={index}
              link={link}
              onDel={handleImageDelete}
            />
          ))}
          <div
            style={{
              marginTop: "1%",
              marginBottom: "0.5%",
              color: "white",
              fontFamily: "Noto Sans JP, sans-serif",
            }}
          >
            ADD IMAGE LINK
          </div>
          <div className='nf-add-photos'>
            <input
              type='url'
              className='nf-image-add'
              placeholder='Enter image URL'
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <p onClick={handleAddImage}>ADD</p>
          </div>
        </div>
        <div className='nf-save'>
          <div className='nf-save-btn' onClick={handleSave}>
            <img className='nf-save-img' src={done} alt='Save' />
          </div>
        </div>
      </form>
    </div>
  );
}

export default NewFestCard;
