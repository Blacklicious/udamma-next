'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import NavbarMain from '@/components/navbar/main';
import BottomNavBar from '@/components/navbar/main_bottom';

const ProductDetailPage = () => {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const [product, setProduct] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState('L');
  const [quantity, setQuantity] = useState(1);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const details = searchParams.get('details');
    if (details) {
      try {
        setProduct(JSON.parse(decodeURIComponent(details)));
        return;
      } catch {}
    }

    async function fetchProduct() {
      const res = await fetch(`${API_URL}/products/${id}/`);
      if (res.ok) {
        const data = await res.json();
        setProduct(data);
      }
    }

    if (id) fetchProduct();
  }, [id, API_URL, searchParams]);

  if (!product) return <div className="text-center p-6">Loading...</div>;

  const images = [product.img1, product.img2, product.img3, product.img4, product.img5, product.img6].filter(Boolean);

  return (
    <>
      <NavbarMain />
      <BottomNavBar />
      <div className="max-w-md mx-auto px-4 pt-6 pb-28">
        {/* Main Image */}
        <div className="relative rounded-2xl overflow-hidden">
          <img
            src={product.img1 ? `${API_URL}${product.img1}` : 'https://via.placeholder.com/400x300'}
            alt={product.name}
            className="w-full object-cover aspect-[4/5] rounded-xl"
          />
          <button className="absolute top-4 right-4 bg-white/80 px-2 py-1 rounded-full shadow">
            ❤️
          </button>
        </div>

        {/* Thumbnails */}
        <div className="flex gap-2 mt-2 overflow-x-auto">
          {images.slice(1, 5).map((img: string, index: number) => (
            <img
              key={index}
              src={`${API_URL}${img}`}
              className="w-16 h-16 object-cover rounded-lg border"
              alt={`Thumb ${index + 2}`}
            />
          ))}
          {images.length > 5 && (
            <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-lg text-sm text-gray-600">
              +{images.length - 5}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="mt-4">
          <h1 className="text-xl font-bold">{product.name}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
            <span>⭐ 4.8</span>
            <span>• 1.5k Reviews</span>
            <span>• 3.4k Sold</span>
          </div>

          <div className="mt-2 flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900">${product.price}</span>
            {product.price_discount && (
              <>
                <span className="line-through text-gray-400">${product.price_discount}</span>
                <span className="text-sm text-red-500 font-semibold">15%</span>
              </>
            )}
          </div>

          <p className="text-sm text-gray-600 mt-2 leading-relaxed">
            {product.description || 'No description available.'}
          </p>

          {/* Sizes */}
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Select Size</h4>
            <div className="flex gap-2">
              {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                <button
                  key={size}
                  className={`w-10 h-10 rounded-full border text-sm font-medium ${
                    selectedSize === size
                      ? 'bg-black text-white'
                      : 'bg-white text-black border-gray-300'
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity + Add to Cart */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center border rounded-full overflow-hidden">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 text-lg font-bold"
              >
                -
              </button>
              <span className="px-4 py-1 text-sm">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1 text-lg font-bold"
              >
                +
              </button>
            </div>
            <button className="ml-4 flex-1 bg-black text-white rounded-full py-3 px-6 text-sm font-medium shadow-lg">
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;
