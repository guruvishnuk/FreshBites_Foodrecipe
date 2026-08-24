import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Trash2, ArrowRight, Wallet, Truck, Utensils, ChefHat } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';

export const CartPage: React.FC = () => {
  const { cartItems, ingredientItems, readyItems, ingredientTotal, readyTotal, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const navigate = useNavigate();
  const [showQR, setShowQR] = useState(true);

  const upiId = "9686715615@axl";
  const payeeName = "Savora";
  const upiLink = `upi://pay?pa=${upiId}&pn=${payeeName}&am=${cartTotal}&cu=INR`;

  const handleConfirmCOD = () => {
    navigate('/thank-you');
    setTimeout(clearCart, 500);
  };

  const renderCartItem = (item: any, originalIndex: number) => (
    <motion.div 
      key={`${item.name}-${originalIndex}`}
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
    >
      <Card className="hover:shadow-lg transition-shadow border-border rounded-[1.5rem] overflow-hidden">
        <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="w-20 h-20 rounded-[1rem] bg-muted flex items-center justify-center flex-shrink-0 border border-border">
            <span className="text-3xl font-display font-bold text-primary">{item.name.charAt(0)}</span>
          </div>
          
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-foreground mb-1">{item.name}</h3>
            {item.recipeTitle && (
              <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary/50" />
                For: {item.recipeTitle}
              </p>
            )}
          </div>

          <div className="flex items-center gap-6 w-full sm:w-auto mt-4 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-0 border-border">
            <div className="flex-1 sm:w-32">
              <Input 
                type="text" 
                value={item.quantity} 
                onChange={(e) => updateQuantity(originalIndex, e.target.value)}
                className="text-center font-bold text-lg bg-background border-border rounded-xl h-12"
              />
            </div>
            <div className="w-24 text-right font-display font-bold text-2xl text-primary">
              ₹{item.price}
            </div>
            <button 
              onClick={() => removeFromCart(originalIndex)} 
              className="p-3 text-muted-foreground hover:text-accent-red hover:bg-accent-red/10 rounded-xl transition-colors"
            >
              <Trash2 className="w-6 h-6" />
            </button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
      className="w-full max-w-7xl mx-auto px-4 py-12"
    >
      <div className="flex items-center justify-between mb-10 pb-6 border-b border-border">
        <h1 className="text-5xl font-display font-extrabold text-foreground flex items-center gap-4 tracking-tight">
          <ShoppingBag className="w-12 h-12 text-primary" />
          Your Cart
        </h1>
        {cartItems.length > 0 && (
          <span className="text-xl font-bold text-muted-foreground bg-muted px-4 py-1 rounded-full">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
          </span>
        )}
      </div>

      {cartItems.length === 0 ? (
        <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-muted/30 rounded-[3rem] border-2 border-dashed border-border p-16 text-center max-w-2xl mx-auto">
          <div className="w-32 h-32 bg-background rounded-full shadow-lg flex items-center justify-center mx-auto mb-8 animate-bounce border border-border">
            <ShoppingBag className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-3xl font-display font-bold text-foreground mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-10 text-lg font-medium">Looks like you haven't added any delicious food or ingredients yet.</p>
          <Link to="/recipes">
            <Button size="lg" className="rounded-full shadow-xl shadow-primary/20 text-lg px-8 h-14">
              Explore Menu <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-8">
            
            {readyItems && readyItems.length > 0 && (
              <div className="space-y-6">
                <div className="bg-primary/10 text-primary px-4 py-3 rounded-2xl flex items-center justify-between font-bold border border-primary/20">
                  <div className="flex items-center gap-3">
                    <Utensils className="w-5 h-5" /> Savora Kitchens (Ready-to-eat)
                  </div>
                  <span>₹{readyTotal}</span>
                </div>
                <AnimatePresence>
                  {cartItems.map((item: any, index: number) => 
                    item.type === 'ready' ? renderCartItem(item, index) : null
                  )}
                </AnimatePresence>
              </div>
            )}

            {ingredientItems && ingredientItems.length > 0 && (
              <div className="space-y-6">
                <div className="bg-secondary/10 text-secondary px-4 py-3 rounded-2xl flex items-center justify-between font-bold border border-secondary/20 mt-4">
                  <div className="flex items-center gap-3">
                    <ChefHat className="w-5 h-5" /> Savora Fresh (Ingredients)
                  </div>
                  <span>₹{ingredientTotal}</span>
                </div>
                <AnimatePresence>
                  {cartItems.map((item: any, index: number) => 
                    item.type === 'ingredient' ? renderCartItem(item, index) : null
                  )}
                </AnimatePresence>
              </div>
            )}

            <div className="flex justify-end pt-4">
              <Button variant="ghost" onClick={clearCart} className="text-accent-red hover:text-accent-red hover:bg-accent-red/10 font-bold rounded-xl">
                <Trash2 className="w-4 h-4 mr-2" /> Clear entire cart
              </Button>
            </div>
          </div>

          {/* Order Summary & Checkout */}
          <div className="lg:col-span-4">
            <Card className="sticky top-28 border-border shadow-2xl overflow-hidden rounded-[2rem]">
              <div className="bg-primary p-6 text-primary-foreground">
                <h2 className="text-2xl font-display font-bold flex items-center gap-2">
                   <Utensils className="w-6 h-6" /> Order Summary
                </h2>
              </div>
              
              <CardContent className="p-8 space-y-6">
                {readyItems.length > 0 && (
                  <div className="flex justify-between items-center text-lg font-medium text-muted-foreground">
                    <span>Ready Meals</span>
                    <span>₹{readyTotal}</span>
                  </div>
                )}
                {ingredientItems.length > 0 && (
                  <div className="flex justify-between items-center text-lg font-medium text-muted-foreground">
                    <span>Ingredients</span>
                    <span>₹{ingredientTotal}</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-lg font-medium">
                  <span className="text-muted-foreground">Platform Fee</span>
                  <strong className="text-foreground">₹15</strong>
                </div>
                <div className="flex justify-between items-center text-lg font-medium">
                  <span className="text-muted-foreground">Delivery</span>
                  <strong className="text-primary font-bold">FREE</strong>
                </div>
                
                <div className="h-px bg-border my-6" />
                
                <div className="flex justify-between items-center text-3xl">
                  <span className="font-display font-bold text-foreground">Total</span>
                  <strong className="font-display font-black text-primary">₹{cartTotal + 15}</strong>
                </div>

                <div className="space-y-4 pt-8">
                  <Link to="/checkout" className="block">
                    <Button size="lg" className="w-full text-xl h-16 shadow-xl shadow-primary/20 rounded-2xl">
                      <Wallet className="w-6 h-6 mr-3" /> Checkout
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg" onClick={handleConfirmCOD} className="w-full text-lg h-14 border-2 border-border font-bold rounded-2xl hover:bg-muted text-muted-foreground">
                    <Truck className="w-5 h-5 mr-3" /> Cash on Delivery
                  </Button>
                </div>
              </CardContent>
            </Card>

            {showQR && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-8">
                <Card className="bg-foreground text-background border-0 overflow-hidden relative rounded-[2rem]">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/30 blur-[50px] rounded-full" />
                  <CardContent className="p-8 text-center relative z-10">
                    <h3 className="font-display font-bold text-xl mb-2 flex justify-center items-center gap-2 text-background">
                      Instant UPI Payment
                    </h3>
                    <p className="text-sm text-background/70 mb-6 font-medium">Scan with any UPI app to pay instantly</p>
                    <div className="bg-white p-4 rounded-3xl inline-block shadow-2xl mb-4">
                      <QRCodeSVG value={upiLink} size={150} level="H" includeMargin={false} />
                    </div>
                    <div className="text-sm font-medium">
                      <div className="text-background/80 mb-1">UPI ID: <strong className="text-background">{upiId}</strong></div>
                      <div>Amount: <strong className="text-primary font-black text-xl">₹{cartTotal + 15}</strong></div>
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
