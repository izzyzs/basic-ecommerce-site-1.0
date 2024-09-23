// CartContext.tsx
import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { CartItem, Product } from '../interfaces/interface';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    // Load cart from localStorage on initial render
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.ID === product.ID);
      if (existingItem) {
        return prevCart.map((item) =>
          item.ID === product.ID
            ? { ...item, cartQuantity: item.cartQuantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, cartQuantity: 1 }];
    });
  };

  const clearCart = () => {
    setCart([]);
    console.log('Cart cleared');
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    setCart((prevCart) => {
      const newCart = prevCart.map((item) =>
        item.ID === id ? { ...item, cartQuantity: newQuantity } : item
      );
      console.log('Cart updated:', newCart);
      return newCart;
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => {
      const newCart = prevCart.filter((item) => item.ID !== id);
      console.log('Item removed, new cart:', newCart);
      return newCart;
    });
  };

  const total = cart.reduce((sum, item) => sum + item.Price * item.cartQuantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, total, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
