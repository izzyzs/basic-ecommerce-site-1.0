import React from 'react'
import { Product } from '../../interfaces/interface'
import { Link } from 'react-router-dom'

interface ProductComponentProps {
    singleProductData: Product
}

const ProductComponent = ({ singleProductData }: ProductComponentProps) => {
  return (
    <Link to={`/products/${singleProductData.ID}`} className='w-1/5 rounded-lg p-5 m-3 hover:bg-slate-200 flex flex-col justify-center'>
        <div className='w-full'>
            <img src="dropper_product.jpg" alt="" />
        </div>
        <p>{singleProductData.Name}</p>
        <p>${singleProductData.Price}</p>
    </Link>
)
}

export default ProductComponent