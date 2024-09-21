import React from 'react'

const ProductComponent = () => {
  return (
    <div className='w-1/5 rounded-lg p-5 m-3 hover:bg-slate-200 flex flex-col justify-center'>
        <div className='w-full'>
            <img src="dropper_product.jpg" alt="" />
        </div>
        <p>Beard Oil</p>
        <p>$4</p>
    </div>
)
}

export default ProductComponent