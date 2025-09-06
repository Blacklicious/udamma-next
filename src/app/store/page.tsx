'use client';

import React, { useEffect, useState } from 'react';
import SearchBar from './search_bar';
import ProductPage from './products/page';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const StorePage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch(`${API_URL}/products/api/`),
          fetch(`${API_URL}/products/categories/api/`),
        ]);

        if (!productsRes.ok || !categoriesRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();

        setProducts(productsData);
        setFilteredProducts(productsData);
        setCategories(categoriesData.map((cat: any) => cat.name));
      } catch (err) {
        console.error(err);
        setError('Unable to load store data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="px-4 py-12">
      {/* Loading/Error */}
      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="animate-pulse space-y-4">
              <div className="w-full h-48 bg-gray-200 rounded-lg" />
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          ))}
        </div>
      )}
      {error && <p className="text-red-600 text-center py-10">{error}</p>}

      {/* Search + Products */}
      {!loading && !error && (
        <>
          <SearchBar
            products={products}
            categories={categories}
            onFilter={(filtered) => setFilteredProducts(filtered)}
          />
          <div className="mt-8">
            <ProductPage products={filteredProducts} categories={categories} />
          </div>
        </>
      )}
    </div>
  );
};

export default StorePage;
