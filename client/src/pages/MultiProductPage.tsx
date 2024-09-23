import React from 'react'
import ProductComponent from '../components/partial_components/ProductComponent'
import { Product } from '../interfaces/interface'

interface MultiProductPageProps {
  productsData: Array<Product>
}

const MultiProductPage = ({ productsData }: MultiProductPageProps) => {
  return (
    <main>
      <div className='flex flex-wrap gap-3'>
        {productsData.map((item, index) => (
          <ProductComponent key={index} singleProductData={item}/>
        ))}
      </div>
    </main>
  )
}

export default MultiProductPage