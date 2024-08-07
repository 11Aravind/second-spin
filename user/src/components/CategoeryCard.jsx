import { Link } from "react-router-dom"
const CategoryCard = ({categorys}) => {
    // const categorys = [
    //     {
    //         url: "./images/33000.png",
    //         category: "Car accessories"
    //     },
    //     {
    //         url: "./images/30000.png",
    //         category: "Auto detailing & car care"
    //     },
    //     {
    //         url: "./images/36000.png",
    //         category: "Tools & equipment"
    //     },
    //     {
    //         url: "./images/40000.png",
    //         category: "Car bulbs"
    //     },
    //     {
    //         url: "./images/12094.png",
    //         category: "Engine oil"
    //     },
    //     {
    //         url: "./images/10132.png",
    //         category: "Brake discs"
    //     },
    //     {
    //         url: "./images/10130.png",
    //         category: "Brake Discs"
    //     },
    //     {
    //         url: "./images/23208.png",
    //         category: "Tyres"
    //     },
    // ]
    // const categorys=[]
    return (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-4 g-4" > 
            {
              categorys.length===0?"Category and product was currently not added":  categorys.map((category, index) => (
                    <div className="col-6 col-sm-6 col-md-4 col-lg-2" key={index}>
                        <Link to={`/subcategory/${category._id}`} className="card-link">
                        <div className="card h-100 category">
                            <div className="img-container category-img">
                                <img src={`http://localhost:5001/${category.image}`} className="card-img-top product-image" alt="..." />
                            </div>
                                <div className="category-name">{category.partsName}</div>
                            {/* <div className="card-body">
                            </div> */}
                        </div>
                        </Link>
                    </div>
                ))
            }

        </div>
    )
}

export default CategoryCard
