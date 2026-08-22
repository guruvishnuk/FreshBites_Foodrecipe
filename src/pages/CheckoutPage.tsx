import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, User, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';

export const CheckoutPage: React.FC = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '', phone: '', address: '', city: '', pincode: '', paymentMethod: 'cod'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      alert('Please fill out all required fields.');
      return;
    }
    navigate('/thank-you');
    setTimeout(clearCart, 500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
      className="w-full max-w-4xl mx-auto px-4 py-12"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">Secure Checkout</h1>
        <p className="text-lg text-slate-500 dark:text-slate-400">Just a few details to get your fresh ingredients delivered.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <Card className="border-0 shadow-2xl shadow-slate-200/50 dark:shadow-none bg-white dark:bg-slate-900 overflow-hidden">
            <div className="h-2 w-full bg-gradient-to-r from-emerald-400 to-teal-500" />
            <CardContent className="p-8 md:p-10">
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Contact Section */}
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-sm">1</span>
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 relative">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Full Name</label>
                      <User className="absolute bottom-3 left-3 w-4 h-4 text-slate-400" />
                      <Input name="name" required placeholder="John Doe" value={formData.name} onChange={handleChange} className="pl-10" />
                    </div>
                    <div className="space-y-2 relative">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Phone Number</label>
                      <Phone className="absolute bottom-3 left-3 w-4 h-4 text-slate-400" />
                      <Input type="tel" name="phone" required placeholder="+91 9876543210" value={formData.phone} onChange={handleChange} className="pl-10" />
                    </div>
                  </div>
                </div>

                <div className="h-px bg-slate-100 dark:bg-slate-800" />

                {/* Delivery Section */}
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-sm">2</span>
                    Delivery Address
                  </h3>
                  <div className="space-y-6">
                    <div className="space-y-2 relative">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Street Address</label>
                      <MapPin className="absolute top-9 left-3 w-4 h-4 text-slate-400" />
                      <textarea 
                        name="address" required rows={3} placeholder="House/Flat No., Street" value={formData.address} onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">City</label>
                        <Input name="city" placeholder="Bengaluru" value={formData.city} onChange={handleChange} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Pincode</label>
                        <Input name="pincode" placeholder="560001" value={formData.pincode} onChange={handleChange} />
                      </div>
                    </div>
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full text-lg shadow-xl shadow-emerald-500/20 py-6">
                  <CheckCircle2 className="w-5 h-5 mr-2" /> Confirm & Place Order
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-4">
          <Card className="bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-4 pb-4 border-b border-slate-200 dark:border-slate-700">Order Brief</h3>
              <div className="space-y-3 mb-6 max-h-[300px] overflow-y-auto">
                {cartItems.map((item: any, i: number) => (
                  <div key={i} className="flex justify-between items-center text-sm">
                    <span className="text-slate-600 dark:text-slate-400 truncate pr-4">{item.quantity}x {item.name}</span>
                    <span className="font-medium">₹{item.price}</span>
                  </div>
                ))}
              </div>
              <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center">
                <span className="font-bold text-lg">Total</span>
                <span className="font-black text-2xl text-emerald-600 dark:text-emerald-400">₹{cartTotal}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};
