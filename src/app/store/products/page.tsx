'use client';

import React, { useEffect, useState } from 'react';
import SearchBar from '@/components/store/SearchBar';
import type { Product, Category } from '../../accounts/boutiques/products/productsList';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          fetch(`${API_URL}/products/api/`),
          fetch(`${API_URL}/products/categories/api/`)
        ]);

        const productsData = await prodRes.json();
        const categoriesData = await catRes.json();

        setProducts(productsData);
        setCategories(categoriesData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="p-6 text-center">Loading...</p>;

  return (
    <div className="px-4">
      <SearchBar products={products} categories={categories} />
    </div>
  );
};

export default ProductPage;
