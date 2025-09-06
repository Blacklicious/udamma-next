import React from 'react'
import { FiPlus } from 'react-icons/fi'
import ProductsManagerList from './productsList'
import BoutiqueProductsForm from './productsForm';

const BoutiqueProductManager = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [loading, setLoading] = React.useState(true);

  return (
    <div className='products-manager-content flex flex-col gap-4 '>
      <div className="w-full flex flex-col gap-4 justify-center">
        <div>
            < BoutiqueProductsForm />
        </div>
      </div>
      <div>
        < ProductsManagerList />
      </div>
    </div>
  )
}

export default BoutiqueProductManager