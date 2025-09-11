'use client';

import React, { useEffect, useState } from 'react';
import QuotesTable from './QuotesTable';
import QuoteDetailsModal from './QuoteDetailsModal';
import CreateQuoteModal from './CreateQuoteModal';
import type { Member } from '../../members/page';
import type { Boutique } from '../page';
import type { Product } from '../products/productsList';

export interface Quote  {
  id: number;
  customer: string;
  boutique: string;
  status: string;
  created_at: string;
  items: {
    id: number;
    product: string;
    quantity: number;
    price: string;
    status: string;
  }[];
}

const QuotesPage = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  // For create quote form
  const [members, setMembers] = useState<Member[]>([]);
  const [boutiques, setBoutiques] = useState<Boutique[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const [quotesRes, membersRes, boutiquesRes, productsRes] = await Promise.all([
          fetch(`${API_URL}/quotes/api/`, { headers: { Authorization: `Bearer ${sessionStorage.getItem('access_token')}` } }),
          fetch(`${API_URL}/accounts/boutiques/2/members/api/`, { headers: { Authorization: `Bearer ${sessionStorage.getItem('access_token')}` } }),
          fetch(`${API_URL}/accounts/boutiques/api/`, { headers: { Authorization: `Bearer ${sessionStorage.getItem('access_token')}` } }),
          fetch(`${API_URL}/products/api/`, { headers: { Authorization: `Bearer ${sessionStorage.getItem('access_token')}` } }),
        ]);
        setQuotes(await quotesRes.json());
        setMembers(await membersRes.json());
        setBoutiques(await boutiquesRes.json());
        setProducts(await productsRes.json());
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [API_URL]);

  const openQuoteModal = (quote: Quote) => {
    setSelectedQuote(quote);
    setModalOpen(true);
  };

  const closeQuoteModal = () => {
    setSelectedQuote(null);
    setModalOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quotes</h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
          onClick={() => setCreateModalOpen(true)}
        >
          Create Quote
        </button>
      </div>
      {loading && <div>Loading...</div>}
      <QuotesTable quotes={quotes} onQuoteClick={openQuoteModal} />
      <QuoteDetailsModal open={modalOpen} quote={selectedQuote} onClose={closeQuoteModal} />
      <CreateQuoteModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        members={members}
        boutiques={boutiques}
        products={products}
        onSuccess={() => window.location.reload()}
      />
    </div>
  );
};

export default QuotesPage;