import "../styles/orgAdminStyles.css";
import del from "../data/delete.svg";
import edit from "../data/edit.svg";
import x from "../data/x.svg";
import jsonData from "../data/data.json";
import done from "../data/done_FILL0_wght400_GRAD0_opsz24.svg";
import { useState } from "react";
import { useEffect } from "react";
import Dropdown from "./Dropdown.js";
import { fetchDocument } from "../firebaseCom/firebase.js";
import plus from "../data/plus.svg";
import { useNavigate } from "react-router-dom";
import DeleteDialog from "./dialogs/DeleteDialog";

function AdminOrgCard({ org, index, onDelete }) {
  const [festData, setFestData] = useState([]);

  const navigate = useNavigate();

  const handleBtnClick = () => {
    navigate("/newFestPage", { state: false });
  };

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDeleteClick = () => {
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
      const fetched = await fetchDocument(`festivali`, org.festivali);

      const data = [];
      for (const festKey in fetched) {
        data.push(fetched[festKey]);
      }
      setFestData(data);
    }
    fetchFestivals();
  }, []);

  const [inputState, setInputState] = useState(true);

  function toggleStatus() {
    if (inputState) {
      setInputState(false);
    } else {
      setInputState(true);
    }
  }

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
      <div className='col-org-container'>
        <div className='col-org'>
          <div className='org-data-item'>
            <div className='orgz-prop'>
              <h5 className='prop-headz'>ORGANIZATOR</h5>
            </div>
            <input
              className='org-value'
              placeholder={org.naziv}
              disabled={inputState}
            />
            <img
              className={`check-x-org ${
                inputState ? "active-state" : "inactive-state"
              }`}
              src={x}
            />
            <img
              className={`check-done-org ${
                inputState ? "inactive-state" : "active-state"
              }`}
              src={done}
            />
          </div>
          <div className='org-data-item'>
            <div className='orgz-prop'>
              <h5 className='prop-headz'>ADDRESS</h5>
            </div>
            <input
              className='org-value'
              placeholder={org.adresa}
              disabled={inputState}
            />
            <img
              className={`check-x-org ${
                inputState ? "active-state" : "inactive-state"
              }`}
              src={x}
            />
            <img
              className={`check-done-org ${
                inputState ? "inactive-state" : "active-state"
              }`}
              src={done}
            />
          </div>
          <div className='org-data-item'>
            <div className='orgz-prop'>
              <h5 className='prop-headz'>SINCE</h5>
            </div>
            <input
              className='org-value'
              placeholder={org.godinaOsnivanja}
              disabled={inputState}
            />
            <img
              className={`check-x-org ${
                inputState ? "active-state" : "inactive-state"
              }`}
              src={x}
            />
            <img
              className={`check-done-org ${
                inputState ? "inactive-state" : "active-state"
              }`}
              src={done}
            />
          </div>
        </div>
        <div className='col-org'>
          <div className='org-data-item'>
            <div className='orgz-prop'>
              <h5 className='prop-headz'>PHONE</h5>
            </div>
            <input
              className='org-value'
              placeholder={org.kontaktTelefon}
              disabled={inputState}
            />
            <img
              className={`check-x-org ${
                inputState ? "active-state" : "inactive-state"
              }`}
              src={x}
            />
            <img
              className={`check-done-org ${
                inputState ? "inactive-state" : "active-state"
              }`}
              src={done}
            />
          </div>
          <div className='org-data-item'>
            <div className='orgz-prop'>
              <h5 className='prop-headz'>EMAIL</h5>
            </div>
            <input
              className='org-value'
              placeholder={org.email}
              disabled={inputState}
            />
            <img
              className={`check-x-org ${
                inputState ? "active-state" : "inactive-state"
              }`}
              src={x}
            />
            <img
              className={`check-done-org ${
                inputState ? "inactive-state" : "active-state"
              }`}
              src={done}
            />
          </div>
          <div className='org-data-item'>
            <div className='orgz-prop'>
              <h5 className='prop-headz'>LOGO</h5>
            </div>
            <input
              className='org-value'
              type='file'
              accept='image/png'
              disabled={inputState}
            />
            <img
              className={`check-x-org ${
                inputState ? "active-state" : "inactive-state"
              }`}
              src={x}
            />
            <img
              className={`check-done-org ${
                inputState ? "inactive-state" : "active-state"
              }`}
              src={done}
            />
          </div>
        </div>
        <div className='col-org'>
          <Dropdown options={festData} />

          <div className='btn-item'>
            <img src={plus} className='plus-img' onClick={handleBtnClick} />
          </div>
        </div>
      </div>
      <div className='del-edit-ics-org'>
        <button className='del-btn-org' onClick={handleDeleteClick}>
          <img className='del-btn-org-img' src={del} />
        </button>
        <button className='edit-btn-org' onClick={toggleStatus}>
          <img className='edit-btn-org-img' src={edit} />
        </button>
      </div>
    </div>
  );
}

export default AdminOrgCard;
