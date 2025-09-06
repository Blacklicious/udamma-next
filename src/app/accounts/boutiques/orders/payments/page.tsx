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

interface Order {
  id: number;
  order_number: string;
}

interface Payment {
  id: number;
  order: Order;
  customer: MemberProfile;
  boutique: BoutiqueProfile;
  amount: string;
  currency: string;
  payment_method: string;
  status: string;
  stripe_payment_intent_id?: string;
  stripe_charge_id?: string;
  stripe_receipt_url?: string;
  paid_at?: string;
  created_at: string;
  updated_at: string;
  notes?: string;
}

const PaymentsPage = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  useEffect(() => {
    const fetchPayments = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/orders/payments/api/`, {
          headers: { Authorization: `Bearer ${sessionStorage.getItem('access_token')}` },
        });
        const data = await res.json();
        setPayments(data);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, [API_URL]);

  const openPaymentModal = (payment: Payment) => {
    setSelectedPayment(payment);
    setModalOpen(true);
  };

  const closePaymentModal = () => {
    setSelectedPayment(null);
    setModalOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Payments</h1>
      </div>
      {loading && <div>Loading...</div>}
      <table className="w-full bg-white rounded-lg shadow mb-8">
        <thead>
          <tr>
            <th className="p-2">Order #</th>
            <th className="p-2">Customer</th>
            <th className="p-2">Boutique</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Currency</th>
            <th className="p-2">Method</th>
            <th className="p-2">Status</th>
            <th className="p-2">Paid At</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr
              key={payment.id}
              className="border-t cursor-pointer hover:bg-blue-50"
              onClick={() => openPaymentModal(payment)}
            >
              <td className="p-2">{payment.order?.order_number}</td>
              <td className="p-2">{payment.customer?.user?.first_name} {payment.customer?.user?.last_name}</td>
              <td className="p-2">{payment.boutique?.name}</td>
              <td className="p-2">{payment.amount}</td>
              <td className="p-2">{payment.currency}</td>
              <td className="p-2">{payment.payment_method}</td>
              <td className="p-2">{payment.status}</td>
              <td className="p-2">{payment.paid_at ? new Date(payment.paid_at).toLocaleString() : '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for payment details */}
      {modalOpen && selectedPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={closePaymentModal}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">Payment Details</h2>
            <div className="mb-2">
              <strong>Order #:</strong> {selectedPayment.order?.order_number}
            </div>
            <div className="mb-2">
              <strong>Customer:</strong> {selectedPayment.customer?.user?.first_name} {selectedPayment.customer?.user?.last_name}
            </div>
            <div className="mb-2">
              <strong>Boutique:</strong> {selectedPayment.boutique?.name}
            </div>
            <div className="mb-2">
              <strong>Amount:</strong> {selectedPayment.amount} {selectedPayment.currency}
            </div>
            <div className="mb-2">
              <strong>Payment Method:</strong> {selectedPayment.payment_method}
            </div>
            <div className="mb-2">
              <strong>Status:</strong> {selectedPayment.status}
            </div>
            <div className="mb-2">
              <strong>Stripe Payment Intent ID:</strong> {selectedPayment.stripe_payment_intent_id || '—'}
            </div>
            <div className="mb-2">
              <strong>Stripe Charge ID:</strong> {selectedPayment.stripe_charge_id || '—'}
            </div>
            <div className="mb-2">
              <strong>Stripe Receipt:</strong>{' '}
              {selectedPayment.stripe_receipt_url ? (
                <a href={selectedPayment.stripe_receipt_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  View Receipt
                </a>
              ) : '—'}
            </div>
            <div className="mb-2">
              <strong>Paid At:</strong> {selectedPayment.paid_at ? new Date(selectedPayment.paid_at).toLocaleString() : '—'}
            </div>
            <div className="mb-2">
              <strong>Created:</strong> {new Date(selectedPayment.created_at).toLocaleString()}
            </div>
            <div className="mb-2">
              <strong>Updated:</strong> {new Date(selectedPayment.updated_at).toLocaleString()}
            </div>
            <div className="mb-2">
              <strong>Notes:</strong> {selectedPayment.notes || '—'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentsPage;