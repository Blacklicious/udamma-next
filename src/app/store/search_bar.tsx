'use client';
import React, { useState, useEffect } from 'react';
import { FiFilter } from 'react-icons/fi';

interface SearchBarProps {
  products: any[];
  categories: string[];
  onFilter: (filtered: any[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ products, categories, onFilter }) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

	useEffect(() => {
		const filtered = products.filter((product) => {
			const matchCategory = selectedCategory ? product.category === selectedCategory : true;
			const matchQuery = product.name.toLowerCase().includes(query.toLowerCase());
			return matchCategory && matchQuery;
		});
	
		onFilter(filtered);
	}, [query, selectedCategory, products]);

  return (
    <div className="flex flex-col items-center justify-center w-full pt-4 bg-[#F9F6F1] rounded-3xl">
      {/* Search bar and filter icon */}
      <div className="flex justify-around items-center w-full gap-4 px-2">
        <div className="flex items-center gap-2 w-[80%] my-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="bg-white rounded-full p-3 shadow-xl shadow-gray-300 hover:shadow-2xl hover:shadow-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300 w-full"
          />
        </div>
        <div
          className="flex items-center gap-2 w-[20%] rounded-full p-3 cursor-pointer bg-[#C9A44C] text-white hover:bg-yellow-600 transition-colors border-yellow-100"
          onClick={() => {
            setQuery('');
            setSelectedCategory(null);
            onFilter(products);
          }}
        >
          <span className="w-full flex items-center justify-center">
            <FiFilter size={24} />
          </span>
        </div>
      </div>

      {/* Categories Header */}
      <div className="flex items-center justify-start gap-2 w-full mt-6 mb-3 px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-wide">
          Categories
        </h2>
        <span className="flex-grow h-[2px] bg-gray-300"></span>
      </div>

      {/* Category Filters */}
      <div className="flex gap-3 mt-2 w-full overflow-x-auto px-4 rounded-full bg-[#F9F6F1] py-1">
        {categories.map((label) => (
          <div
            key={label}
            onClick={() => setSelectedCategory(label === selectedCategory ? null : label)}
            className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-colors duration-200 whitespace-nowrap
              ${label === selectedCategory
                ? 'bg-yellow-700 text-white'
                : 'bg-[#C9A44C] text-white hover:bg-yellow-600'}
            `}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
