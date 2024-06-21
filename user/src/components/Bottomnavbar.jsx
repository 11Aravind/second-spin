import {Link} from "react-router-dom"
import "./CSS/bottomnavbar.css"
const Bottomnavbar = () => {
  return (
   <ul className="bottomNavcontainer">
    <li><Link to="/product">Parts</Link></li>
    <li><Link to="/product">Wheels</Link></li>
    <li><Link to="/product">Exterior</Link></li>
    <li><Link to="/product">Lighting</Link></li>
    <li><Link to="/product">Body Parts</Link></li>
    <li><Link to="/product">Interior</Link></li>
    <li><Link to="/product">Audio&Electronics</Link></li>
    <li><Link to="/product">Automotive Tools </Link></li>
    <li><Link to="/product">Specialty</Link></li>
   </ul>
  )
}

export default Bottomnavbar
