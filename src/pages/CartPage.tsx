import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { useCart } from '../context/CartContext';

export const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const navigate = useNavigate();
  const [showQR, setShowQR] = useState(true);

  const upiId = "9686715615@axl";
  const payeeName = "FreshBite";
  const upiLink = `upi://pay?pa=${upiId}&pn=${payeeName}&am=${cartTotal}&cu=INR`;

  const handleConfirmCOD = () => {
    alert('Cash on Delivery selected. Your order has been placed successfully!');
    clearCart();
    navigate('/thank-you');
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8 flex items-center gap-2">
        🛒 Your Shopping Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-12 text-center">
          <i className="fas fa-shopping-basket text-6xl text-gray-300 dark:text-gray-600 mb-4"></i>
          <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-2">Your cart is currently empty.</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">Explore our delicious recipes and add fresh ingredients to your basket!</p>
          <Link to="/recipes" className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md transition inline-block">
            Browse Recipes
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                      <th className="p-4 font-semibold text-gray-700 dark:text-gray-200">Item / Ingredient</th>
                      <th className="p-4 font-semibold text-gray-700 dark:text-gray-200 w-32">Qty</th>
                      <th className="p-4 font-semibold text-gray-700 dark:text-gray-200 w-24">Price</th>
                      <th className="p-4 font-semibold text-center w-16">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item: any, index: number) => (
                      <tr key={index} className="border-b border-gray-200 dark:border-gray-700 last:border-0">
                        <td className="p-4">
                          <strong className="block text-gray-800 dark:text-gray-200">{item.name}</strong>
                          {item.recipeTitle && (
                            <span className="text-sm text-gray-500 dark:text-gray-400">From: {item.recipeTitle}</span>
                          )}
                        </td>
                        <td className="p-4">
                          <input 
                            type="text" 
                            value={item.quantity} 
                            onChange={(e) => updateQuantity(index, e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-green-500 focus:outline-none dark:bg-gray-700 dark:text-white"
                          />
                        </td>
                        <td className="p-4 font-semibold text-green-600 dark:text-green-400">₹{item.price}</td>
                        <td className="p-4 text-center">
                          <button 
                            onClick={() => removeFromCart(index)} 
                            className="text-red-500 hover:text-red-700 transition p-2 rounded-full hover:bg-red-50 dark:hover:bg-gray-700"
                            title="Remove item"
                          >
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-600 flex justify-between items-center">
                <button onClick={clearCart} className="text-red-500 hover:text-red-700 font-medium flex items-center gap-1 transition">
                  <i className="fas fa-trash"></i> Clear Cart
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Order Summary</h2>
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-600 dark:text-gray-400">Total Amount:</span>
                <strong className="text-2xl text-green-600 dark:text-green-400">₹{cartTotal}</strong>
              </div>
              
              <div className="space-y-3">
                <Link to="/checkout" className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition flex items-center justify-center gap-2">
                  <i className="fas fa-credit-card"></i> Proceed to Checkout
                </Link>
                <button onClick={handleConfirmCOD} className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-bold rounded-lg transition flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-500">
                  <i className="fas fa-truck"></i> Cash on Delivery
                </button>
              </div>
            </div>

            {showQR && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center">
                <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-1 flex justify-center items-center gap-2">
                  <i className="fas fa-qrcode text-blue-500"></i> Scan to Pay
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Google Pay, PhonePe, Paytm, BHIM</p>
                <div className="bg-white p-2 rounded-lg inline-block border border-gray-200 shadow-inner mb-3">
                  <QRCodeSVG 
                    value={upiLink} 
                    size={160}
                    level="H"
                    includeMargin={true}
                  />
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  <div className="mb-1">UPI ID: <strong className="text-gray-900 dark:text-white">{upiId}</strong></div>
                  <div>Amount: <strong className="text-green-600 dark:text-green-400">₹{cartTotal}</strong></div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
