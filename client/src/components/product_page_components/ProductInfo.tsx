import React, { useContext, useState } from 'react';
import { CartContext } from '../../contexts/CartContext';
import { Product } from '../../interfaces/interface';
interface ProductInfoProps {
  product: Product;
  title: string;
  price: string;
  brand: string;
  type: string;
  quantity: number;
  rating?: number;
  stockStatus?: string;
  variants?: { size: string[], color: string[] };
}

const ProductInfo = ({ product, title, price, brand, type, quantity, rating, stockStatus, variants }: ProductInfoProps) => {
  const [isAdding, setIsAdding] = useState(false);

  const cartContext = useContext(CartContext);
  if (!cartContext) return <p>Cart context not available</p>;
  const { addToCart } = cartContext;

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product);
    setTimeout(() => setIsAdding(false), 1000);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">{title}</h1>
      <h1 className="text-3xl font-bold">{brand}</h1>
      <p className="text-lg">Product Type: {type}</p>
      <p className="text-lg">Available Quantity: {quantity}</p>
      <p className="text-xl text-green-600 font-semibold">{price}</p>
      <p className="text-yellow-400">Rating: {rating} ★</p>
      <p className="text-gray-500">{stockStatus}</p>

      <div className="space-y-2">
        {/* Variants: Size Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Size</label>
          <select className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3">
            {variants && (variants.size.map((size, index) => (
              <option key={index}>{size}</option>
            )))}
          </select>
        </div>

        {/* Variants: Color Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Color</label>
          <div className="mt-1 flex space-x-2">
            {variants && (variants.color.map((color, index) => (
              <div key={index} className={`w-8 h-8 bg-${color}-500 rounded-full cursor-pointer`} />
            )))}
          </div>
        </div>
      </div>

      {/* Add to Cart / Buy Now */}
      <div className="space-y-2">
        <button 
          onClick={handleAddToCart}
          className={`w-full py-2 px-4 bg-blue-500 text-white rounded-md add-to-cart-btn ${isAdding ? 'adding' : ''}`}
          disabled={isAdding}
        >{isAdding ? 'Adding...' : 'Add to Cart'}</button>
        <button className="w-full py-2 px-4 bg-green-500 text-white rounded-md">Buy Now</button>
      </div>
    </div>
  );
};

export default ProductInfo;
