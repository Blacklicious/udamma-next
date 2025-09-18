'use client';

import React from 'react';
import Image from 'next/image';
import ProductUpdateForm from './productUpdateForm';
import ProductDeleteForm from './ProductDelete';

export interface Category {
  id: number;
  name: string;
}

export interface Product {
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
    img1: string | null;
    img2: string | null;
    img3: string | null;
    img4: string | null;
    img5: string | null;
    img6: string | null;
    status: string;
    reviews: number | null;
    rating: number | null;
    created_at: string;
    updated_at: string;
  }

const ProductsManagerList = () => {
  const [loading, setLoading] = React.useState(true);
  const [, setError] = React.useState<string | null>(null);
  const [products, setProducts] = React.useState<Product[]>([]);
  const [, setCategories] = React.useState<string[]>([]);
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
          //const token = sessionStorage.getItem('access_token');
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
  
          const productsData: Product[] = await productsRes.json();
          const categoriesData: Category[] = (await categoriesRes.json()) as Category[];

          setProducts(productsData);
          setCategories(categoriesData.map(cat => cat.name));
        } catch (err) {
          console.error(err);
          setError('Unable to load store data. Please try again.');
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [API_URL]);
    

  if (loading) {
    return <div className="p-6 text-center text-gray-500 animate-pulse">Loading products...</div>;
  }

  if (products.length === 0) {
    return <div className="p-6 text-center text-gray-400">No products found.</div>;
  }
  return (
    <div className="p-1 text-black rounded-2xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-20 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 3xl:grid-cols-10 4xl:grid-cols-12">
        {products.map((product) => (
          <div
            key={product.id}
            className="h-max group cursor-pointer bg-white border-2 border-gray-200 rounded-xl shadow-md hover:shadow-xl  hover:ring-2 hover:ring-yellow-500
            transition-all duration-200 p-1 w-full max-w-md"
          >
            {/* Image */}
            {product.img2 && (
              <Image
                src={`${API_URL}${product.img2}`}
                alt={product.name}
                className="w-full object-cover rounded-md mb-1 "
                width={400}
                height={400}
                priority
              />
            )}
            {/* Title */}
            <h3 className="text-lg font-bold text-gray-900 pl-1">{product.name}</h3>
  
            {/* Details Row */}
            <div className="flex justify-between items-center text-sm text-gray-500 mb-1 pl-2">
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
  
            {/* Price + Quantity */}
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>💲 {product.price}</span>
              <span>Stock: {product.quantity}</span>
            </div>
  
            {/* CTA: show Update / Delete on hover */}
            <div className=" flex justify-between p-1 w-full bg-gray-100 rounded-xl mt-2 gap-1">
              <div className="w-[50%]">
                < ProductUpdateForm product={product} />
              </div>
              <div
                onClick={() => console.log('Delete', product.id)}
                className="flex-1 text-sm font-medium text-black
                  w-[50%] rounded-lg "
              >
                < ProductDeleteForm product={product} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default ProductsManagerList;
