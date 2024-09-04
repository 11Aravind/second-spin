import "./CSS/Topnavbar.css"
import { Link } from "react-router-dom"
const Topnavbar = () => {
  const userId = localStorage.getItem("userId")

  return (
    <div className="top-navbar-container">
      <div className="nav-left">
        <span className="phone"><i className="bi bi-telephone-fill ic"></i>1800-313-3302</span>|
        <span className="email"><i className="bi bi-envelope ic"></i>customercare@secondspin.com</span>
      </div>
      <div className="nav-right">
        <span className="certificate">
          <i className="bi bi-instagram ic"></i>
          secondspin</span> |<span className="whyus"><i className="bi bi-facebook ic"></i>
          seconspinfacebook</span>
        {!userId && (<>| <span className="craditials"> <Link to="/login" className="white">login / signup</Link>  </span></>)}

      </div>
    </div>
  )
}

export default Topnavbar
