import CategoeryCard from "../components/CategoeryCard"
import CategoryFilter from "../components/CategoryFilter"
import Products from "./Products"
const Home = () => {
  
    return (
        <div>
            <div className="banner-container">
                <img src="./images/banner.png" alt="" />
            </div>
            <div className="spacing">
           <CategoryFilter/>
            <h2 className="headding">Top Categorys</h2>
           {/* <CategoeryCard/> */}
           {/* <Products/> */}
           </div>
        </div>
    )
}

export default Home
