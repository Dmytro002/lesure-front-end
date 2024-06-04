import React from 'react';
import './CategoriesFilter.css';
const CategoriesFilter = ({ categories, selectedCategory, onSelectCategory }) => {
    return (
        <div className="categories-filter">
            {categories.map((category, index) => (
                <button
                    key={index}
                    className={category === selectedCategory ? 'selected' : ''}
                    onClick={() => onSelectCategory(category)}
                >
                    {category}
                </button>
            ))}
        </div>
    );
};

export default CategoriesFilter;
