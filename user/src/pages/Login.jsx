import { Link } from "react-router-dom"
import "./css/login.css"
import {useRef,useState} from "react"
const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [msg, setMessage] = useState(false);
  const checkPasswordLength = (e) => {
    const currentValue = e.target.value;
    if (currentValue.length < 6) {
      setMessage("Password length must be >=6 ");
    }
    else {
      setMessage("")
    }
  }
  const validateEmail = (e) => {
    const email = e.target.value
    // Regular expression pattern for a valid email address
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setMessage(pattern.test(email) ? "" : "Enter valid e-mail");
  };
  return (
<div className="main-container">
<div className="login-container">
    {/* <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/ICloud_logo.svg/1200px-ICloud_logo.svg.png" alt="iCloud Logo"/> */}
    <h1>Login</h1>
    <p>{msg}</p>
    <div className="form-group">
      <input type="email" id="apple-id" placeholder=" "
      ref={emailRef}
      onChange={validateEmail}
      required/>
      <label htmlFor="apple-id">E-mail</label>   
    </div>
    <div className="form-group" id="password-group" >
      <input type="password" id="password" placeholder=" "
      ref={passwordRef}
      onChange={checkPasswordLength}
      required/>
      <label htmlFor="password">Password</label>
    </div>
    <button className="login-button">Sign In</button>
    <Link to="/signup" className="forgot-password">New to Second spin? Create an account</Link>
  </div>  
</div> 
  )
}

export default Login
