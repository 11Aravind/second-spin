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

  return (
    <div className='filter-container'>
      <div className="categories-filter">
        <button className={visibleBlocks==="all"?"btn-cat active-link":"btn-cat"} data-cat-source="all" onClick={handleCategoryClick}>
        Top Categories
        </button>
        <button className={visibleBlocks==="cat-1"?"btn-cat active-link":"btn-cat"} data-cat-source="cat-1" onClick={handleCategoryClick}>
Parts       
 </button>
        <button className={visibleBlocks==="cat-2"?"btn-cat active-link":"btn-cat"} data-cat-source="cat-2" onClick={handleCategoryClick}>
Wheels &  Tires      </button>
      </div>
      <div className="portfolio-block" id="cat-1" style={{ display: visibleBlocks.includes('all') || visibleBlocks.includes('cat-1')? 'block' : 'none' }}>
        <h2 className="category-title">
          Category 1
        </h2>
        <div className="items">
          <div className="item">
            <img src="https://picsum.photos/id/237/400/300" />
          </div>
          <div className="item">
            <img src="https://picsum.photos/id/238/400/300" />
          </div>
        </div>
      </div>
      <div className="portfolio-block" id="cat-2" style={{ display: visibleBlocks.includes('all') || visibleBlocks.includes('cat-2')? 'block' : 'none' }}>
        <h2 className="category-title">
          Category 2
        </h2>
        <div className="items">
          <div className="item">
            <img src="https://picsum.photos/id/239/400/300" />
          </div>
          <div className="item">
            <img src="https://picsum.photos/id/240/400/300" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryFilter;