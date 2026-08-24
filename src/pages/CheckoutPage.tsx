import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, User, CheckCircle2, Navigation, CreditCard, Banknote, QrCode } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';

export const CheckoutPage: React.FC = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '', phone: '', address: '', city: '', pincode: '', paymentMethod: 'card'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePaymentChange = (method: string) => {
    setFormData(prev => ({ ...prev, paymentMethod: method }));
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
      className="w-full max-w-6xl mx-auto px-4 py-12"
    >
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-display font-extrabold text-foreground tracking-tight mb-4">Secure Checkout</h1>
        <p className="text-xl font-medium text-muted-foreground">Just a few details to get your order delivered.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <Card className="border-border shadow-2xl rounded-[2rem] bg-card overflow-hidden">
            <div className="h-3 w-full bg-gradient-to-r from-primary to-accent-yellow" />
            <CardContent className="p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-10">
                
                {/* Contact Section */}
                <div>
                  <h3 className="text-2xl font-display font-bold text-foreground mb-8 flex items-center gap-4">
                    <span className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg shadow-md">1</span>
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3 relative">
                      <label className="text-sm font-bold text-foreground ml-1">Full Name</label>
                      <User className="absolute bottom-4 left-4 w-5 h-5 text-muted-foreground" />
                      <Input name="name" required placeholder="John Doe" value={formData.name} onChange={handleChange} className="pl-12 h-14 bg-muted border-none rounded-2xl" />
                    </div>
                    <div className="space-y-3 relative">
                      <label className="text-sm font-bold text-foreground ml-1">Phone Number</label>
                      <Phone className="absolute bottom-4 left-4 w-5 h-5 text-muted-foreground" />
                      <Input type="tel" name="phone" required placeholder="+91 9876543210" value={formData.phone} onChange={handleChange} className="pl-12 h-14 bg-muted border-none rounded-2xl" />
                    </div>
                  </div>
                </div>

                <div className="h-px bg-border" />

                {/* Delivery Section */}
                <div>
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-2xl font-display font-bold text-foreground flex items-center gap-4">
                      <span className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg shadow-md">2</span>
                      Delivery Address
                    </h3>
                    <Button type="button" variant="outline" size="sm" className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors font-bold text-sm h-10 px-4 hidden sm:flex">
                      <Navigation className="w-4 h-4 mr-2" /> Locate Me
                    </Button>
                  </div>
                  <div className="space-y-8">
                    <div className="space-y-3 relative">
                      <label className="text-sm font-bold text-foreground ml-1">Street Address</label>
                      <MapPin className="absolute top-11 left-4 w-5 h-5 text-muted-foreground" />
                      <textarea 
                        name="address" required rows={3} placeholder="House/Flat No., Street" value={formData.address} onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 bg-muted border-none rounded-2xl focus:ring-2 focus:ring-primary outline-none resize-none font-medium"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-sm font-bold text-foreground ml-1">City</label>
                        <Input name="city" placeholder="Bengaluru" value={formData.city} onChange={handleChange} className="h-14 bg-muted border-none rounded-2xl" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-sm font-bold text-foreground ml-1">Pincode</label>
                        <Input name="pincode" placeholder="560001" value={formData.pincode} onChange={handleChange} className="h-14 bg-muted border-none rounded-2xl" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-border" />

                {/* Payment Section (Phase 5 Gateway Sim) */}
                <div>
                  <h3 className="text-2xl font-display font-bold text-foreground mb-8 flex items-center gap-4">
                    <span className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg shadow-md">3</span>
                    Payment Method
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <button type="button" onClick={() => handlePaymentChange('card')} className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all ${formData.paymentMethod === 'card' ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:border-primary/50 text-muted-foreground'}`}>
                      <CreditCard className="w-8 h-8 mb-2" />
                      <span className="font-bold">Card</span>
                    </button>
                    <button type="button" onClick={() => handlePaymentChange('upi')} className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all ${formData.paymentMethod === 'upi' ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:border-primary/50 text-muted-foreground'}`}>
                      <QrCode className="w-8 h-8 mb-2" />
                      <span className="font-bold">UPI</span>
                    </button>
                    <button type="button" onClick={() => handlePaymentChange('cod')} className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all ${formData.paymentMethod === 'cod' ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:border-primary/50 text-muted-foreground'}`}>
                      <Banknote className="w-8 h-8 mb-2" />
                      <span className="font-bold">COD</span>
                    </button>
                  </div>

                  <AnimatePresence mode="wait">
                    {formData.paymentMethod === 'card' && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-6 overflow-hidden">
                        <div className="space-y-3 relative">
                          <label className="text-sm font-bold text-foreground ml-1">Card Number</label>
                          <CreditCard className="absolute bottom-4 left-4 w-5 h-5 text-muted-foreground" />
                          <Input placeholder="0000 0000 0000 0000" className="pl-12 h-14 bg-muted border-none rounded-2xl" />
                        </div>
                        <div className="grid grid-cols-2 gap-8">
                          <div className="space-y-3">
                            <label className="text-sm font-bold text-foreground ml-1">Expiry Date</label>
                            <Input placeholder="MM/YY" className="h-14 bg-muted border-none rounded-2xl text-center" />
                          </div>
                          <div className="space-y-3">
                            <label className="text-sm font-bold text-foreground ml-1">CVV</label>
                            <Input placeholder="123" type="password" maxLength={4} className="h-14 bg-muted border-none rounded-2xl text-center" />
                          </div>
                        </div>
                      </motion.div>
                    )}
                    {formData.paymentMethod === 'upi' && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                         <div className="p-6 bg-muted rounded-2xl border border-border text-center">
                            <QrCode className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                            <p className="font-bold text-foreground">Scan QR Code on the next page to pay securely via UPI.</p>
                         </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Button type="submit" size="lg" className="w-full text-xl shadow-xl shadow-primary/20 h-16 rounded-2xl mt-8">
                  <CheckCircle2 className="w-6 h-6 mr-3" /> 
                  {formData.paymentMethod === 'cod' ? 'Place Order (COD)' : `Pay ₹${cartTotal + 15}`}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-4">
          <Card className="bg-muted border-border rounded-[2rem] sticky top-28">
            <CardContent className="p-8">
              <h3 className="font-display font-bold text-2xl mb-6 pb-4 border-b border-border">Order Brief</h3>
              <div className="space-y-4 mb-8 max-h-[400px] overflow-y-auto">
                {cartItems.map((item: any, i: number) => (
                  <div key={i} className="flex justify-between items-start text-base font-medium">
                    <span className="text-foreground flex-1 pr-4 leading-tight">{item.quantity}x {item.name}</span>
                    <span className="font-bold text-primary shrink-0">₹{item.price}</span>
                  </div>
                ))}
              </div>
              
              <div className="pt-6 border-t border-border space-y-4">
                <div className="flex justify-between items-center font-medium text-muted-foreground">
                  <span>Subtotal</span>
                  <span>₹{cartTotal}</span>
                </div>
                <div className="flex justify-between items-center font-medium text-muted-foreground">
                  <span>Platform Fee</span>
                  <span>₹15</span>
                </div>
                <div className="pt-4 flex justify-between items-center">
                  <span className="font-display font-bold text-2xl text-foreground">Total</span>
                  <span className="font-display font-black text-3xl text-primary">₹{cartTotal + 15}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};
