'use client';
import React, { useState, useEffect } from 'react';
import { FiFilter } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import type { Product, Category } from '../../app/accounts/boutiques/products/productsList';

interface SearchBarProps {
  products: Product[];
  categories: Category[];
}

const SearchBar: React.FC<SearchBarProps> = ({ products, categories }) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

	useEffect(() => {
		const filtered = products.filter((product) => {
      const matchCategory = selectedCategory ? product.category.id === selectedCategory.id : true;
			const matchQuery = product.name.toLowerCase().includes(query.toLowerCase());
      
			return matchCategory && matchQuery;
		});
    setFilteredProducts(filtered);
  }, [query, selectedCategory, products]);

  const onFilter = (filtered: Product[]) => {
    setFilteredProducts(filtered);
  };

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
        {/* all */}
        <div
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-colors duration-200 whitespace-nowrap ${
            selectedCategory === null ? 'bg-yellow-700 text-white' : 'bg-[#C9A44C] text-white hover:bg-yellow-600'
          }`}
        >
          All
        </div>
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => setSelectedCategory(category === selectedCategory ? null : category)}
            className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-colors duration-200 whitespace-nowrap
              ${category === selectedCategory
                ? 'bg-yellow-700 text-white'
                : 'bg-[#C9A44C] text-white hover:bg-yellow-600'}
            `}
          >
            {category.name}
          </div>
        ))}
      </div>

      {/* Search Results */}
      <div className="w-full mt-6">
        {products.length === 0 ? (
          <p className="text-gray-500">No products found.</p>
        ) : (
          <div className="w-[100%] grid grid-cols-2 xs:grid-cols-1 md:grid-cols-4 lg:grid-cols-5 
            xl:grid-cols-6 2xl:grid-cols-7 gap-2">
            {filteredProducts.map((product) => (
              <div key={product.id} className="h-full w-full px-2 bg-[#F9F6F1] rounded-3xl pb-2">
                <div className="grid gap-4 ">
                    <Link
                      key={product.id}
                      href={`/store/products/${product.id}`}
                      className="relative group bg-white shadow-lg rounded-xl p-0.5 hover:shadow-xl transition-all duration-200"
                      prefetch={false}
                    >
                      {/* ✅ Aspect Ratio Wrapper 5:7 */}
                      <div className="relative w-full aspect-[5/7] rounded-xl">
                        <Image
                          src={
                            product.img2
                              ? `${API_URL}${product.img2}`
                              : '/img/landscape-placeholder.svg'
                          }
                          alt={product.name}
                          fill
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                          className="object-cover rounded-xl transition-transform duration-200 group-hover:scale-105 group-hover:rotate-2"
                        />
                      </div>

                      {/* ✅ Info Overlay */}
                      <div className="absolute bottom-0 left-0 w-full p-1">
                        <div className="flex flex-col items-start bg-white/40 backdrop-blur-[2px] px-2 py-1.5 rounded-xl shadow-sm">
                          {product.category && (
                            <span className="text-xs font-semibold text-white bg-blue-600/80 px-1 py-0.5 rounded mb-1">
                              {product.category.name}
                            </span>
                          )}
                          <div className="text-base font-semibold text-gray-900">{product.name}</div>
                          <div className="text-xs text-gray-500">
                            <span className="flex items-center">
                              {product.rating ?? 4.8}
                              <FaStar className="w-4 h-4 text-yellow-400 ml-1" />
                              <span className="ml-1">({product.reviews ?? 120})</span>
                            </span>
                          </div>
                          <div className="text-sm text-gray-800 font-medium">${product.price}</div>
                          <span
                            className={`hidden px-2 py-1 rounded text-xs font-semibold mt-1 ${
                              product.status === 'active'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-gray-200 text-gray-600'
                            }`}
                          >
                            {product.status}
                          </span>
                        </div>
                      </div>
                    </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
