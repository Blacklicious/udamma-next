'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import NavbarMain from '@/components/navbar/main';
import BottomNavBar from '@/components/navbar/main_bottom';
import Image from 'next/image';
import type { Product } from '../../../accounts/boutiques/products/productsList';

const ProductDetailPage = () => {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState('L');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const details = searchParams.get('details');
    if (details) {
      try {
        const parsed = JSON.parse(decodeURIComponent(details));
        setProduct(parsed);
        setSelectedImage(parsed.img1 ? `${API_URL}${parsed.img1}` : null);
        return;
      } catch {}
    }

    async function fetchProduct() {
      const res = await fetch(`${API_URL}/products/${id}/api/`);
      if (res.ok) {
        const data = await res.json();
        setProduct(data);
        setSelectedImage(data.img1 ? `${API_URL}${data.img1}` : null);
      }
    }

    if (id) fetchProduct();
  }, [id, API_URL, searchParams]);

  if (!product) return <div className="text-center p-6">Loading...</div>;

  const images = [
    product.img1,
    product.img2,
    product.img3,
    product.img4,
    product.img5,
    product.img6,
  ].filter((img): img is string => Boolean(img));

  return (
    <>
      <NavbarMain />
      <div className='flex flex-col lg:flex-row gap-4  p-3 pb-32 w-full '>
        <div className=" lg:w-[60%] xl:w-[45%] 2xl:w-[35%] flex flex-col lg:flex-row gap-1 bg-gray-100 p-1 rounded-3xl">
          <div className="relative w-full lg:w-[85%] h-[70vh] rounded-3xl  shadow-md ">
            {/* Main Image */}
            <Image
              src={selectedImage || '/img/landscape-placeholder.svg'}
              alt={product.name}
              fill
              className="object-cover rounded-3xl"
            />
            <button className="absolute top-4 right-4 bg-white/80 px-3 py-2 rounded-full shadow hover:bg-red-100 transition">
              ❤️
            </button>
          </div>
          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex flex-row lg:flex-col gap-3  overflow-auto scrollbar-hide w-[100%] lg:w-[15%]
             mt-2 lg:mt-0  lg:pr-1  lg:overflow-y-auto lg:overflow-x-hidden rounded-3xl">
              {images.map((img, index) => (
                <div
                  key={index}
                  className={`relative w-[80px] lg:w-[100%] h-[80px] flex-shrink-0 rounded-3xl overflow-hidden border cursor-pointer transition ${
                    selectedImage === `${API_URL}${img}`
                      ? 'border-2 border-black'
                      : 'hover:scale-105'
                  }`}
                  onClick={() => setSelectedImage(`${API_URL}${img}`)}
                >
                  <Image
                    src={`${API_URL}${img}`}
                    alt={`Thumb ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
      </div>
      <div className='w-[100%] lg:w-[40%] xl:w-[55%] 2xl:w-[65%] bg-gray-100 p-4 rounded-3xl shadow-md h-min'>
        {/* Product Info */}
        <div className="mt-6 space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
              <span>⭐ 4.8</span>
              <span>• 1.5k Reviews</span>
              <span>• 3.4k Sold</span>
            </div>
          </div>
        </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-gray-900">${product.price}</span>
            {product.price_discount && (
              <>
                <span className="line-through text-gray-400">${product.price_discount}</span>
                <span className="text-sm text-red-500 font-semibold">15% OFF</span>
              </>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 leading-relaxed">
            {product.description || 'No description available.'}
          </p>

          {/* Sizes */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Select Size</h4>
            <div className="flex gap-2 lg:gap-4 justify-start">
              {['S', 'M', 'L', 'XL', 'XXL', 'Custom'].map((size) => (
                <button
                  key={size}
                  className={`px-3 py-2 rounded-2xl border text-sm font-medium transition ${
                    selectedSize === size
                      ? 'bg-black text-white shadow'
                      : 'bg-white text-black border-gray-300 hover:border-black'
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity + Add to Cart */}
          <div className="flex items-center justify-between mt-8 gap-3 text-black">
            <div className="flex items-center border rounded-full overflow-hidden">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 text-lg font-bold hover:bg-gray-100"
              >
                -
              </button>
              <span className="px-5 py-2 text-sm">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 text-lg font-bold hover:bg-gray-100"
              >
                +
              </button>
            </div>
            <button className="flex-1 bg-black text-white rounded-full py-4 text-sm font-semibold shadow-lg hover:bg-gray-800 transition">
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
      <BottomNavBar />
    </>
  );
};

export default ProductDetailPage;
