//this is for testing purpose
import "./css/product.css"
import {Link, useParams} from "react-router-dom"
import { useSelector } from "react-redux"
// import products from "./data.json"
const Product = () => {
    const products=useSelector(state=>state.products.productList);
    const {id}=useParams()
    const filteredProducts=products.filter(product=>product.subCategory_id==id)
  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-4 g-4" style={{"margin": "40px 33px 0px"}}>
        {filteredProducts.length!==0?filteredProducts.map((product, index) => (
        <div className="col-6 col-sm-6 col-md-4 col-lg-3" key={index}>
            <Link to={`/product/${product._id}`} className="card-link">
                <div className="card h-100">
                    <div className="img-container">
                        <img src={`http://localhost:5001/${product.image}`} className="card-img-top product-image" alt="..." />
                    </div>
                    <div className="card-body">
                        <div className="card-title name">{product.name}</div>
                        <div className="cart-footer">
                            <div className="singleRow">
                                <div className="newprice ">₹{product.newPrice}
                                <div className="oldPrice">₹{product.oldPrice}</div>
                                </div>
                                <div className="cart"><i className="bi bi-cart"></i></div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )): <div class="message-container">
            <h1>204 </h1>
            <small>Notice - The subcategory and its product was currently not added</small>
        </div>
        }
</div>
    
  )
}

export default Product
