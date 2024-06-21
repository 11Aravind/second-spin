import React, { useState, useEffect } from 'react';
import "./CSS/categoryfilter.css"
function CategoryFilter() {
  const [visibleBlocks, setVisibleBlocks] = useState("");

  useEffect(() => {
    setVisibleBlocks('all');
  }, []);

  const handleCategoryClick = (e) => {
    const type = e.target.dataset.catSource;
    console.log(type);
    if (type === 'all') {
      setVisibleBlocks('all');
    } else {
      setVisibleBlocks(type);
    }
  };
  const categorys = [
    {
        url: "	https://ic.carid.com/icons/wheels-and-rims_ic_5.jpg",
        category: "Custom Wheels"
    },
    {
        url: "	https://ic.carid.com/icons/headlights_ic_5.jpg",
        category: "Headlights"
    },
    {
        url: "	https://ic.carid.com/icons/tires_ic_5.jpg",
        category: "Tires"
    },
    {
        url: "https://ic.carid.com/icons/exhaust-systems_ic_5.jpg",
        category: "Car bulbs"
    },
   
]
const category2=[
  {
    url: "	https://ic.carid.com/icons/driveline-axles_ic_5.jpg",
    category: " Driveline & Axles"
},
{
    url: "	https://ic.carid.com/icons/charging-starting_ic_5.jpg",
    category: "Starting & Chargings"
},
{
    url: "	https://ic.carid.com/icons/performance-chips_ic_5.jpg",
    category: " Performance Chips"
},
{
  url: "https://ic.carid.com/icons/brakes_ic_5.jpg",
  category: "Brakes"
}
]
  return (
    <div className='filter-container'>
      <div className="categories-filter">
        <button className={visibleBlocks === "all" ? "btn-cat active-link" : "btn-cat"} data-cat-source="all" onClick={handleCategoryClick}>
          Top Categories
        </button>
        <button className={visibleBlocks === "cat-1" ? "btn-cat active-link" : "btn-cat"} data-cat-source="cat-1" onClick={handleCategoryClick}>
          Parts
        </button>
        <button className={visibleBlocks === "cat-2" ? "btn-cat active-link" : "btn-cat"} data-cat-source="cat-2" onClick={handleCategoryClick}>
          Wheels &  Tires      </button>
      </div>
      <div className="portfolio-block" id="cat-1" style={{ display: visibleBlocks.includes('all') || visibleBlocks.includes('cat-1') ? 'block' : 'none' }}>
        {/* <h2 className="category-title">
          Category 1
        </h2> */}
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-4 g-4 items" style={{  "marginTop": "40px" }}>
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
      </div>
      <div className="portfolio-block" id="cat-2" style={{ display: visibleBlocks.includes('all') || visibleBlocks.includes('cat-2') ? 'block' : 'none' }}>
        {/* <h2 className="category-title">
          Category 2
        </h2> */}
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-4 g-4 items" style={{ "marginTop": "40px" }}>
            {
                category2.map((category, index) => (
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
      </div>
    </div>
  );
}

export default CategoryFilter;