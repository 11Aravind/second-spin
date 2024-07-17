import { Link, useNavigate } from "react-router-dom"
import "./css/login.css"
import {httpRequest} from "../api.js"
import {useRef,useState} from "react"
const Login = () => {
  const navigate=useNavigate()
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
  const submitLoginForm=()=>{
    const email=emailRef.current.value
    const password=passwordRef.current.value
    const loginData={
      "email":email,
      "password":password
    }
    httpRequest('post', 'api/user/login', loginData)
    .then((res) => {
      console.log(res);
      if(res.status==="failed")
        {
          
          showHideMessage(res.message)
        }
        else{
          const id = localStorage.setItem("userId", JSON.stringify(res.user_id));
          navigate("/")
        }
      // dispatch(setRoute("/signup"))
    })
    .catch((err) =>  {
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
<div className="main-container">
<div className="login-container">
    {/* <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/ICloud_logo.svg/1200px-ICloud_logo.svg.png" alt="iCloud Logo"/> */}
    <h1>Login</h1>
    <p className="errorMsg">{msg}</p>
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
    <button 
    // className="login-button" 
     className={(msg.length === 0) ? "login-button" : "login-button disabled"}
    onClick={submitLoginForm}
    disabled={(msg.length === 0) ? false : true}>Sign In</button>
    <Link to="/signup" className="forgot-password">New to Second spin? Create an account</Link>
  </div>  
</div> 
  )
}

export default Login
