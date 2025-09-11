import React from 'react';
import ProductListClient from './ProductListClient';

// Function to fetch data on the server
async function getProducts() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  try {
    const res = await fetch(`${API_URL}/api/products/`);
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function Page() {
  const products = await getProducts();
  return <ProductListClient products={products} />;
}