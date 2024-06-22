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
        <div className="main-cart-container">
          <div className="left">
            <div className="row">
              {
                items.map((item, index) => {
                  return (
                    <div className="cart-row" key={index}>
                      <div className="imgContainer"><img src={item[0].image} alt="img" /></div>
                      <div className="desc">{item[0].name}
                      <Quantitybtn item={item} />
                      </div>
                  
                    </div>

                  )
                })
              }
            </div>
          </div>
          <div className="right">
           <div className="right-headding"> PRICE DETAILS</div>
            <div className="main-cart-container">
              <div>Price (1 item)</div>
              <div>  ₹2,999</div>
            </div>
            <div className="main-cart-container">
              <div>Total Amount</div>
              <div> ₹1,368</div>
            </div>
            <div className="main-cart-container">
           <button>Place Holder</button>
            </div>
          </div>
        </div>
      )
      }

    </div>
  )
}

export default Cart
