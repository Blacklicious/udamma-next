'use client';

import React, { useEffect, useState } from 'react';

interface User {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
}

interface MemberProfile {
  id: number;
  user: User;
}

interface BoutiqueProfile {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  price: string;
}

interface OrderItem {
  id: number;
  product: Product;
  quantity: number;
  price: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface Order {
  id: number;
  order_number: string;
  customer: MemberProfile;
  boutique: BoutiqueProfile;
  status: string;
  payment_status: string;
  total_amount: string;
  shipping_address: string;
  billing_address?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  items: OrderItem[];
}

const OrdersPage = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/orders/api/`, {
          headers: { Authorization: `Bearer ${sessionStorage.getItem('access_token')}` },
        });
        const data = await res.json();
        setOrders(data);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [API_URL]);

  const openOrderModal = (order: Order) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };

  const closeOrderModal = () => {
    setSelectedOrder(null);
    setModalOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Orders</h1>
      </div>
      {loading && <div>Loading...</div>}
      <table className="w-full bg-white rounded-lg shadow mb-8">
        <thead>
          <tr>
            <th className="p-2">Order #</th>
            <th className="p-2">Customer</th>
            <th className="p-2">Boutique</th>
            <th className="p-2">Status</th>
            <th className="p-2">Payment</th>
            <th className="p-2">Total</th>
            <th className="p-2">Created</th>
            <th className="p-2">Items</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr
              key={order.id}
              className="border-t cursor-pointer hover:bg-blue-50"
              onClick={() => openOrderModal(order)}
            >
              <td className="p-2">{order.order_number}</td>
              <td className="p-2">{order.customer?.user?.first_name} {order.customer?.user?.last_name}</td>
              <td className="p-2">{order.boutique?.name}</td>
              <td className="p-2">{order.status}</td>
              <td className="p-2">{order.payment_status}</td>
              <td className="p-2">{order.total_amount}</td>
              <td className="p-2">{new Date(order.created_at).toLocaleString()}</td>
              <td className="p-2">{order.items?.length || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for order details */}
      {modalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={closeOrderModal}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">Order #{selectedOrder.order_number} Details</h2>
            <div className="mb-2">
              <strong>Customer:</strong> {selectedOrder.customer?.user?.first_name} {selectedOrder.customer?.user?.last_name}
            </div>
            <div className="mb-2">
              <strong>Boutique:</strong> {selectedOrder.boutique?.name}
            </div>
            <div className="mb-2">
              <strong>Status:</strong> {selectedOrder.status}
            </div>
            <div className="mb-2">
              <strong>Payment Status:</strong> {selectedOrder.payment_status}
            </div>
            <div className="mb-2">
              <strong>Total:</strong> {selectedOrder.total_amount}
            </div>
            <div className="mb-2">
              <strong>Shipping Address:</strong> {selectedOrder.shipping_address}
            </div>
            <div className="mb-2">
              <strong>Billing Address:</strong> {selectedOrder.billing_address || '—'}
            </div>
            <div className="mb-2">
              <strong>Notes:</strong> {selectedOrder.notes || '—'}
            </div>
            <div className="mb-2">
              <strong>Created:</strong> {new Date(selectedOrder.created_at).toLocaleString()}
            </div>
            <div className="mb-4">
              <strong>Items:</strong>
              <ul className="mt-2 space-y-2">
                {selectedOrder.items?.map((item) => (
                  <li key={item.id} className="border p-2 rounded">
                    <div><strong>Product:</strong> {item.product?.name}</div>
                    <div><strong>Quantity:</strong> {item.quantity}</div>
                    <div><strong>Price:</strong> {item.price}</div>
                    <div><strong>Status:</strong> {item.status}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;