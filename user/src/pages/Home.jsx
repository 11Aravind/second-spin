import CategoeryCard from "../components/CategoeryCard"
import CategoryFilter from "../components/CategoryFilter"
import Products from "./Products"
const Home = () => {
  
    return (
        <div>
            <div className="banner-container">
                <img src="./images/banner.png" alt="" />
            </div>
           <CategoeryCard/>
           <Products/>
           <CategoryFilter/>
        </div>
    )
}

export default Home
