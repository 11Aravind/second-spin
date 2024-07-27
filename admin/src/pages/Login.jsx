import { useNavigate } from "react-router-dom";
import {useRef,useState} from "react"

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
    axios.post('api/user/login', loginData)
      .then((res) => {
        console.log(res);
        if (res.status === "failed") {

          showHideMessage(res.message)
        }
        else {
          const id = localStorage.setItem("userId", JSON.stringify(res.user_id));
          navigate("/")
        }
        // dispatch(setRoute("/signup"))
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
    <div className="content-div">
      <div className="formbold-main-wrapper">
        <div className="formbold-form-wrapper">
          <form method="POST">
            <div className="formbold-form-title">
              <h2 className="">SIGN IN</h2>
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
              <button className="formbold-btn">SIGN IN</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
