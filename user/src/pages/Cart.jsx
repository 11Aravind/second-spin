import { Link } from "react-router-dom"
import "./css/cart.css"
import Quantitybtn from "../components/Quantitybtn";
import { useCart } from "react-use-cart";
const Cart = () => {
  const { isEmpty, items, cartTotal } = useCart();
  return (
    <div className="spacing">
      {isEmpty ? (<div className="cart-container">
        <div className="cart-icon">
          <img src="	https://cdn.carid.com/dist/css/prod-images/4eaf1a5d.svg" alt="" />
        </div>
        <h3 className="cart-msg">Your Shopping Cart is Empty </h3>
        <Link to="/"> <button className="keep-shoppingBtn">Keep Shoping</button></Link>
      </div>) : (
        <div className="row">
          {
            items.map((item, index) => {
              return (
                <div className="cart-row" key={index}>
                  <div className="imgContainer"><img src={item[0].image} alt="img" /></div>
                  <p>{item[0].name}</p>
                  <Quantitybtn item={item} />
                </div>

              )
            })
          }
        </div>
      )
      }

    </div>
  )
}

export default Cart
