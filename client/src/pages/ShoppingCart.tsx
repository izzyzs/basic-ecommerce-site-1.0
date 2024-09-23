import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const ShoppingCart = () => {
  const cartContext = useContext(CartContext);
  const { isAuthenticated } = useAuth();

  if (!cartContext) return null;

  const { cart, updateQuantity, removeFromCart, total, clearCart } = cartContext;

  const handleQuantityChange = (id: number, newQuantity: number) => {
    console.log(`Changing quantity for item ${id} to ${newQuantity}`);
    if (newQuantity <= 0) {
      console.log(`Removing item ${id} from cart`);
      removeFromCart(id);
    } else {
      console.log(`Updating quantity for item ${id} to ${newQuantity}`);
      updateQuantity(id, newQuantity);
    }
  };

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      // Redirect to login page or show login modal
      return;
    }

    try {
      const orderData = {
        items: cart.map(item => ({
          productId: item.ID,
          quantity: item.cartQuantity
        })),
        total: total
      };

      const response = await axios.post('/api/orders', orderData, { withCredentials: true });
      console.log('Order created:', response.data);
      
      clearCart();

      // TODO: Show a success message to the user
    } catch (error) {
      console.error('Error creating order:', error);
      // TODO: Show an error message to the user
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-semibold mb-4">Shopping Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.ID} className="flex items-center justify-between p-4 bg-white shadow-md mb-4 rounded-md">
              <div className="flex items-center space-x-4">
                {/* <img src={item.Image} alt={item.Name} className="w-16 h-16 object-cover rounded-md" /> */}
                <div>
                  <h3 className="text-xl font-semibold">{item.Name}</h3>
                  <p className="text-gray-500">${item.Price.toFixed(2)}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {/* Quantity Selector */}
                <div className="flex items-center space-x-2">
                  <button
                    className="px-2 py-1 bg-gray-200 rounded"
                    onClick={() => handleQuantityChange(item.ID, item.cartQuantity - 1)}
                    disabled={item.cartQuantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-4">{item.cartQuantity}</span>
                  <button
                    className="px-2 py-1 bg-gray-200 rounded"
                    onClick={() => handleQuantityChange(item.ID, item.cartQuantity + 1)}
                  >
                    +
                  </button>
                </div>

                {/* Remove Button */}
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                  onClick={() => removeFromCart(item.ID)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="flex justify-between mt-4">
            <p className="text-xl font-semibold">Total: ${total.toFixed(2)}</p>
            <button className="px-6 py-2 bg-green-500 text-white font-semibold rounded-md" onClick={handleCheckout}>Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;