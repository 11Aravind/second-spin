import { useState } from "react";
import "./css/productdetails.css"
import { Link, useParams } from "react-router-dom";
import { useCart } from "react-use-cart";
import products from "./data.json"
const ProductDetails = () => {

  const [description, isDescriptionVisible] = useState(true)
  const [warenty, isWarrantyVisible] = useState(false)
  const { id } = useParams();
  const product = products.filter((item) => item._id === id);
  // console.log(id);
  // console.log(product);
  const { addItem, items } = useCart()
  const addToCart = () => {
    let tmpProduct = JSON.parse(JSON.stringify(product));
    console.log(tmpProduct);
    tmpProduct.id = product[0]._id;
    tmpProduct.price = product[0].newPrice;
    addItem(tmpProduct, 1);
    console.log(items);
  }
  return (
    <div className="spaceing">
      <div className="productDetails-container">
        <div className="left">
          {product && <img src={product[0].image} alt="" />}
        </div>
        <div className="rigt">
          <div className="product-name">
            {product[0].name}
          </div>
          <div className="price productdetails-price">
            <div className="newprice">₹ {product && product[0].newPrice}</div>
            <div className="oldPrice"> ₹ {product && product[0].oldPrice}</div>
          </div>
          <div className="addToCart fixedBtn">
            {/* <ButtonComponent
              text="ADD TO CART"
              classs="addbtn smallBtn checkOut"
              product={product}
              onClick={addProduct}
            /> */}
            <Link to="/cart">
              <button className="small-btn" onClick={addToCart}>ADD TO CART</button>
            </Link>
            {/* {showCart && <Cart callbackShowCart={callbackShowCart} />} */}
          </div>
          <div className="sub-headding-dropdown" onClick={() => isDescriptionVisible(!description)}>
            <div >Description</div>
            <div className="icon">{description ? <i className="bi bi-chevron-up"></i> : <i className="bi bi-chevron-down"></i>}</div>
          </div>
          <div className="aboutProductDescription">

            {description && product && product[0].description}
          </div>
          <div className="sub-headding-dropdown" onClick={() => isWarrantyVisible(!warenty)}>
            <div >Warranty</div>
            <div className="icon">{warenty ? <i className="bi bi-chevron-up"></i> : <i className="bi bi-chevron-down"></i>}</div>
          </div>
          <div className="aboutProductDescription">
            {warenty && product && product[0].warranty}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
