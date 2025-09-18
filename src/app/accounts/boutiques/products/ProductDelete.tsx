'use client';
import React, { FormEvent, useState } from 'react';
import type { Product } from './productsList';

interface ProductDeleteFormProps {
  product: Product;
}

const ProductDeleteForm: React.FC<ProductDeleteFormProps> = ({ product }) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [showFormModal, setShowFormModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleDelete = async (e: FormEvent) => {
    e.preventDefault();
    if (!API_URL) {
      alert('API URL is not configured.');
      return;
    }

    setSubmitting(true);
    try {
      const token = sessionStorage.getItem('access_token');
      const response = await fetch(`${API_URL}/products/${product.id}/api/`, {
        method: 'DELETE',
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      });

      if (!response.ok) throw new Error('Failed to delete product');

      alert('✅ Product deleted successfully');
      setShowFormModal(false);
      window.location.href = '/accounts/boutiques/products/';
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('❌ An error occurred while deleting the product');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <button
        className="bg-gradient-to-r from-red-600 to-red-400 text-white py-1 rounded-lg
          hover:from-red-700 hover:to-red-500 w-full font-semibold text-sm shadow"
        onClick={() => setShowFormModal(true)}
      >
        Delete
      </button>

      {showFormModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Delete Product</h2>
            <form onSubmit={handleDelete}>
              <p>Are you sure you want to delete this product?</p>
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg mr-2"
                  onClick={() => setShowFormModal(false)}
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50"
                >
                  {submitting ? 'Deleting…' : 'Delete'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDeleteForm;
