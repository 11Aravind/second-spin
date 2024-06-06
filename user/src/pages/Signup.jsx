
const Signup = () => {
  return (
    <div>
       <div className="main-container">
      <div className="left-container">
        <div className="login-img">
          <img src="./images/signup.png" alt="img" />
        </div>
      </div>
      <div className="right-container">
        <h4 className="headding">Signup</h4>
        <input type="text" className="input-element" placeholder="Enter username " />
        <input type="password" className="input-element" placeholder="Enter password" />
        <input type="password" className="input-element" placeholder="Confirm password" />
        <button className="flatBtn">Signup</button>
      </div>
    </div>
    </div>
  )
}

export default Signup
