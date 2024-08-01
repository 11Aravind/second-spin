import { useNavigate } from "react-router-dom";
import {useRef,useState} from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./CSS/Login.css"
import axios from "axios"
export const Login = () => {
  const navigate = useNavigate()
  const emailRef = useRef();
  const passwordRef = useRef();
  const [msg, setMessage] = useState(false);
  const showHideMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 3000);
  }
  const checkPasswordLength = (e) => {
    const currentValue = e.target.value;
    if (currentValue.length < 6) {
      setMessage("Password length must be >=6 ");
    }
    else {
      setMessage("")
    }
  }
  const submitLoginForm = () => {
    const email = emailRef.current.value
    const password = passwordRef.current.value
    const loginData = {
      "email": email,
      "password": password
    }
    axios.post('http://localhost:5001/api/admin/login', loginData)
      .then((res) => {
        if (res.data.status === "failed") {
          toast.error(res.data.message)
        }
        else {
          const id = localStorage.setItem("adminId", JSON.stringify(res.data.user_id));
          navigate("/")
        }
      })
      .catch((err) => {
        showHideMessage("Something went wrong try again")
        console.log(err);
      });
  }
  const validateEmail = (e) => {
    const email = e.target.value
    // Regular expression pattern for a valid email address
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setMessage(pattern.test(email) ? " " : "Enter valid e-mail");
  };
  return (
    <div className="">
         <ToastContainer />
      <div className="formbold-main-wrapper">
        <div className="formbold-form-wrapper">
            <div className="formbold-form-title">
              <h2 className="">Login</h2>
            </div>
            <div className="formbold-mb-3">
              <input placeholder="E-mail"
                type="email"
                name="address"
                id="address"
                ref={emailRef}
                onChange={validateEmail}
                className="formbold-form-input"
              />
            </div>
            <div className="formbold-mb-3">
              <input
                type="password"
                className="formbold-form-input"
                ref={passwordRef}
                onChange={checkPasswordLength}
                placeholder="Password" />
            </div>
            <div className="formbold-mb-3">
              <button className="formbold-btn btn-color" type="button" onClick={submitLoginForm}>Login</button>
            </div>
        </div>
      </div>
    </div>
  );
}
