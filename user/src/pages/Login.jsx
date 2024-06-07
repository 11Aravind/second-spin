import { useRef, useState } from "react";
import { httpRequest } from "../api.js"
import "./css/login.css";
const Login = () => {
  const name = useRef("");
  const password = useRef("");
  const [focusedInput, setFocusedInput] = useState(null);
  const handleFocus = (inputName) => {
    setFocusedInput(inputName);
  };

  const renderInput = (type, name, placeholder, reference) => (
    <div className="input-container">
      {focusedInput === name ? <label>{placeholder}</label> : null}
      <input
        type={type}
        name={name}
        ref={reference}
        className="input-element"
        placeholder={focusedInput === name ? '' : placeholder}
        onFocus={() => handleFocus(name)}
        onBlur={() => setFocusedInput(null)}
      />
    </div>
  );
  const handleLogin = () => {
    const loginDatas = {
      "email": name.current.value,
      "password": password.current.value
    }
    httpRequest("post", "server/user/login",loginDatas)
    .then((res)=>console.log(res))
    .catch((err)=>console.log(err))
  }
  return (
    <div className="main-container">
      <div className="left-container">
        <div className="login-img">
          <img src="./images/signin.png" alt="img" />
        </div>
      </div>
      <div className="right-container">
        <h4 className="headding">Login</h4>
        {renderInput("text", 'Email', 'Email', name)}
        {renderInput("password", 'Password', 'Password', password)}
        <button className="flatBtn" onClick={handleLogin}>Login</button>
      </div>
    </div>
  )
}

export default Login
