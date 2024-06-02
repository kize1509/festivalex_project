import "../styles/LoginSignup.css";
import pass_icon from "../data/password.svg";
import user_icon from "../data/user.svg";
import email_icon from "../data/mail.svg";
import work from "../data/work.svg";
import phone from "../data/phone.svg";
import date from "../data/date.svg";
import address from "../data/address.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveUserData } from "../firebaseCom/firebase";
import { User } from "../models/User";
import charactersJson from "../data/constants.json";

const generateRandomId = (length = 19) => {
  const characters = charactersJson.characters;
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

function LoginSignup({ data }) {
  const [action, setAction] = useState(data);
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

  const handleInvalid = (e) => {
    e.target.setCustomValidity(
      `Please fill out the ${e.target.placeholder.toLowerCase()} field.`
    );
  };

  const handleInput = (e) => {
    e.target.setCustomValidity("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (action === "Login") {
      console.log("Logging in with", formData);
    } else {
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
      saveUserData(user);
      console.log("Signing up with", formData);
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
                onInvalid={handleInvalid}
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
                onInvalid={handleInvalid}
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
                onInvalid={handleInvalid}
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
                onInvalid={handleInvalid}
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
                onInvalid={handleInvalid}
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
                onInvalid={handleInvalid}
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
                onInvalid={handleInvalid}
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
            onInvalid={handleInvalid}
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
            onInvalid={handleInvalid}
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
          onClick={() => setAction("Sign Up")}
        >
          Sign Up
        </div>
        <div
          className={action === "Sign Up" ? "submit gray" : "submit"}
          onClick={() => setAction("Login")}
        >
          Login
        </div>
      </div>
    </div>
  );
}

export default LoginSignup;
