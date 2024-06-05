import "../styles/userCardStyles.css";
import del from "../data/delete.svg";
import edit from "../data/edit.svg";
import x from "../data/x.svg";
import done from "../data/done_FILL0_wght400_GRAD0_opsz24.svg";
import DeleteDialog from "./dialogs/DeleteDialog";
import { useState } from "react";
import { deleteUser } from "../firebaseCom/firebase";

function UserCard({
  user,
  index,
  isEditing,
  editData,
  onDelete,
  onEditToggle,
  onInputChange,
}) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    onDelete(index);
    deleteUser(user.id);
    setShowDeleteDialog(false);
  };

  const handleCloseDialog = () => {
    setShowDeleteDialog(false);
  };

  return (
    <div className='user-container'>
      {showDeleteDialog && (
        <>
          <div className='dd-backdrop' onClick={handleCloseDialog}></div>
          <DeleteDialog
            text={user.korisnickoIme}
            type={"USER"}
            onClose={handleCloseDialog}
            onConfirm={handleConfirmDelete}
          />
        </>
      )}
      <form className='col-container'>
        <div className='col'>
          <div className='user-data-item'>
            <div className='user-prop'>
              <h5 className='prop-head'>USERNAME</h5>
            </div>
            <input
              name='korisnickoIme'
              className='user-value'
              value={editData.korisnickoIme}
              onChange={(e) =>
                onInputChange(index, "korisnickoIme", e.target.value)
              }
              disabled={!isEditing}
            />
            <img
              className={`check-x ${
                !isEditing ? "active-state" : "inactive-state"
              }`}
              src={x}
            />
            <img
              className={`check-done ${
                !isEditing ? "inactive-state" : "active-state"
              }`}
              src={done}
            />
          </div>
          <div className='user-data-item'>
            <div className='user-prop'>
              <h5 className='prop-head'>PASSWORD</h5>
            </div>
            <input
              name='lozinka'
              className='user-value'
              value={editData.lozinka}
              onChange={(e) => onInputChange(index, "lozinka", e.target.value)}
              disabled={!isEditing}
            />
            <img
              className={`check-x ${
                !isEditing ? "active-state" : "inactive-state"
              }`}
              src={x}
            />
            <img
              className={`check-done ${
                !isEditing ? "inactive-state" : "active-state"
              }`}
              src={done}
            />
          </div>
          <div className='user-data-item'>
            <div className='user-prop'>
              <h5 className='prop-head'>NAME</h5>
            </div>
            <input
              name='ime'
              className='user-value'
              value={editData.ime}
              onChange={(e) => onInputChange(index, "ime", e.target.value)}
              disabled={!isEditing}
            />
            <img
              className={`check-x ${
                !isEditing ? "active-state" : "inactive-state"
              }`}
              src={x}
            />
            <img
              className={`check-done ${
                !isEditing ? "inactive-state" : "active-state"
              }`}
              src={done}
            />
          </div>
        </div>
        <div className='col'>
          <div className='user-data-item'>
            <div className='user-prop'>
              <h5 className='prop-head'>LAST NAME</h5>
            </div>
            <input
              name='prezime'
              className='user-value'
              value={editData.prezime}
              onChange={(e) => onInputChange(index, "prezime", e.target.value)}
              disabled={!isEditing}
            />
            <img
              className={`check-x ${
                !isEditing ? "active-state" : "inactive-state"
              }`}
              src={x}
            />
            <img
              className={`check-done ${
                !isEditing ? "inactive-state" : "active-state"
              }`}
              src={done}
            />
          </div>
          <div className='user-data-item'>
            <div className='user-prop'>
              <h5 className='prop-head'>EMAIL</h5>
            </div>
            <input
              name='email'
              className='user-value'
              value={editData.email}
              onChange={(e) => onInputChange(index, "email", e.target.value)}
              disabled={!isEditing}
            />
            <img
              className={`check-x ${
                !isEditing ? "active-state" : "inactive-state"
              }`}
              src={x}
            />
            <img
              className={`check-done ${
                !isEditing ? "inactive-state" : "active-state"
              }`}
              src={done}
            />
          </div>
          <div className='user-data-item'>
            <div className='user-prop'>
              <h5 className='prop-head'>DATE OF BIRTH</h5>
            </div>
            <input
              name='datumRodjenja'
              className='user-value'
              value={editData.datumRodjenja}
              onChange={(e) =>
                onInputChange(index, "datumRodjenja", e.target.value)
              }
              disabled={!isEditing}
            />
            <img
              className={`check-x ${
                !isEditing ? "active-state" : "inactive-state"
              }`}
              src={x}
            />
            <img
              className={`check-done ${
                !isEditing ? "inactive-state" : "active-state"
              }`}
              src={done}
            />
          </div>
        </div>
        <div className='col'>
          <div className='user-data-item'>
            <div className='user-prop'>
              <h5 className='prop-head'>ADDRESS</h5>
            </div>
            <input
              name='adresa'
              className='user-value'
              value={editData.adresa}
              onChange={(e) => onInputChange(index, "adresa", e.target.value)}
              disabled={!isEditing}
            />
            <img
              className={`check-x ${
                !isEditing ? "active-state" : "inactive-state"
              }`}
              src={x}
            />
            <img
              className={`check-done ${
                !isEditing ? "inactive-state" : "active-state"
              }`}
              src={done}
            />
          </div>
          <div className='user-data-item'>
            <div className='user-prop'>
              <h5 className='prop-head'>TELEPHONE</h5>
            </div>
            <input
              name='telefon'
              className='user-value'
              value={editData.telefon}
              onChange={(e) => onInputChange(index, "telefon", e.target.value)}
              disabled={!isEditing}
            />
            <img
              className={`check-x ${
                !isEditing ? "active-state" : "inactive-state"
              }`}
              src={x}
            />
            <img
              className={`check-done ${
                !isEditing ? "inactive-state" : "active-state"
              }`}
              src={done}
            />
          </div>
          <div className='user-data-item'>
            <div className='user-prop'>
              <h5 className='prop-head'>PROFESSION</h5>
            </div>
            <input
              name='zanimanje'
              className='user-value'
              value={editData.zanimanje}
              onChange={(e) =>
                onInputChange(index, "zanimanje", e.target.value)
              }
              disabled={!isEditing}
            />
            <img
              className={`check-x ${
                !isEditing ? "active-state" : "inactive-state"
              }`}
              src={x}
            />
            <img
              className={`check-done ${
                !isEditing ? "inactive-state" : "active-state"
              }`}
              src={done}
            />
          </div>
        </div>
      </form>
      <div className='del-edit-ics'>
        <button className='del-btn' onClick={handleDeleteClick}>
          <img className='del-btn-img' src={del} />
        </button>
        <button className='edit-btn' onClick={() => onEditToggle(index)}>
          <img className='edit-btn-img' src={edit} />
        </button>
      </div>
    </div>
  );
}

export default UserCard;
