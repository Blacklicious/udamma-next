'use client';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import type { Product, Category } from './productsList';

interface ProductFormValues {
  boutique: string;
  category: string;
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

const initialValues: ProductFormValues = {
  boutique: '2',
  category: '',
  parent_product: '',
  name: '',
  description: '',
  price: 0,
  price_discount: '',
  quantity: '',
  tags: '',
  notes: '',
  img1: null,
  img2: null,
  img3: null,
  img4: null,
  img5: null,
  img6: null,
};

const BoutiqueProductsForm: React.FC = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [productsCategories, setProductsCategories] = useState<Category[]>([]);
  const [values, setValues] = useState<ProductFormValues>(initialValues);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    setLoading(true);
    const headers = { 'Content-Type': 'application/json' };

    const fetchProducts = fetch(`${API_URL}/products/api/`, { headers }).then((res) => res.json());
    const fetchCategories = fetch(`${API_URL}/products/categories/api/`, { headers }).then((res) =>
      res.json()
    );

    Promise.all([fetchProducts, fetchCategories])
      .then(([productsData, categoriesData]) => {
        setProducts(productsData);
        setProductsCategories(categoriesData);
      })
      .catch(() => setError('⚠️ Failed to load products or categories'))
      .finally(() => setLoading(false));
  }, [API_URL]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    setValues((prev) => ({ ...prev, [name]: files?.[0] || null }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData();
    Object.entries(values).forEach(([key, val]) => {
      if (val !== null) {
        if (key === 'category') {
          formData.append('category_id', val);
        } else if (typeof val === 'number') {
          formData.append(key, val.toString());
        } else {
          formData.append(key, val);
        }
      }
    });

    try {
      const token = sessionStorage.getItem('access_token');
      const res = await fetch(`${API_URL}/products/api/`, {
        method: 'POST',
        headers: { Authorization: token ? `Bearer ${token}` : '' },
        body: formData,
      });

      if (!res.ok) throw new Error('Failed to save product');
      alert('✅ Product created!');
      setValues(initialValues);
      setShowForm(false);
    } catch (err) {
      console.error(err);
      alert('❌ Error creating product');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-6 text-center text-gray-500">Loading products...</div>;

  return (
    <div className="mt-4">
      <button
        onClick={() => setShowForm(!showForm)}
        className="w-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white font-semibold py-2 
					rounded-lg shadow-md hover:from-yellow-500 hover:via-yellow-600
					 hover:to-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition"
      >
        {showForm ? 'Hide Form' : '➕ Add Product'}
      </button>

      {error && <div className="text-red-500 mt-2">{error}</div>}

      {showForm && (
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="space-y-4 mt-4 max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-lg "
        >
          {/* Category */}
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            name="category"
            value={values.category}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg shadow-sm"
          >
            <option value="">Select Category</option>
            {productsCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          {/* Parent Product */}
          <label className="block text-sm font-medium text-gray-700">Parent Product</label>
          <select
            name="parent_product"
            value={values.parent_product}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg shadow-sm"
          >
            <option value="">Select Parent Product</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>

          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Product name"
            value={values.name}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded-lg shadow-sm"
          />

          {/* Description */}
          <textarea
            name="description"
            placeholder="Description"
            value={values.description}
            onChange={handleTextAreaChange}
            rows={5}
            className="w-full border px-3 py-2 rounded-lg shadow-sm"
          />

          {/* Price & Discount */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="price"
              placeholder="Price"
              step="0.01"
              value={values.price}
              onChange={handleChange}
              className="border px-3 py-2 rounded-lg shadow-sm"
            />
            <input
              type="number"
              name="price_discount"
              placeholder="Discount"
              step="0.01"
              value={values.price_discount}
              onChange={handleChange}
              className="border px-3 py-2 rounded-lg shadow-sm"
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Quantity</label>
            <div className="flex items-center border rounded-lg overflow-hidden">
              <button
                type="button"
                onClick={() =>
                  setValues((prev) => {
                    const current = parseInt(prev.quantity || '0', 10);
                    return { ...prev, quantity: String(Math.max(0, current - 1)) };
                  })
                }
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200"
              >
                –
              </button>
              <input
                type="text"
                name="quantity"
                value={values.quantity}
                readOnly
                className="w-full text-center px-2 py-2"
              />
              <button
                type="button"
                onClick={() =>
                  setValues((prev) => {
                    const current = parseInt(prev.quantity || '0', 10);
                    return { ...prev, quantity: String(current + 1) };
                  })
                }
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200"
              >
                +
              </button>
            </div>
          </div>

          {/* Images */}
          <label className="block text-sm font-medium text-gray-700">Upload Images</label>
          <div className="grid grid-cols-2 gap-3 border p-3 rounded-lg shadow-sm">
            {Array.from({ length: 6 }, (_, i) => (
              <input
                key={i}
                type="file"
                name={`img${i + 1}`}
                accept="image/*"
                onChange={handleFileChange}
                className="w-full border px-3 py-2 rounded-lg"
              />
            ))}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 transition disabled:opacity-50"
          >
            {submitting ? 'Saving…' : '💾 Save Product'}
          </button>
        </form>
      )}
    </div>
  );
};

export default BoutiqueProductsForm;
