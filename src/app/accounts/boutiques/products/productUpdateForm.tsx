import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react'
import Image from 'next/image'
import type { Product, Category } from './productsList'

interface ProductUpdateFormProps {
  product: Product;
}

const ProductUpdateForm: React.FC<ProductUpdateFormProps> = ({ product }) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [loading, setLoading] = useState(true);
  const [showFormModal, setShowFormModal] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [productsCategories, setProductsCategories] = useState<Category[]>([]);
  const [values, setValues] = useState<Product>(product);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previews, setPreviews] = useState<Record<string, string>>({});

  useEffect(() => {
    const token = sessionStorage.getItem('access_token');
    setLoading(true);
    const headers = {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    };

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
    if (name === 'category') {
      const selectedCategory = productsCategories.find((cat) => cat.id.toString() === value);
      if (selectedCategory) {
        setValues((prev) => ({ ...prev, category: selectedCategory }));
      }
    } else {
      setValues((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      setValues((prev) => ({ ...prev, [name]: file }));
      setPreviews((prev) => ({ ...prev, [name]: URL.createObjectURL(file) }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData();
    Object.entries(values).forEach(([key, val]) => {
      if (val !== null && val !== '') {
        if (key === 'category') {
          formData.append('category_id', (val as Category).id.toString());
        } else if (key.startsWith('img') && typeof val === 'string') {
          return;
        } else {
          formData.append(key, val instanceof File ? val : String(val));
        }
      }
    });

    try {
      const token = sessionStorage.getItem('access_token');
      const res = await fetch(`${API_URL}/products/api/`, {
        method: 'PUT',
        headers: { Authorization: token ? `Bearer ${token}` : '' },
        body: formData,
      });

      if (!res.ok) throw new Error('Failed to save product');
      alert('✅ Product updated!');
      setShowFormModal(false);
    } catch {
      alert('❌ Error updating product');
    } finally {
      setSubmitting(false);
      window.location.reload();
    }
  };

  if (loading) return <div className="p-6 text-center text-gray-500">Loading products...</div>;

  return (
    <div className="w-full ">
      <div className="flex flex-col justify-between items-center">
        <button
          onClick={() => setShowFormModal(!showFormModal)}
          className="bg-gradient-to-r from-blue-400 to-blue-600 text-white py-1 rounded-lg
						hover:from-blue-500 hover:to-blue-700 w-full font-semibold text-sm shadow"
					>
          {showFormModal ? 'Hide Form' : 'Update'}
        </button>
      </div>

      {error && <div className="text-red-500 mt-2">{error}</div>}

      {showFormModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50  backdrop-blur-[2px]"
            onClick={() => setShowFormModal(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full h-[90vh] max-w-2xl mx-4 overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">✏️ Update Product</h2>
              <button
                onClick={() => setShowFormModal(false)}
                className="text-gray-600 hover:text-gray-900 text-2xl leading-none"
              >
                &times;
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
                {/* Category */}
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  name="category"
                  value={values.category?.id || ''}
                  onChange={handleChange}
                  className="w-full shadow-sm px-3 py-2 rounded border"
                >
                  <option value="">Select Category</option>
                  {productsCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>

                {/* Parent product */}
                <label className="block text-sm font-medium text-gray-700">Parent Product</label>
                <select
                  name="parent_product"
                  value={values.parent_product || ''}
                  onChange={handleChange}
                  className="w-full shadow-sm px-3 py-2 rounded border"
                >
                  <option value="">Select Parent Product</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>

                {/* Name */}
                <label className="block text-sm font-medium text-gray-700">Product Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Product name"
                  value={values.name}
                  onChange={handleChange}
                  required
                  className="w-full border px-3 py-2 rounded shadow-sm"
                />

                {/* Description */}
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  placeholder="Description"
                  value={values.description}
                  onChange={handleTextAreaChange}
                  rows={5}
                  className="w-full border px-3 py-2 rounded shadow-sm"
                />

                {/* Price fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                      type="number"
                      name="price"
                      placeholder="Price"
                      step="0.01"
                      value={values.price}
                      onChange={handleChange}
                      className="w-full border px-3 py-2 rounded shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Discount</label>
                    <input
                      type="number"
                      name="price_discount"
                      placeholder="Discount"
                      step="0.01"
                      value={values.price_discount}
                      onChange={handleChange}
                      className="w-full border px-3 py-2 rounded shadow-sm"
                    />
                  </div>
                </div>

                {/* Quantity */}
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
                    id="quantity"
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

                {/* Images with previews */}
                <label className="block text-sm font-medium text-gray-700">Images</label>
                <div className="grid grid-cols-2 gap-4">
                  {Array.from({ length: 6 }, (_, i) => {
                    const key = `img${i + 1}` as keyof Product;
                    const val = values[key];
                    const existing = typeof val === 'string' ? val : null;
                    const preview = previews[key as string];

                    return (
                      <div key={key}>
                        {(preview || existing) && (
                          <div className="relative w-full h-32">
                            <Image
                              src={preview || `${API_URL}${existing}`}
                              alt={`Preview ${key}`}
                              fill
                              className="object-cover rounded"
                            />
                          </div>
                        )}
                        <input
                          type="file"
                          name={key}
                          accept="image/*"
                          onChange={handleFileChange}
                          className="w-full text-sm border px-2 py-1 rounded"
                        />
                      </div>
                    );
                  })}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full mt-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:from-yellow-500 hover:via-yellow-600 hover:to-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Saving…' : '💾 Save Product'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductUpdateForm;
