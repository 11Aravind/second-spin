import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRef, useState } from "react";
import { httpRequest } from "../api.js";

const Signup = () => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmRef = useRef();
  const [msg, setMessage] = useState("");

  const showHideMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 4000);
  };

  const checkPasswordLength = (e) => {
    const currentValue = e.target.value;
    if (currentValue.length < 6) {
      setMessage("Password must be at least 6 characters long");
    }
    else if (confirmRef.current.value !== "") {
      checkPasswordMatch();
    }
    else {
      setMessage(" ");
    }
  };

  const checkPasswordMatch = () => {
    if (passwordRef.current.value !== confirmRef.current.value) {
      setMessage("Passwords do not match");
    }
    else {
      setMessage("");
    }
  };

  const validateEmail = (e) => {
    const email = e.target.value;
    // Regular expression pattern for a valid email address
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setMessage(pattern.test(email) ? " " : "Enter valid e-mail");
  };

  const showSuccessToastAndNavigate = async () => {
    await toast.success("Successfully Registered", {
      position: 'top-right',
      autoClose: 3000,
    });
    navigate("/login");
  };

  const signUp = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const signupData = {
      "email": email,
      "password": password,
    };
    httpRequest('post', 'api/user/signup', signupData)
      .then((res) => {
        if (res.status === "failed") {
          showHideMessage("The user already exists. Please login.");
        }
        else if (res.status === "success") {
          showSuccessToastAndNavigate();
        }
      })
      .catch((err) => {
        showHideMessage("Something went wrong. Please try again.");
        console.log(err);
      });
  };

  return (
    <div className="main-container">
      <div className="login-container">
        <h1>Signup</h1>
        <p className="errorMsg">{msg}</p>
        <ToastContainer position="top-right" />
        <div className="form-group">
          <input
            type="email"
            id="email"
            placeholder=" "
            ref={emailRef}
            onChange={validateEmail}
            required
          />
          <label htmlFor="email">Email</label>
        </div>
        <div className="form-group">
          <input
            type="password"
            id="password"
            placeholder=" "
            ref={passwordRef}
            onChange={checkPasswordLength}
            required
          />
          <label htmlFor="password">Password</label>
        </div>
        <div className="form-group">
          <input
            type="password"
            id="confirm-password"
            placeholder=" "
            ref={confirmRef}
            onChange={checkPasswordMatch}
            required
          />
          <label htmlFor="confirm-password">Confirm Password</label>
        </div>
        <button
          type="button" // Changed type to button
          className={(msg.length === 0) ? "login-button" : "login-button disabled"}
          onClick={signUp}
          disabled={(msg.length === 0) ? false : true}
        >
          Signup
        </button>
        <Link to="/login" className="forgot-password">
          Already have an account? Login
        </Link>
      </div>
    </div>
  );
};

export default Signup;
