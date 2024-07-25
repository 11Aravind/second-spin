import { Link } from "react-router-dom"
import "./CSS/bottomnavbar.css"
const Bottomnavbar = () => {
  return (
    <ul className="bottomNavcontainer">
      <li><Link to="/category/Parts">Parts</Link></li>
      <li><Link to="/category/Wheels">Wheels</Link></li>
      <li><Link to="/category/Exterior">Exterior</Link></li>
      <li><Link to="/category/Lighting">Lighting</Link></li>
      <li><Link to="/category/BodyParts">Body Parts</Link></li>
      <li><Link to="/category/Interior">Interior</Link></li>
      <li><Link to="/category/Audio&Electronics">Audio&Electronics</Link></li>
      <li><Link to="/category/AutomotiveTools">Automotive Tools </Link></li>
      <li><Link to="/category/Specialty">Specialty</Link></li>
    </ul>
  )
}

export default Bottomnavbar
