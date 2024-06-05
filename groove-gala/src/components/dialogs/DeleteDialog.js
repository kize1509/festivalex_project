import "../../styles/dialogStyles/DeleteDialogStyles.css";
import done from "../../data/done_all.svg";

function DeleteDialog({ text, type, onClose, onConfirm }) {
  return (
    <div className='dd-main-container'>
      <div className='dd-item-container'>
        <div className='dd-heading-container'>
          <label className='dd-delete-label'>TO DELETE PRESS CHECKMARK</label>
          <label className='dd-delete-items-val'>{text}</label>
          <label className='dd-delete-items'>{type}</label>
        </div>
        <div className='dd-close-container'>
          <img
            className='dd-close-btn'
            src={done}
            alt='Done'
            onClick={onConfirm}
          />
        </div>
      </div>
    </div>
  );
}

export default DeleteDialog;
