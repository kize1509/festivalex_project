import { useState } from "react";
import { ArrowRightCircle, ArrowLeftCircle } from "react-feather";
import "../styles/sliderStyles.css";

function ImageSlider({ images, sliderStyle, imagesStyle }) {
  const [imageIndex, setImageIndex] = useState(0);

  function showNextImage() {
    setImageIndex((index) => {
      if (index === images.length - 1) return 0;
      return index + 1;
    });
  }

  function showPrevImage() {
    setImageIndex((index) => {
      if (index === 0) return images.length - 1;
      return index - 1;
    });
  }

  return (
    <div className={sliderStyle}>
      <div className={imagesStyle}>
        {images.map((url, index) => (
          <img
            src={url}
            className='slider-img'
            style={{ translate: `${-100 * imageIndex}%` }}
          />
        ))}
      </div>
      <button className='navigation-button-left' onClick={showPrevImage}>
        <ArrowLeftCircle />
      </button>
      <button className='navigation-button-right' onClick={showNextImage}>
        <ArrowRightCircle />
      </button>
    </div>
  );
}

export default ImageSlider;
