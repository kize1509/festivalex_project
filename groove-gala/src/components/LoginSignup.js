import "../styles/LoginSignup.css";
import pass_icon from "../data/password.svg";
import user_icon from "../data/user.svg";
import email_icon from "../data/mail.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginSignup({ data }) {
  const [action, setAction] = useState(data);
  const navigate = useNavigate();

  const handleBtnClick = () => {
    navigate("/adminMain");
  };

  return (
    <div className='main-container'>
      <div className='header-ls'>
        <div className='heading-ls'>{action}</div>
        <div className='underline'></div>
      </div>
      <div className='input-form'>
        {action === "Login" ? (
          <div></div>
        ) : (
          <div className='input-ls'>
            <img src={user_icon} alt='' />
            <input className='input-input-ls' type='text' placeholder='Name' />
          </div>
        )}

        <div className='input-ls'>
          <img src={email_icon} alt='' />
          <input className='input-input-ls' type='email' placeholder='Email' />
        </div>
        <div className='input-ls'>
          <img src={pass_icon} alt='' />
          <input
            className='input-input-ls'
            type='password'
            placeholder='Password'
          />
        </div>
      </div>
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
