import React from 'react';

const QuoteDetailsModal = ({
  open,
  quote,
  onClose,
}: {
  open: boolean;
  quote: any | null;
  onClose: () => void;
}) => {
  if (!open || !quote) return null;
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">Quote #{quote.id}</h2>
        <div className="mb-2">
          <strong>Customer:</strong> {quote.customer}
        </div>
        <div className="mb-2">
          <strong>Boutique:</strong> {quote.boutique}
        </div>
        <div className="mb-2">
          <strong>Status:</strong> {quote.status}
        </div>
        <div className="mb-2">
          <strong>Created:</strong> {new Date(quote.created_at).toLocaleString()}
        </div>
        <div className="mb-4">
          <strong>Items:</strong>
          <ul className="mt-2 space-y-2">
            {quote.items?.map((item: any) => (
              <li key={item.id} className="border p-2 rounded flex justify-around hover:border-amber-300 hover:bg-gray-100">
                <div><strong>{item.product}</strong> </div>
                <div><strong>Quantity:</strong> {item.quantity}</div>
                <div><strong>Price:</strong> {item.price}</div>
                <div><strong>Status:</strong> {item.status}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default QuoteDetailsModal;