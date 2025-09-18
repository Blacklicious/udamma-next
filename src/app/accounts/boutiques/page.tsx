'use client'
import BottomNavBar from '@/components/navbar/main_bottom'
import NavbarMain from '@/components/navbar/main'
import React from 'react'
import BoutiqueProductManager from './products/page'
import BoutiqueMembersList from './customers/pages'
import QuotesPage from './quotes/page'
import OrdersPage from './orders/page'
import { FaBoxOpen, FaUsers, FaFileInvoiceDollar, FaFileAlt, FaMoneyCheckAlt } from 'react-icons/fa'
import PaymentsPage from './orders/payments/page'

export interface Boutique {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

const BoutiqueAccount = () => {
  // state for showing different sections
  const [showProducts, setShowProducts] = React.useState(true);
  const [showCustomers, setShowCustomers] = React.useState(false);
  const [showQuotes, setShowQuotes] = React.useState(false);
  const [showOrders, setShowOrders] = React.useState(false);
  const [showPayments, setShowPayments] = React.useState(false);
  const [, setShowInvoices] = React.useState(false);
  const [, setShowShipping] = React.useState(false);
  const [, setShowReturns] = React.useState(false);



  // handle navbar logic
  const handleShowProducts = () => { setShowProducts(!showProducts); setShowCustomers(false); setShowQuotes(false); setShowOrders(false); setShowInvoices(false); setShowPayments(false); setShowShipping(false); setShowReturns(false); }
  const handleShowCustomers = () => { setShowCustomers(!showCustomers); setShowProducts(false); setShowQuotes(false); setShowOrders(false); setShowInvoices(false); setShowPayments(false); setShowShipping(false); setShowReturns(false); }
  const handleShowQuotes = () => { setShowQuotes(!showQuotes); setShowProducts(false); setShowCustomers(false); setShowOrders(false); setShowInvoices(false); setShowPayments(false); setShowShipping(false); setShowReturns(false); }
  const handleShowOrders = () => { setShowOrders(!showOrders); setShowProducts(false); setShowCustomers(false); setShowQuotes(false); setShowInvoices(false); setShowPayments(false); setShowShipping(false); setShowReturns(false); }
  //const handleShowInvoices = () => { setShowInvoices(!showInvoices); setShowProducts(false); setShowCustomers(false); setShowQuotes(false); setShowOrders(false); setShowPayments(false); setShowShipping(false); setShowReturns(false); }
  const handleShowPayments = () => { setShowPayments(!showPayments); setShowProducts(false); setShowCustomers(false); setShowQuotes(false); setShowOrders(false); setShowInvoices(false); setShowShipping(false); setShowReturns(false); }
  //const handleShowShipping = () => { setShowShipping(!showShipping); setShowProducts(false); setShowCustomers(false); setShowQuotes(false); setShowOrders(false); setShowInvoices(false); setShowPayments(false); setShowReturns(false); }
  //const handleShowReturns = () => { setShowReturns(!showReturns); setShowProducts(false); setShowCustomers(false); setShowQuotes(false); setShowOrders(false); setShowInvoices(false); setShowPayments(false); setShowShipping(false); }

  return (
    <div className='boutique-account-page w-full px-2 bg-[#F9F6F1] pb-6 min-h-screen text-black'>
      <NavbarMain />
      <BottomNavBar />
      <div className='boutique-navbar px-4 mt-3'>
        <div className='flex justify-around overflow-x-auto gap-3 font-semibold text-gray-600 bg-gray-100 p-2 rounded-xl shadow-sm custom-scrollbar'>
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-xl shadow-sm cursor-pointer transition-all duration-150 ${showProducts ? 'bg-blue-600 text-white' : 'bg-white hover:bg-blue-50'}`}
            onClick={handleShowProducts}
          >
            <FaBoxOpen className="text-lg" />
            Products
          </div>
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-xl shadow-sm cursor-pointer transition-all duration-150 ${showCustomers ? 'bg-blue-600 text-white' : 'bg-white hover:bg-blue-50'}`}
            onClick={handleShowCustomers}
          >
            <FaUsers className="text-lg" />
            Customers
          </div>
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-xl shadow-sm cursor-pointer transition-all duration-150 ${showQuotes ? 'bg-blue-600 text-white' : 'bg-white hover:bg-blue-50'}`}
            onClick={handleShowQuotes}
          >
            <FaFileInvoiceDollar className="text-lg" />
            Quotes
          </div>
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-xl shadow-sm cursor-pointer transition-all duration-150 ${showOrders ? 'bg-blue-600 text-white' : 'bg-white hover:bg-blue-50'}`}
            onClick={handleShowOrders}
          >
            <FaFileAlt className="text-lg" />
            Orders
          </div>
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-xl shadow-sm cursor-pointer transition-all duration-150 ${showPayments ? 'bg-blue-600 text-white' : 'bg-gray-50 hover:bg-blue-50'}`}
            onClick={handleShowPayments}
          >
            <FaMoneyCheckAlt className="text-lg" />
            Payments
          </div>
          {/*
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-xl shadow-sm cursor-pointer transition-all duration-150 ${showShipping ? 'bg-blue-600 text-white' : 'bg-gray-50 hover:bg-blue-50'}`}
            onClick={handleShowShipping}
          >
            <FaTruck className="text-lg" />
            Shipping
          </div>
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-xl shadow-sm cursor-pointer transition-all duration-150 ${showReturns ? 'bg-blue-600 text-white' : 'bg-gray-50 hover:bg-blue-50'}`}
            onClick={handleShowReturns}
          >
            <FaUndo className="text-lg" />
            Returns
          </div>
          */}
        </div>
      </div>
      <div className='managers p-4 '>
        {showProducts && (
          <div className='products-manager-content'>
            <BoutiqueProductManager />
          </div>    
        )}
        {showCustomers && (
          <div className='customers-manager-content'>
            <h2 className='text-2xl font-bold mb-4'>Customers</h2>
            <p className='text-gray-600'>Manage your customers here.</p>
            <BoutiqueMembersList boutiqueId={2} />
          </div>
        )}
        {showQuotes && (
          <div className='quotes-manager-content'>
            <h2 className='text-2xl font-bold mb-4'>Quotes</h2>
            <p className='text-gray-600'>Manage your quotes here.</p>
            <QuotesPage />
          </div>
        )}
        {showOrders && (
          <div className='orders-manager-content'>
            <h2 className='text-2xl font-bold mb-4'>Orders</h2>
            <p className='text-gray-600'>Manage your orders here.</p>
            <OrdersPage />
          </div>
        )}
        {showPayments && (
          <div className='payments-manager-content'>
            <h2 className='text-2xl font-bold mb-4'>Payments</h2>
            <p className='text-gray-600'>Manage your payments here.</p>
            <PaymentsPage />
          </div>
        )}
      </div>
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e0e7ef;
          border-radius: 8px;
        }
      `}</style>
    </div>
  )
}

export default BoutiqueAccount