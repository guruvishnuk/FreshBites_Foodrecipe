import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('cartItems');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to parse cart items', e);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (items) => {
    setCartItems(prev => {
      const newItems = Array.isArray(items) ? items : [items];
      // default to 'ingredient' if not specified
      const itemsWithType = newItems.map(item => ({
        ...item,
        type: item.type || 'ingredient'
      }));
      return [...prev, ...itemsWithType];
    });
  };

  const removeFromCart = (index) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  const updateQuantity = (index, newQuantity) => {
    setCartItems(prev => {
      const updated = [...prev];
      if (updated[index]) {
        updated[index].quantity = newQuantity;
      }
      return updated;
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + (Number(item.price) || 0), 0);
  
  // Phase 4 additions: Grouping by type
  const ingredientItems = cartItems.filter(item => item.type === 'ingredient');
  const readyItems = cartItems.filter(item => item.type === 'ready');
  const ingredientTotal = ingredientItems.reduce((sum, item) => sum + (Number(item.price) || 0), 0);
  const readyTotal = readyItems.reduce((sum, item) => sum + (Number(item.price) || 0), 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      ingredientItems,
      readyItems,
      ingredientTotal,
      readyTotal,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
