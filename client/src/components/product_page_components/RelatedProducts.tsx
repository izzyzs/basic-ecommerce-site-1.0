import React from 'react';
import { Product } from '../../interfaces/interface';

interface RelatedProductsProps {
  products?: { title: string; price: string; image: string }[];
//   products?: Product[];
}

const RelatedProducts = ({ products }: RelatedProductsProps) => {
  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
        {products && (products.map((product, index) => (
          <div key={index} className="border p-4 rounded-md">
            <img src={product.image} alt={product.title} className="h-32 w-full object-cover" />
            <h3 className="mt-2 text-lg font-semibold">{product.title}</h3>
            <p className="text-green-600 font-semibold">{product.price}</p>
          </div>
        )))}
      </div>
    </div>
  );
};

export default RelatedProducts;
