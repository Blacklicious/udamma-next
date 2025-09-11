'use client';

import React, { useState } from 'react';
import type { Member } from '../../members/page';
import type { Boutique } from '../page';
import type { Product } from '../products/productsList';

const CreateQuoteModal = ({
  open,
  onClose,
  members,
  boutiques,
  products,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  members: Member[];
  boutiques: Boutique[];
  products: Product[];
  onSuccess: () => void;
}) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [form, setForm] = useState({
    customer: '',
    boutique: '',
    items: [{ product: '', quantity: 1, price: '' }],
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  const handleFormChange = (field: keyof typeof form, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleItemChange = (
    idx: number,
    field: keyof typeof form.items[number],
    value: string | number
  ) => {
    setForm((prev) => {
      const items = [...prev.items];
      items[idx] = { ...items[idx], [field]: value };
      return { ...prev, items };
    });
  };

  const addItem = () => {
    setForm((prev) => ({
      ...prev,
      items: [...prev.items, { product: '', quantity: 1, price: '' }],
    }));
  };

  const removeItem = (idx: number) => {
    setForm((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== idx),
    }));
  };

  const handleCreateQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);
    try {
      const res = await fetch(`${API_URL}/quotes/api/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
        },
        body: JSON.stringify({
          customer: form.customer,
          boutique: form.boutique,
          items: form.items.map(item => ({
            product: item.product,
            quantity: item.quantity,
            price: item.price,
          })),
        }),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to create quote');
      }
      setFormSuccess('Quote created successfully!');
      onClose();
      onSuccess();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setFormError(err.message);
      } else {
        setFormError('An unexpected error occurred');
      }
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">Create Quote</h2>
        <form onSubmit={handleCreateQuote}>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Customer</label>
            <select
              className="w-full border rounded p-2"
              value={form.customer}
              onChange={(e) => handleFormChange('customer', e.target.value)}
              required
            >
              <option value="">Select a customer</option>
              {members.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.user.first_name} {member.user.last_name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Boutique</label>
            <select
              className="w-full border rounded p-2"
              value={form.boutique}
              onChange={(e) => handleFormChange('boutique', e.target.value)}
              required
            >
              <option value="">Select a boutique</option>
              {boutiques.map((b) => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Quote Items</label>
            {form.items.map((item, idx) => (
              <div key={idx} className="flex gap-2 mb-2 items-center">
                <select
                  className="border rounded p-2"
                  value={item.product}
                  onChange={(e) => handleItemChange(idx, 'product', e.target.value)}
                  required
                >
                  <option value="">Select product</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  className="border rounded p-2 w-20"
                  value={item.quantity}
                  min={1}
                  onChange={(e) => handleItemChange(idx, 'quantity', Number(e.target.value))}
                  required
                />
                <input
                  type="text"
                  className="border rounded p-2 w-24"
                  value={item.price}
                  placeholder="Price"
                  onChange={(e) => handleItemChange(idx, 'price', e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="text-red-500 font-bold px-2"
                  onClick={() => removeItem(idx)}
                  disabled={form.items.length === 1}
                >
                  &times;
                </button>
              </div>
            ))}
            <button
              type="button"
              className="text-blue-600 font-bold mt-2"
              onClick={addItem}
            >
              + Add Item
            </button>
          </div>
          <div className="text-right">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Create Quote
            </button>
          </div>
        </form>
        {formError && <div className="text-red-600 mt-2">{formError}</div>}
        {formSuccess && <div className="text-green-600 mt-2">{formSuccess}</div>}
      </div>
    </div>
  );
};

export default CreateQuoteModal;