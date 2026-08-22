import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Trash2, ArrowRight, Wallet, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';

export const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const navigate = useNavigate();
  const [showQR, setShowQR] = useState(true);

  const upiId = "9686715615@axl";
  const payeeName = "Savora";
  const upiLink = `upi://pay?pa=${upiId}&pn=${payeeName}&am=${cartTotal}&cu=INR`;

  const handleConfirmCOD = () => {
    navigate('/thank-you');
    setTimeout(clearCart, 500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
      className="w-full max-w-6xl mx-auto px-4 py-12"
    >
      <div className="flex items-center justify-between mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white flex items-center gap-4 tracking-tight">
          <ShoppingBag className="w-10 h-10 text-emerald-500" />
          Your Order
        </h1>
        {cartItems.length > 0 && (
          <span className="text-lg font-medium text-slate-500 dark:text-slate-400">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
          </span>
        )}
      </div>

      {cartItems.length === 0 ? (
        <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 p-16 text-center max-w-2xl mx-auto">
          <div className="w-24 h-24 bg-white dark:bg-slate-800 rounded-full shadow-md flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-slate-400 dark:text-slate-500" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-3">Your cart is empty</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8 text-lg">Looks like you haven't added any fresh ingredients yet.</p>
          <Link to="/recipes">
            <Button size="lg" className="rounded-full shadow-lg shadow-emerald-500/20">
              Discover Recipes <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            <AnimatePresence>
              {cartItems.map((item: any, index: number) => (
                <motion.div 
                  key={`${item.name}-${index}`}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                      <div className="w-16 h-16 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{item.name.charAt(0)}</span>
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{item.name}</h3>
                        {item.recipeTitle && (
                          <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                            From: {item.recipeTitle}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-6 w-full sm:w-auto mt-4 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-0 border-slate-100 dark:border-slate-800">
                        <div className="flex-1 sm:w-32">
                          <Input 
                            type="text" 
                            value={item.quantity} 
                            onChange={(e) => updateQuantity(index, e.target.value)}
                            className="text-center font-medium bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700"
                          />
                        </div>
                        <div className="w-24 text-right font-bold text-lg text-emerald-600 dark:text-emerald-400">
                          ₹{item.price}
                        </div>
                        <button 
                          onClick={() => removeFromCart(index)} 
                          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>

            <div className="flex justify-end pt-4">
              <Button variant="ghost" onClick={clearCart} className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10">
                <Trash2 className="w-4 h-4 mr-2" /> Clear entire cart
              </Button>
            </div>
          </div>

          {/* Order Summary & Checkout */}
          <div className="lg:col-span-4">
            <Card className="sticky top-28 border-emerald-100 dark:border-slate-800 shadow-xl overflow-hidden">
              <div className="bg-slate-50 dark:bg-slate-900/50 p-6 border-b border-slate-100 dark:border-slate-800">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Order Summary</h2>
              </div>
              
              <CardContent className="p-6 space-y-6">
                <div className="flex justify-between items-center text-lg">
                  <span className="text-slate-600 dark:text-slate-400">Subtotal</span>
                  <strong className="text-slate-900 dark:text-white font-bold">₹{cartTotal}</strong>
                </div>
                <div className="flex justify-between items-center text-lg">
                  <span className="text-slate-600 dark:text-slate-400">Delivery</span>
                  <strong className="text-emerald-600 dark:text-emerald-400 font-bold">Free</strong>
                </div>
                
                <div className="h-px bg-slate-200 dark:bg-slate-800 my-4" />
                
                <div className="flex justify-between items-center text-2xl">
                  <span className="font-bold text-slate-900 dark:text-white">Total</span>
                  <strong className="font-black text-emerald-600 dark:text-emerald-400">₹{cartTotal}</strong>
                </div>

                <div className="space-y-3 pt-6">
                  <Link to="/checkout" className="block">
                    <Button size="lg" className="w-full text-lg shadow-lg shadow-emerald-500/20 py-6">
                      <Wallet className="w-5 h-5 mr-2" /> Proceed to Checkout
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg" onClick={handleConfirmCOD} className="w-full text-lg py-6 border-slate-300 dark:border-slate-700">
                    <Truck className="w-5 h-5 mr-2" /> Cash on Delivery
                  </Button>
                </div>
              </CardContent>
            </Card>

            {showQR && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-6">
                <Card className="bg-slate-900 text-white border-0 overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 blur-[50px] rounded-full" />
                  <CardContent className="p-8 text-center relative z-10">
                    <h3 className="font-bold text-lg mb-2 flex justify-center items-center gap-2">
                      Instant UPI Payment
                    </h3>
                    <p className="text-sm text-slate-400 mb-6">Scan with any UPI app to pay instantly</p>
                    <div className="bg-white p-3 rounded-2xl inline-block shadow-xl mb-4">
                      <QRCodeSVG value={upiLink} size={150} level="H" includeMargin={false} />
                    </div>
                    <div className="text-sm">
                      <div className="text-slate-300 mb-1">UPI ID: <strong className="text-white">{upiId}</strong></div>
                      <div>Amount: <strong className="text-emerald-400 font-bold text-lg">₹{cartTotal}</strong></div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
};
