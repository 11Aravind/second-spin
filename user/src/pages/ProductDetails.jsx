import "./css/productdetails.css"
import { Link, useParams } from "react-router-dom";
const ProductDetails = () => {
  const id = useParams()
  console.log(id);
  const product = [
    {
      "_id": "66026c09744acd3776cb5b59",
      "name": "Lumen® - Custom Headlights",
      "image": "https://ic.carid.com/lumen/items/custom-headlights_6.jpg",
      "description": "Custom Headlights by Lumen®. Replace hazy and discolored headlights or give the front of your car or truck a whole new look. Whether you just want to improve your vision or upgrade your vehicle’s appearance, Lumen makes it easy and affordable with these bolt-on headlight assemblies. Don’t drive with dim and dangerous opaque headlights or put up with boring and expensive OEM replacements, when you can get improved illumination and custom style that’s easy to install and easy on your wallet. ",
      "warranty": "Legally, a vehicle manufacturer cannot void the warranty on a vehicle due to an aftermarket part unless they can prove that the aftermarket part caused or contributed to the failure in the vehicle (per the Magnuson Moss Warranty Act (15 U.S.C. 2302(C)) ",
      "oldPrice": 399,
      "newPrice": 359,
      "status": false,
      "category_id": "66026b1c7e9a53a020885213",
      "__v": 0
    }
  ];
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
            <div className="oldPrice"> ₹ {product && product[0].oldPrice}</div>
            <div className="newprice">₹ {product && product[0].newPrice}</div>
          </div>
          <div className="addToCart fixedBtn">
            {/* <ButtonComponent
              text="ADD TO CART"
              classs="addbtn smallBtn checkOut"
              product={product}
              onClick={addProduct}
            /> */}
            <Link to="/cart">
              <button className="small-btn">ADD TO CART</button>
            </Link>
            {/* {showCart && <Cart callbackShowCart={callbackShowCart} />} */}
          </div>
          <div className="sub-headding-dropdown">
            <div>Description</div>
            <div className="icon"><i class="bi bi-chevron-down"></i></div>
          </div>
          <div className="aboutProductDescription">
            {product && product[0].description}
          </div>
          <div className="sub-headding-dropdown">
            <div>Warranty</div>
            <div className="icon"><i class="bi bi-chevron-up"></i></div>
          </div>
          <div className="aboutProductDescription">
            {product && product[0].warranty}
          </div>
          {/* <div className="product-featureCOntainer">
            {
              productFeature.map((feature, index) =>
                <div className="shipping" key={index}>
                  <img className="featureImage" src={feature.url} alt="" />
                  <div className="feature">
                    {feature.description}
                  </div>
                </div>
              )
            }
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
