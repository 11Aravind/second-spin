import CategoeryCard from "../components/CategoeryCard"
import Products from "./Products"
const Home = () => {
  
    return (
        <div>
            <div className="banner-container">
                <img src="./images/banner.png" alt="" />
            </div>
           <CategoeryCard/>
           <Products/>
        </div>
    )
}

export default Home
