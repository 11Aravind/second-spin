import "./css/login.css"
const Login = () => {
  return (
    <div className="loginContainer">
      <div className="left-container">
        <div className="login-img">
          <img src="./images/signin.png" alt="img" />
        </div>
      </div>
      <div className="right-container">
        <h4 className="headding">Login</h4>
        <input type="text" className="txtBox" placeholder="Enter username " />
        <input type="text" className="txtBox" placeholder="Enter password" />
        <button className="flatBtn">Login</button>
      </div>
    </div>
  )
}

export default Login
