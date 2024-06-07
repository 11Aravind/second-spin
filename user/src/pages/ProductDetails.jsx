import "./css/productdetails.css"
import { Link, useParams } from "react-router-dom";
const ProductDetails = () => {
  const id=useParams()
  console.log(id);
  const product=[
    {
      "_id": "66026c09744acd3776cb5b59",
      "name": "FOFOS Dog Toys - Woodplay Bone",
      "image": "https://www.buyautoparts.com/data/sm_images/14-sd1733new.-map1.jpg",
      "description": "Fofos woodplay bone is a dog chew toy that is great for teeth and gums. This toy comes as a set of two toys that can help massage your dog's gums and maintain good oral hygiene. This toy contains real wood and acts as a perfect furniture substitute. bone toys such as this allow your dog to chew, bite, fetch and play while getting the right amount of exercise and also make playtime interactive. This toy is ideal for small-medium dogs (5-20kg) of various breeds such as dachshund, pom, spitz, etc above 1 year of age. This toy is strong but not indestructible and is best suited for pet dogs that have moderate chewing and playing styles. Not recommended for aggressive chewers.",
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
          {product && <img src={ product[0].image} alt="" />}
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
          <div className="sub-headding">
            Description
          </div>
          <div className="aboutProductDescription">
            {product && product[0].description}
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
