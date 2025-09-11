'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { FaStar } from 'react-icons/fa';
import Image from 'next/image';

interface Product {
  id: number;
  name: string;
  price: number;
  rating?: number;
  reviews?: number;
  status: string;
  img1?: string;
  img2?: string;
  category?: Category;
}

interface Category {
  id: number;
  name: string;
}

interface ProductListClientProps {
  products: Product[];
}

export default function ProductListClient({ products }: ProductListClientProps) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  const handleClick = (product: Product) => {
    const query = encodeURIComponent(JSON.stringify(product));
    router.push(`/store/products/${product.id}?details=${query}`);
  };

  const getImageUrl = (imgUrl: string | undefined): string => {
    if (!imgUrl) {
      return 'https://via.placeholder.com/300x240.png?text=No+Image';
    }
    if (imgUrl.startsWith('http://') || imgUrl.startsWith('https://')) {
      return imgUrl;
    }
    return `${API_URL}${imgUrl}`;
  };

  if (!products || products.length === 0) return <div>No products available.</div>;

  return (
    <div className="flex flex-col items-center justify-center w-full px-2 bg-[#F9F6F1] rounded-3xl pb-6">
      <div className="grid sm:grid-cols-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 3xl:grid-cols-10 4xl:grid-cols-12 gap-6 w-full px-2">
        {products.map((product) => (
          <div
            key={product.id}
            className="relative group bg-white shadow-lg rounded-xl p-0.5 w-full hover:shadow-xl transition-all duration-200 overflow-visible cursor-pointer"
            onClick={() => handleClick(product)}
          >
            <Image
              src={getImageUrl(product.img2)}
              alt={product.name}
              fill
              className="absolute object-cover border-white rounded-xl w-[120%] h-[100%] transition-transform duration-200 group-hover:scale-105 group-hover:rotate-3"
              unoptimized
            />
            <div className="absolute bottom-0 left-0 w-full p-2.5">
              <div className="flex flex-col items-start bg-white/40 backdrop-blur-[2px] px-4 py-1.5 rounded-xl shadow-sm">
                {product.category && (
                  <span className="text-xs font-semibold text-white bg-blue-600 px-2 py-1 rounded-full mb-2">
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
                <span className={`hidden px-2 py-1 rounded text-xs font-semibold mt-1 ${product.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
                  {product.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}