import "../styles/orgAdminStyles.css";
import del from "../data/delete.svg";
import edit from "../data/edit.svg";
import x from "../data/x.svg";
import jsonData from "../data/data.json";
import done from "../data/done_FILL0_wght400_GRAD0_opsz24.svg";
import { useState } from "react";
import { useEffect } from "react";

function AdminOrgCard({ org, index, onDelete }) {
  const [festData, setFestData] = useState([]);

  useEffect(() => {
    const data = [];
    let fests = jsonData.festivali[org.festivals];
    for (const festKey in fests) {
      data.push(fests[festKey].naziv);
    }
    setFestData(data);
  }, []);

  const [inputState, setInputState] = useState(true);

  function handleDelClick() {
    onDelete(index);
  }

  function toggleStatus() {
    if (inputState) {
      setInputState(false);
    } else {
      setInputState(true);
    }
  }

  return (
    <div className='orgz-container'>
      <form className='col-org-container'>
        <div className='col-org'>
          <div className='org-data-item'>
            <div className='orgz-prop'>
              <h5 className='prop-headz'>ORGANIZATOR</h5>
            </div>
            <input
              className='org-value'
              placeholder={org.name}
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
              placeholder={org.address}
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
              placeholder={org.year}
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
              placeholder={org.telephone}
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
          {festData.map((festName, index) => (
            <div className='org-data-item'>
              <div className='orgz-prop'>
                <h5 className='prop-headz'>FESTIVAL {index + 1}</h5>
              </div>
              <input
                className='org-value'
                placeholder={festName}
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
          ))}
        </div>
      </form>
      <div className='del-edit-ics-org'>
        <button className='del-btn-org' onClick={handleDelClick}>
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
