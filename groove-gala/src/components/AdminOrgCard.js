import "../styles/orgAdminStyles.css";
import del from "../data/delete.svg";
import edit from "../data/edit.svg";
import x from "../data/x.svg";
import done from "../data/done_FILL0_wght400_GRAD0_opsz24.svg";
import plus from "../data/plus.svg";
import { useState, useEffect } from "react";
import Dropdown from "./Dropdown.js";
import { fetchDocument, deleteOrganizer } from "../firebaseCom/firebase.js";
import { useNavigate } from "react-router-dom";
import DeleteDialog from "./dialogs/DeleteDialog";

function AdminOrgCard({
  org,
  index,
  isEditing,
  editData,
  onDelete,
  onEditToggle,
  onInputChange,
}) {
  const [festData, setFestData] = useState([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const navigate = useNavigate();

  const handleBtnClick = () => {
    const data = { status: false, cluster: org.festivali };
    navigate("/newFestPage", { state: data });
  };

  const handleDeleteClick = () => {
    deleteOrganizer(org.id);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    onDelete(index);
    setShowDeleteDialog(false);
  };

  const handleCloseDialog = () => {
    setShowDeleteDialog(false);
  };

  useEffect(() => {
    async function fetchFestivals() {
      const fetched = await fetchDocument(`festivali`, editData.festivali);

      const data = fetched;

      setFestData(data);
    }
    fetchFestivals();
  }, [editData.festivali]);

  return (
    <div className='orgz-container'>
      {showDeleteDialog && (
        <>
          <div className='dd-backdrop' onClick={handleCloseDialog}></div>
          <DeleteDialog
            text={org.naziv}
            type={"ORGANIZER"}
            onClose={handleCloseDialog}
            onConfirm={handleConfirmDelete}
          />
        </>
      )}
      <form className='col-org-container'>
        <div className='col-org'>
          <div className='org-data-item'>
            <div className='orgz-prop'>
              <h5 className='prop-headz'>ORGANIZATOR</h5>
            </div>
            <input
              name='naziv'
              onChange={(e) => onInputChange(index, "naziv", e.target.value)}
              className='org-value'
              value={editData.naziv}
              disabled={!isEditing}
            />
            <img
              className={`check-x-org ${
                !isEditing ? "active-state" : "inactive-state"
              }`}
              src={x}
              alt='Cancel'
            />
            <img
              className={`check-done-org ${
                !isEditing ? "inactive-state" : "active-state"
              }`}
              src={done}
              alt='Done'
            />
          </div>
          <div className='org-data-item'>
            <div className='orgz-prop'>
              <h5 className='prop-headz'>ADDRESS</h5>
            </div>
            <input
              name='adresa'
              value={editData.adresa}
              onChange={(e) => onInputChange(index, "adresa", e.target.value)}
              className='org-value'
              disabled={!isEditing}
            />
            <img
              className={`check-x-org ${
                !isEditing ? "active-state" : "inactive-state"
              }`}
              src={x}
              alt='Cancel'
            />
            <img
              className={`check-done-org ${
                !isEditing ? "inactive-state" : "active-state"
              }`}
              src={done}
              alt='Done'
            />
          </div>
          <div className='org-data-item'>
            <div className='orgz-prop'>
              <h5 className='prop-headz'>SINCE</h5>
            </div>
            <input
              name='godinaOsnivanja'
              onChange={(e) =>
                onInputChange(index, "godinaOsnivanja", e.target.value)
              }
              value={editData.godinaOsnivanja}
              className='org-value'
              disabled={!isEditing}
            />
            <img
              className={`check-x-org ${
                !isEditing ? "active-state" : "inactive-state"
              }`}
              src={x}
              alt='Cancel'
            />
            <img
              className={`check-done-org ${
                !isEditing ? "inactive-state" : "active-state"
              }`}
              src={done}
              alt='Done'
            />
          </div>
        </div>
        <div className='col-org'>
          <div className='org-data-item'>
            <div className='orgz-prop'>
              <h5 className='prop-headz'>PHONE</h5>
            </div>
            <input
              value={editData.kontaktTelefon}
              name='kontaktTelefon'
              onChange={(e) =>
                onInputChange(index, "kontaktTelefon", e.target.value)
              }
              className='org-value'
              disabled={!isEditing}
            />
            <img
              className={`check-x-org ${
                !isEditing ? "active-state" : "inactive-state"
              }`}
              src={x}
              alt='Cancel'
            />
            <img
              className={`check-done-org ${
                !isEditing ? "inactive-state" : "active-state"
              }`}
              src={done}
              alt='Done'
            />
          </div>
          <div className='org-data-item'>
            <div className='orgz-prop'>
              <h5 className='prop-headz'>EMAIL</h5>
            </div>
            <input
              name='email'
              onChange={(e) => onInputChange(index, "email", e.target.value)}
              className='org-value'
              value={editData.email}
              disabled={!isEditing}
            />
            <img
              className={`check-x-org ${
                !isEditing ? "active-state" : "inactive-state"
              }`}
              src={x}
              alt='Cancel'
            />
            <img
              className={`check-done-org ${
                !isEditing ? "inactive-state" : "active-state"
              }`}
              src={done}
              alt='Done'
            />
          </div>
          <div className='org-data-item'>
            <div className='orgz-prop'>
              <h5 className='prop-headz'>LOGO LINK</h5>
            </div>
            <input
              className='org-value'
              type='url'
              value={editData.logo}
              accept='image/png'
              name='logo'
              onChange={(e) => onInputChange(index, "logo", e.target.value)}
              disabled={!isEditing}
            />
            <img
              className={`check-x-org ${
                !isEditing ? "active-state" : "inactive-state"
              }`}
              src={x}
              alt='Cancel'
            />
            <img
              className={`check-done-org ${
                !isEditing ? "inactive-state" : "active-state"
              }`}
              src={done}
              alt='Done'
            />
          </div>
        </div>
        <div className='col-org'>
          <Dropdown options={festData} cluster={editData.festivali} />
          <div className='btn-item'>
            <img
              src={plus}
              className='plus-img'
              onClick={handleBtnClick}
              alt='Add'
            />
          </div>
        </div>
      </form>
      <div className='del-edit-ics-org'>
        <button className='del-btn-org' onClick={handleDeleteClick}>
          <img className='del-btn-org-img' src={del} alt='Delete' />
        </button>
        <button className='edit-btn-org' onClick={() => onEditToggle(index)}>
          <img className='edit-btn-org-img' src={edit} alt='Edit' />
        </button>
      </div>
    </div>
  );
}

export default AdminOrgCard;
