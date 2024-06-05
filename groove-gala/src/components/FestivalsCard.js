import { useEffect, useState } from "react";
import "../styles/carouselCardStyles.css";
import { useNavigate } from "react-router-dom";
import ImageSlider from "../components/Carousel";

function FestivalsCard({ data }) {
  const [imageCollection, setImageCollection] = useState([]);

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/singleFest", { state: data });
  };

  useEffect(() => {
    let helepr = [];

    for (const image in data.slike) {
      helepr.push(data.slike[image]);
    }

    setImageCollection(helepr);
  }, []);

  return (
    <div className='festivals-card'>
      <ImageSlider
        images={imageCollection}
        sliderStyle={"slider"}
        imagesStyle={"images"}
      />
      <h2
        className='festivals-title'
        dangerouslySetInnerHTML={{ __html: data.naziv }}
      />
      <h5
        className='festivals-type'
        dangerouslySetInnerHTML={{ __html: data.tip }}
      />
      <button className='more-button' onClick={handleButtonClick}>
        LEARN MORE
      </button>
    </div>
  );
}

export default FestivalsCard;
