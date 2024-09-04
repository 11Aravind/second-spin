import CategoeryCard from "../components/CategoeryCard"
import CategoryFilter from "../components/CategoryFilter"
import Products from "./Products"
import {useSelector} from "react-redux"
const Home = () => {
    const products=useSelector(state=>state.products.productList);

    return (
        <div>
            <div className="banner-container">
                <img src="./images/banner.png" alt="" />
            </div>
            <div className="spacing">
                <h2 className="headding">Our Products</h2> 
           {/* <CategoryFilter/>
           {/* <CategoeryCard/> */}
           <Products/>
           </div>
        </div>
    )
}

export default Home
