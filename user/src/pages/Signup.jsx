import { Link } from "react-router-dom"
const Login = () => {
  return (
<div className="main-container">
<div className="login-container">
    {/* <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/ICloud_logo.svg/1200px-ICloud_logo.svg.png" alt="iCloud Logo"/> */}
    <h1>Signup</h1>
    <div className="form-group">
      <input type="test" id="apple-id" placeholder=" " required/>
      <label htmlFor="apple-id">Username</label>   
    </div>
    <div className="form-group">
      <input type="email" id="apple-id" placeholder=" " required/>
      <label htmlFor="apple-id">E-mail</label>   
    </div>
    <div className="form-group" id="password-group" >
      <input type="password" id="password" placeholder=" " required/>
      <label htmlFor="password">Password</label>
    </div>
    <button className="login-button">Signup</button>
    <Link to="/login" className="forgot-password">Already have an account ? Login</Link>
  </div>  
</div> 
  )
}

export default Login
