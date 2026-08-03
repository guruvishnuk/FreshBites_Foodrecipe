import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { useCart } from '../context/CartContext';

export const CartPage = () => {
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
    <div className="cart-page-wrapper">
      <div className="cart-container" id="cart">
        <h1>🛒 Your Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="empty-cart-view">
            <i className="fas fa-shopping-basket fa-4x"></i>
            <p className="empty-message">Your cart is currently empty.</p>
            <p>Explore our delicious recipes and add fresh ingredients to your basket!</p>
            <br />
            <Link to="/recipes" className="btn">Browse Recipes</Link>
          </div>
        ) : (
          <>
            <div className="cart-table-wrapper">
              <table className="cart-table">
                <thead>
                  <tr>
                    <th>Item / Ingredient</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <strong>{item.name}</strong>
                        {item.recipeTitle && (
                          <div className="cart-item-recipe">From: {item.recipeTitle}</div>
                        )}
                      </td>
                      <td>
                        <input 
                          type="text" 
                          value={item.quantity} 
                          onChange={(e) => updateQuantity(index, e.target.value)}
                          className="qty-edit-input"
                        />
                      </td>
                      <td>₹{item.price}</td>
                      <td>
                        <button 
                          onClick={() => removeFromCart(index)} 
                          className="delete-item-btn"
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

            <div className="cart-summary-bar">
              <button onClick={clearCart} className="clear-cart-btn">
                <i className="fas fa-trash"></i> Clear Cart
              </button>
              <div className="total-display">
                <span>Total Amount:</span>
                <strong className="total-amount">₹{cartTotal}</strong>
              </div>
            </div>

            <div className="payment-options">
              <h2>Select Payment Method</h2>
              <div className="payment-buttons">
                <button className="pay-btn cod" onClick={handleConfirmCOD}>
                  <i className="fas fa-truck"></i> Cash on Delivery
                </button>
                <Link to="/checkout" className="pay-btn checkout-btn">
                  <i className="fas fa-credit-card"></i> Proceed to Checkout
                </Link>
              </div>
            </div>

            {showQR && (
              <div className="qr-section">
                <h3><i className="fas fa-qrcode"></i> Scan QR to Pay via Any UPI App</h3>
                <p>Google Pay, PhonePe, Paytm, BHIM</p>
                <div className="qrcode-box">
                  <QRCodeSVG 
                    value={upiLink} 
                    size={200}
                    level="H"
                    includeMargin={true}
                  />
                </div>
                <div className="upi-details">
                  <span>UPI ID: <strong>{upiId}</strong></span>
                  <br />
                  <small>Amount: ₹{cartTotal}</small>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
