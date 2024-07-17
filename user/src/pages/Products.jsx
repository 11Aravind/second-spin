import "./css/product.css"
import {Link} from "react-router-dom"
import { useSelector } from "react-redux"

// import products from "./data.json"

const Products = () => {
    const products=useSelector(state=>state.products.productList);
  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-4 g-4" style={{"margin": "40px 33px 0px"}}>
    {products.map((product, index) => (
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
    ))}
</div>
  )
}

export default Products
