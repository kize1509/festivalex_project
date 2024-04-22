import "../styles/userCardStyles.css";
import del from "../data/delete.svg";
import edit from "../data/edit.svg";
import x from "../data/x.svg";
import done from "../data/done_FILL0_wght400_GRAD0_opsz24.svg";
import { useState } from "react";

function UserCard({ user, index, onDelete }) {
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
    <div className='user-container'>
      <form className='col-container'>
        <div className='col'>
          <div className='user-data-item'>
            <div className='user-prop'>
              <h5 className='prop-head'>USERNAME</h5>
            </div>
            <input
              className='user-value'
              placeholder={user.korisnickoIme}
              disabled={inputState}
            />
            <img
              className={`check-x ${
                inputState ? "active-state" : "inactive-state"
              }`}
              src={x}
            />
            <img
              className={`check-done ${
                inputState ? "inactive-state" : "active-state"
              }`}
              src={done}
            />
          </div>
          <div className='user-data-item'>
            <div className='user-prop'>
              <h5 className='prop-head'>PASSWORD</h5>
            </div>
            <input
              className='user-value'
              placeholder={user.lozinka}
              disabled={inputState}
            />
            <img
              className={`check-x ${
                inputState ? "active-state" : "inactive-state"
              }`}
              src={x}
            />
            <img
              className={`check-done ${
                inputState ? "inactive-state" : "active-state"
              }`}
              src={done}
            />
          </div>
          <div className='user-data-item'>
            <div className='user-prop'>
              <h5 className='prop-head'>NAME</h5>
            </div>
            <input
              className='user-value'
              placeholder={user.ime}
              disabled={inputState}
            />
            <img
              className={`check-x ${
                inputState ? "active-state" : "inactive-state"
              }`}
              src={x}
            />
            <img
              className={`check-done ${
                inputState ? "inactive-state" : "active-state"
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
              className='user-value'
              placeholder={user.prezime}
              disabled={inputState}
            />
            <img
              className={`check-x ${
                inputState ? "active-state" : "inactive-state"
              }`}
              src={x}
            />
            <img
              className={`check-done ${
                inputState ? "inactive-state" : "active-state"
              }`}
              src={done}
            />
          </div>
          <div className='user-data-item'>
            <div className='user-prop'>
              <h5 className='prop-head'>EMAIL</h5>
            </div>
            <input
              className='user-value'
              placeholder={user.email}
              disabled={inputState}
            />
            <img
              className={`check-x ${
                inputState ? "active-state" : "inactive-state"
              }`}
              src={x}
            />
            <img
              className={`check-done ${
                inputState ? "inactive-state" : "active-state"
              }`}
              src={done}
            />
          </div>
          <div className='user-data-item'>
            <div className='user-prop'>
              <h5 className='prop-head'>DATE OF BIRTH</h5>
            </div>
            <input
              className='user-value'
              placeholder={user.datumRodjenja}
              disabled={inputState}
            />
            <img
              className={`check-x ${
                inputState ? "active-state" : "inactive-state"
              }`}
              src={x}
            />
            <img
              className={`check-done ${
                inputState ? "inactive-state" : "active-state"
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
              className='user-value'
              placeholder={user.adresa}
              disabled={inputState}
            />
            <img
              className={`check-x ${
                inputState ? "active-state" : "inactive-state"
              }`}
              src={x}
            />
            <img
              className={`check-done ${
                inputState ? "inactive-state" : "active-state"
              }`}
              src={done}
            />
          </div>
          <div className='user-data-item'>
            <div className='user-prop'>
              <h5 className='prop-head'>TELEPHONE</h5>
            </div>
            <input
              className='user-value'
              placeholder={user.telefon}
              disabled={inputState}
            />
            <img
              className={`check-x ${
                inputState ? "active-state" : "inactive-state"
              }`}
              src={x}
            />
            <img
              className={`check-done ${
                inputState ? "inactive-state" : "active-state"
              }`}
              src={done}
            />
          </div>
          <div className='user-data-item'>
            <div className='user-prop'>
              <h5 className='prop-head'>PROFESSION</h5>
            </div>
            <input
              className='user-value'
              placeholder={user.zanimanje}
              disabled={inputState}
            />
            <img
              className={`check-x ${
                inputState ? "active-state" : "inactive-state"
              }`}
              src={x}
            />
            <img
              className={`check-done ${
                inputState ? "inactive-state" : "active-state"
              }`}
              src={done}
            />
          </div>
        </div>
      </form>
      <div className='del-edit-ics'>
        <button className='del-btn' onClick={handleDelClick}>
          <img className='del-btn-img' src={del} />
        </button>
        <button className='edit-btn' onClick={toggleStatus}>
          <img className='edit-btn-img' src={edit} />
        </button>
      </div>
    </div>
  );
}

export default UserCard;
