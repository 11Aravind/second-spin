import {Link} from "react-router-dom"
import "./CSS/bottomnavbar.css"
const Bottomnavbar = () => {
  return (
   <ul className="bottomNavcontainer">
    <li><Link to="/">Parts</Link></li>
    <li><Link to="/">Wheels</Link></li>
    <li><Link to="/">Exterior</Link></li>
    <li><Link to="/">Lighting</Link></li>
    <li><Link to="/">Body Parts</Link></li>
    <li><Link to="/">Interior</Link></li>
    <li><Link to="/">Audio&Electronics</Link></li>
    <li><Link to="/">Automotive Tools </Link></li>
    <li><Link to="/">Specialty</Link></li>
   </ul>
  )
}

export default Bottomnavbar
