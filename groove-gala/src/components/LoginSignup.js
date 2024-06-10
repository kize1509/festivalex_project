import "../styles/LoginSignup.css";
import pass_icon from "../data/password.svg";
import user_icon from "../data/user.svg";
import email_icon from "../data/mail.svg";
import work from "../data/work.svg";
import phone from "../data/phone.svg";
import date from "../data/date.svg";
import address from "../data/address.svg";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { saveUserData, fetchDocuments } from "../firebaseCom/firebase";
import { User } from "../models/User";
import DoneAction from "./dialogs/DoneAction";
import charactersJson from "../data/constants.json";

const generateRandomId = (length = 19) => {
  const characters = charactersJson.characters;
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

function LoginSignup({
  onLogin,
  onClose,
  onSub,
  setTitle,
  currName,
  onFailLogin,
}) {
  const [action, setAction] = useState(currName);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const [generatedId, setGeneratedId] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    name: "",
    lastName: "",
    birthdate: "",
    address: "",
    phoneNumber: "",
    occupation: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    async function fetchUsers() {
      const fetched = await fetchDocuments(`korisnici`);
      setItems(fetched);
    }
    fetchUsers();
  }, []);

  const handleGenerateId = () => {
    const newId = "-" + generateRandomId();
    setGeneratedId(newId);
  };

  const handleBtnClick = () => {
    navigate("/adminMain");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateData = () => {
    const data = {
      korisnickoIme: formData.username,
      lozinka: formData.password,
      ime: formData.name,
      prezime: formData.lastName,
      email: formData.email,
      datumRodjenja: formData.birthdate,
      adresa: formData.address,
      telefon: formData.phoneNumber,
      zanimanje: formData.occupation,
    };

    if (
      !data.korisnickoIme ||
      !data.lozinka ||
      !data.ime ||
      !data.prezime ||
      !data.email ||
      !data.datumRodjenja ||
      !data.adresa ||
      !data.telefon ||
      !data.zanimanje
    ) {
      alert("All fields are required.");
      return false;
    }

    const isUsernameUnique = items.every((item, i) => {
      return item.korisnickoIme !== data.korisnickoIme;
    });
    if (!isUsernameUnique) {
      alert("Username already exists.");
      return false;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!data.lozinka.match(passwordRegex)) {
      alert(
        "Password must contain at least 8 characters, including letters and numbers."
      );
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email.match(emailRegex)) {
      alert("Invalid email address.");
      return false;
    }

    if (!validateDatumRodjenja(data.datumRodjenja)) {
      alert("Invalid birth date format.");
      return false;
    }

    const addressRegex = /^[a-zA-Z0-9šđžćč\s]+,\s*[a-zA-Zšđžćč\s]+,\s*\d{5}$/;
    if (!data.adresa.match(addressRegex)) {
      alert(
        "Invalid address format. Please use: Street Address, City, Postal Code"
      );
      return false;
    }

    const phoneRegex = /^06[0-6]\d{6,7}$/;
    if (!data.telefon.match(phoneRegex)) {
      console.log(data.telefon);
      alert("Invalid Serbian mobile phone number format.");
      return false;
    }

    return true;
  };

  const validateDatumRodjenja = (datumRodjenja) => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (!dateRegex.test(datumRodjenja)) {
      return false;
    }

    const [year, month, day] = datumRodjenja.split("-").map(Number);

    const date = new Date(year, month - 1, day);

    if (isNaN(date.getTime())) {
      return false;
    }

    const [parsedYear, parsedMonth, parsedDay] = [
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate(),
    ];

    if (year !== parsedYear || month !== parsedMonth || day !== parsedDay) {
      return false;
    }

    return true;
  };

  const handleInput = (e) => {
    e.target.setCustomValidity("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (action === "Login") {
      let isIn = false;
      items.forEach((element) => {
        if (
          element.email == formData.email &&
          element.lozinka == formData.password
        ) {
          isIn = true;
        }
      });
      if (isIn) {
        onClose();
        setTitle("LOGGING IN");
        onSub();
        onLogin(formData.email);
        return;
      }
      onFailLogin();
    } else {
      if (!validateData()) {
        return;
      }
      const user = new User(
        generatedId,
        formData.address,
        formData.birthdate,
        formData.email,
        formData.name,
        formData.username,
        formData.password,
        formData.lastName,
        formData.phoneNumber,
        formData.occupation
      );
      setTitle("SIGNIG UP");
      onSub();
      saveUserData(user);
      onClose();
      return;
    }
  };

  return (
    <div className='main-container' onLoad={handleGenerateId}>
      <div className='header-ls'>
        <div className='heading-ls'>{action}</div>
        <div className='underline'></div>
      </div>
      <form onSubmit={handleSubmit} className='input-form'>
        {action !== "Login" && (
          <>
            <div className='input-ls'>
              <img src={user_icon} alt='' />
              <input
                className='input-input-ls'
                type='text'
                name='username'
                placeholder='Username'
                value={formData.username}
                onChange={handleChange}
                onInput={handleInput}
                required
              />
            </div>
            <div className='input-ls'>
              <img src={user_icon} alt='' />
              <input
                className='input-input-ls'
                type='text'
                name='name'
                placeholder='Name'
                value={formData.name}
                onChange={handleChange}
                onInput={handleInput}
                required
              />
            </div>
            <div className='input-ls'>
              <img src={user_icon} alt='' />
              <input
                className='input-input-ls'
                type='text'
                name='lastName'
                placeholder='Last Name'
                value={formData.lastName}
                onChange={handleChange}
                onInput={handleInput}
                required
              />
            </div>
            <div className='input-ls'>
              <img src={date} alt='' />
              <input
                className='input-input-ls'
                type='date'
                name='birthdate'
                placeholder='Birthdate'
                value={formData.birthdate}
                onChange={handleChange}
                onInput={handleInput}
                required
              />
            </div>
            <div className='input-ls'>
              <img src={address} alt='' />
              <input
                className='input-input-ls'
                type='text'
                name='address'
                placeholder='Address'
                value={formData.address}
                onChange={handleChange}
                onInput={handleInput}
                required
              />
            </div>
            <div className='input-ls'>
              <img src={phone} alt='' />
              <input
                className='input-input-ls'
                type='tel'
                name='phoneNumber'
                placeholder='Phone Number'
                value={formData.phoneNumber}
                onChange={handleChange}
                onInput={handleInput}
                required
              />
            </div>
            <div className='input-ls'>
              <img src={work} alt='' />
              <input
                className='input-input-ls'
                type='text'
                name='occupation'
                placeholder='Occupation'
                value={formData.occupation}
                onChange={handleChange}
                onInput={handleInput}
                required
              />
            </div>
          </>
        )}

        <div className='input-ls'>
          <img src={email_icon} alt='' />
          <input
            className='input-input-ls'
            type='email'
            name='email'
            placeholder='Email'
            value={formData.email}
            onChange={handleChange}
            onInput={handleInput}
            required
          />
        </div>
        <div className='input-ls'>
          <img src={pass_icon} alt='' />
          <input
            className='input-input-ls'
            type='password'
            name='password'
            placeholder='Password'
            value={formData.password}
            onChange={handleChange}
            onInput={handleInput}
            required
          />
        </div>
        <button className='sub-btn' type='submit'>
          {action}
        </button>
      </form>
      {action === "Sign Up" ? (
        <div></div>
      ) : (
        <div className='admin-redirect'>
          Go to the admin page?{" "}
          <span onClick={handleBtnClick}>Click here!</span>
        </div>
      )}

      <div className='submit-container'>
        <div
          className={action === "Login" ? "submit gray" : "submit"}
          onClick={() => {
            setAction("Sign Up");
          }}
        >
          Sign Up
        </div>
        <div
          className={action === "Sign Up" ? "submit gray" : "submit"}
          onClick={() => {
            setAction("Login");
          }}
        >
          Login
        </div>
      </div>
    </div>
  );
}

export default LoginSignup;
