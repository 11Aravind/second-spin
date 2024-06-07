import "./css/login.css";
import { useRef ,useState } from "react";
const Login = () => {
  const name = useRef("");
  const password = useRef("");
  const [focusedInput, setFocusedInput] = useState(null);
  const handleFocus = (inputName) => {
    setFocusedInput(inputName);
  };

  const renderInput = (type,name, placeholder, reference) => (
    <div className="input-container">
      {focusedInput === name ? <label>{placeholder}</label> : null}
      <input
        type={type}
        name={name}
        ref={reference}
        className="input-element"
        placeholder={focusedInput === name ? '' : placeholder}
        onFocus={() => handleFocus(name)}
        onBlur={()=> setFocusedInput(null)}
      />
    </div>
  );
  return (
    <div className="main-container">
      <div className="left-container">
        <div className="login-img">
          <img src="./images/signin.png" alt="img" />
        </div>
      </div>
      <div className="right-container">
        <h4 className="headding">Login</h4>
        {renderInput("text",'username', 'Username', name)}
        {renderInput("password",'Password', 'Password', password)}
        <button className="flatBtn">Login</button>
      </div>
    </div>
  )
}

export default Login
