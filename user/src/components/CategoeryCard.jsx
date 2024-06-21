const CategoryCard = () => {
    const categorys = [
        {
            url: "./images/33000.png",
            category: "Car accessories"
        },
        {
            url: "./images/30000.png",
            category: "Auto detailing & car care"
        },
        {
            url: "./images/36000.png",
            category: "Tools & equipment"
        },
        {
            url: "./images/40000.png",
            category: "Car bulbs"
        },
        {
            url: "./images/12094.png",
            category: "Engine oil"
        },
        {
            url: "./images/10132.png",
            category: "Brake discs"
        },
        {
            url: "./images/10130.png",
            category: "Brake Discs"
        },
        {
            url: "./images/23208.png",
            category: "Tyres"
        },
    ]
    return (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-4 g-4" style={{ "margin": "0px 113px", "marginTop": "40px" }}>
            {
                categorys.map((category, index) => (
                    <div className="col-6 col-sm-6 col-md-4 col-lg-3" key={index}>
                        {/* <Link to={`/productdetails/${product._id}`} className="card-link"> */}
                        <div className="card h-100 category">
                            <div className="img-container category-img">
                                <img src={category.url} className="card-img-top product-image" alt="..." />
                            </div>
                            <div className="card-body">
                                <div className="category-name">{category.category}</div>
                            </div>
                        </div>
                        {/* </Link> */}
                    </div>
                ))
            }

        </div>
    )
}

export default CategoryCard
