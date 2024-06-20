import React, { useState, useEffect } from 'react';
import "./CSS/categoryfilter.css"
function CategoryFilter() {
  const [visibleBlocks, setVisibleBlocks] = useState([]);

  useEffect(() => {
    setVisibleBlocks(['all']);
  }, []);

  const handleCategoryClick = (e) => {
    const type = e.target.dataset.catSource;
    if (type === 'all') {
      setVisibleBlocks(['all']);
    } else {
      setVisibleBlocks([type]);
    }
  };

  return (
    <div>
      <div className="categories-filter">
        <button className="btn-cat" data-cat-source="all" onClick={handleCategoryClick}>
          All
        </button>
        <button className="btn-cat" data-cat-source="cat-1" onClick={handleCategoryClick}>
          Category 1
        </button>
        <button className="btn-cat" data-cat-source="cat-2" onClick={handleCategoryClick}>
          Category 2
        </button>
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