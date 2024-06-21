import { Link } from "react-router-dom"
import { useRef, useState } from "react"
import {httpRequest} from "../api.js"
const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmRef = useRef();
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
    else if (confirmRef.current.value !== "") {
      checkPasswordMatch()
    }
    else {
      setMessage("")
    }
  }
  const checkPasswordMatch = () => {
    if (passwordRef.current.value != confirmRef.current.value) {
      setMessage("Enter same passsword")
    }
    else
      setMessage("")
  }
  const validateEmail = (e) => {
    const email = e.target.value
    // Regular expression pattern for a valid email address
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setMessage(pattern.test(email) ? "" : "Enter valid e-mail");
  };
  const signUp=()=>{
    const email=emailRef.current.value
    const passsword=passwordRef.current.value 
    const signupData={
      "email":email,
      "passsword":passsword,
    }
    httpRequest('post', 'api/user/signup', signupData)
    .then((res) => {
      dispatch(setRoute("/signup"))
      navigate("/login")
    })
    .catch((err) =>  {
      showHideMessage("Something went wrong try again")
    console.log(err);
    });
  }
  return (
    <div className="main-container">
      <div className="login-container">
        {/* <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/ICloud_logo.svg/1200px-ICloud_logo.svg.png" alt="iCloud Logo"/> */}
        <h1>Signup</h1>
        <p>{msg}</p>
        <div className="form-group">
          <input type="test" id="apple-id" placeholder=" "
            ref={emailRef}
            onChange={validateEmail}
            required />
          <label htmlFor="apple-id">Email</label>
        </div>
        <div className="form-group">
          <input type="email" id="apple-id"
            placeholder=" "
            ref={passwordRef}
            onChange={checkPasswordLength}
            required />
          <label htmlFor="apple-id">Password</label>
        </div>
        <div className="form-group" id="password-groups" >
          <input type="password" id="cpassword"
            placeholder=" "
            ref={confirmRef}
            onChange={checkPasswordMatch}
            required />
          <label htmlFor="cpassword">Confirm Password</label>
        </div>
        {/* <button className="login-button">Signup</button> */}
        <button type="submit"
            className={(msg.length === 0 ) ? "login-button" : "login-button disabled"}
            onClick={signUp} disabled={(msg.length === 0) ? false : true}>
            Signup
          </button>
        <Link to="/login" className="forgot-password">Already have an account ? Login</Link>
      </div>
    </div>
  )
}

export default Login
