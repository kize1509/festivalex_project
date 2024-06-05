import trash from "../../data/delete.svg";
import "../../styles/subComponentStyles/ImageLinkStyles.css";

function ImageLinkItem({ index, link, onDel }) {
  const handleDel = () => {
    onDel(index);
  };

  return (
    <div className='image-link-item'>
      <div className='image-link-text'>
        <p>{link}</p>
      </div>
      <div className='image-link-del'>
        <img src={trash} onClick={handleDel} />
      </div>
    </div>
  );
}

export default ImageLinkItem;
