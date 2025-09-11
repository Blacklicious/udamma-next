import React from 'react';
import { Quote } from './page';

const QuotesTable = ({ quotes, onQuoteClick }: { quotes: Quote[], onQuoteClick: (q: Quote) => void }) => (
  <table className="w-full bg-white rounded-lg shadow mb-8">
    <thead>
      <tr>
        <th className="p-2">ID</th>
        <th className="p-2">Customer</th>
        <th className="p-2">Boutique</th>
        <th className="p-2">Status</th>
        <th className="p-2">Created</th>
        <th className="p-2">Items</th>
      </tr>
    </thead>
    <tbody>
      {quotes.map((quote) => (
        <tr
          key={quote.id}
          className="border-t cursor-pointer hover:bg-blue-50 text-center"
          onClick={() => onQuoteClick(quote)}
        >
          <td className="p-2">{quote.id}</td>
          <td className="p-2">{quote.customer}</td>
          <td className="p-2">{quote.boutique}</td>
          <td className="p-2">{quote.status}</td>
          <td className="p-2">{new Date(quote.created_at).toLocaleString()}</td>
          <td className="p-2">{quote.items?.length || 0}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default QuotesTable;