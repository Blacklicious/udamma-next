'use client';

import React from 'react';
import ProductUpdateForm from './productUpdateForm';

const ProductsManagerList = () => {
  
  interface Category {
    id: number;
    name: string;
  }

  interface Product {
    id: number;
    boutique: string;
    category: Category; // ✅ fixed — now a single object (dont use array[])
    parent_product: string;
    name: string;
    description: string;
    price: number;
    price_discount: string;
    quantity: string;
    tags: string;
    notes: string;
    img1: File | null;
    img2: File | null;
    img3: File | null;
    img4: File | null;
    img5: File | null;
    img6: File | null;
  }

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [products, setProducts] = React.useState<Product[]>([]);
  const [categories, setCategories] = React.useState<string[]>([]);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
    
    // 🔁 Fetch products and categories on mount
    React.useEffect(() => {
      const token = sessionStorage.getItem('access_token');
      if (!token) {
        // If no token, redirect to login page
        sessionStorage.setItem("redirection", window.location.href);
        window.location.href = '/accounts/auths';
        return;
      }
      const fetchData = async () => {
        try {
          const token = sessionStorage.getItem('access_token');
  
          const [productsRes, categoriesRes] = await Promise.all([
            fetch(`${API_URL}/products/api/`, {
              headers: {
              },
            }),
            fetch(`${API_URL}/products/categories/api/`, {
              headers: {
              },
            }),
          ]);
  
          if (!productsRes.ok || !categoriesRes.ok) {
            throw new Error('Failed to fetch data');
          }
  
          const productsData = await productsRes.json();
          const categoriesData = await categoriesRes.json();
  
          setProducts(productsData);
          setProducts(productsData);
          setCategories(categoriesData.map((cat: any) => cat.name)); // assuming each category has a `name`
        } catch (err) {
          console.error(err);
          setError('Unable to load store data. Please try again.');
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
    

  if (loading) {
    return <div className="p-6 text-center text-gray-500 animate-pulse">Loading products...</div>;
  }

  if (products.length === 0) {
    return <div className="p-6 text-center text-gray-400">No products found.</div>;
  }
  return (
    <div className="p-1 text-black">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-20 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 3xl:grid-cols-10 4xl:grid-cols-12">
        {products.map((product) => (
          <div
            key={product.id}
            className="h-max group cursor-pointer bg-white rounded-xl shadow-md hover:shadow-xl  hover:ring-2 hover:ring-yellow-500
            transition-all duration-200 p-1 w-full max-w-md"
          >
           
  
            {/* Title */}
            <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
  
            {/* Details Row */}
            <div className="flex justify-between items-center text-sm text-gray-500 mb-1">
              <div className="hidden  items-center gap-1">
                <span className="material-icons text-base">location_on</span>
                <span>{product.boutique}</span>
              </div>
              {product.category ? (
                <span>{product.category.name}</span>
              ) : (
                <span>Uncategorized</span>
              )}
                </div>
  
            {/* Image */}
            <img
              src={`${API_URL}${product.img2}`}
              alt={product.name}
              className="w-full object-cover rounded-md my-3"
            />
  
            {/* Price + Quantity */}
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>💲 {product.price}</span>
              <span>Stock: {product.quantity}</span>
            </div>
  
            {/* CTA: show Update / Delete on hover */}
            <div className=" flex justify-between p-1 w-full bg-gray-100 rounded-xl mt-2 gap-1">
              < ProductUpdateForm product={product} />
              <button
                onClick={() => console.log('Delete', product.id)}
                className="flex-1 text-sm font-medium text-black bg-red-300 hover:bg-red-700
                  w-1/2 rounded-lg py-2 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default ProductsManagerList;
