import { Link } from "react-router-dom"
import "./css/cart.css"
const Cart = () => {
  return (
    <div className="cart-container">
      <div className="cart-icon">
        <img src="	https://cdn.carid.com/dist/css/prod-images/4eaf1a5d.svg" alt="" />
      </div>
      <h3 className="cart-msg">Your Shopping Cart is Empty </h3>
     <Link to="/"> <button className="keep-shoppingBtn">Keep Shoping</button></Link>
    </div>
  )
}

export default Cart
