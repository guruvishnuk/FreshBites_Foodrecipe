import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ShoppingCart, CheckCircle2, PlayCircle, ChefHat, Utensils, Info } from 'lucide-react';
import { recipes } from '../data/recipes';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

export const RecipeDetailPage: React.FC = () => {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  // Parallax scroll effect
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity1 = useTransform(scrollY, [0, 300], [1, 0]);

  const recipe = recipes.find(r => r.id === recipeId);

  const [selectedIngredients, setSelectedIngredients] = useState<Record<string, boolean>>({});
  const [ingredientQuantities, setIngredientQuantities] = useState<Record<string, string>>({});
  const [notification, setNotification] = useState('');
  const [orderMode, setOrderMode] = useState<'cook' | 'ready'>('cook');
  const [expandedStep, setExpandedStep] = useState<number>(0);

  useEffect(() => {
    if (recipe && recipe.ingredients) {
      const initialSelected: Record<string, boolean> = {};
      const initialQuantities: Record<string, string> = {};
      recipe.ingredients.forEach(ing => {
        initialSelected[ing.name] = true;
        initialQuantities[ing.name] = ing.defaultQty;
      });
      setSelectedIngredients(initialSelected);
      setIngredientQuantities(initialQuantities);
    }
  }, [recipe]);

  if (!recipe) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
        <h2 className="text-3xl font-bold text-foreground mb-4">Recipe Not Found</h2>
        <Button onClick={() => navigate('/recipes')}>Browse Menu</Button>
      </div>
    );
  }

  const handleCheckboxChange = (name: string) => {
    setSelectedIngredients(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const handleQuantityChange = (name: string, val: string) => {
    setIngredientQuantities(prev => ({ ...prev, [name]: val }));
  };

  const handleSelectAll = (checked: boolean) => {
    const updated: Record<string, boolean> = {};
    recipe.ingredients.forEach(ing => { updated[ing.name] = checked; });
    setSelectedIngredients(updated);
  };

  const handleAddToCart = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderMode === 'ready') {
      alert("Added Ready-to-eat meal to cart!");
      return;
    }
    const itemsToAdd: any[] = [];
    recipe.ingredients.forEach(ing => {
      if (selectedIngredients[ing.name]) {
        itemsToAdd.push({
          name: ing.name,
          quantity: ingredientQuantities[ing.name] || ing.defaultQty,
          price: ing.price,
          recipeTitle: recipe.title
        });
      }
    });

    if (itemsToAdd.length === 0) {
      alert('Please select at least one ingredient to add to cart.');
      return;
    }

    addToCart(itemsToAdd);
    setNotification(`Added ${itemsToAdd.length} items to cart!`);
    setTimeout(() => navigate('/cart'), 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full flex flex-col bg-background"
    >
      {/* Parallax Hero Section */}
      <div className="relative h-[50vh] md:h-[70vh] w-full overflow-hidden mb-12">
        <motion.div style={{ y: y1, opacity: opacity1 }} className="absolute inset-0">
          <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </motion.div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-12">
          <Badge className="w-max mb-6 bg-primary hover:bg-primary-hover text-sm py-1.5 px-4 rounded-full shadow-lg text-primary-foreground font-bold">{recipe.category}</Badge>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-black text-foreground tracking-tight mb-6 drop-shadow-sm"
          >
            {recipe.title}
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl font-medium drop-shadow-sm"
          >
            {recipe.description}
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Content (Left) */}
          <div className="lg:col-span-8 space-y-16">
            
            {/* Dual Mode Toggle (Phase 4 Prep) */}
            <div className="bg-card rounded-[2rem] p-2 flex border border-border shadow-sm">
              <button 
                className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-[1.5rem] font-bold text-lg transition-all ${orderMode === 'cook' ? 'bg-primary text-primary-foreground shadow-md' : 'text-muted-foreground hover:bg-muted'}`}
                onClick={() => setOrderMode('cook')}
              >
                <ChefHat className="w-6 h-6" /> Cook it myself
              </button>
              <button 
                className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-[1.5rem] font-bold text-lg transition-all ${orderMode === 'ready' ? 'bg-primary text-primary-foreground shadow-md' : 'text-muted-foreground hover:bg-muted'}`}
                onClick={() => setOrderMode('ready')}
              >
                <Utensils className="w-6 h-6" /> Order ready-made
              </button>
            </div>

            {/* Video Section */}
            {recipe.youtubeUrl && (
              <section>
                <div className="flex items-center gap-3 mb-8">
                  <div className="bg-accent-red/20 p-3 rounded-2xl text-accent-red">
                    <PlayCircle className="w-8 h-8" />
                  </div>
                  <h2 className="text-4xl font-display font-bold text-foreground tracking-tight">Masterclass</h2>
                </div>
                <div className="relative pt-[56.25%] rounded-[2rem] overflow-hidden shadow-2xl bg-muted border border-border ring-4 ring-muted/50">
                  <iframe 
                    src={recipe.youtubeUrl} 
                    title="Video Tutorial"
                    className="absolute inset-0 w-full h-full"
                    allowFullScreen
                  ></iframe>
                </div>
              </section>
            )}

            {/* Step-by-step Accordion */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-secondary/20 p-3 rounded-2xl text-secondary">
                  <ChefHat className="w-8 h-8" />
                </div>
                <h2 className="text-4xl font-display font-bold text-foreground tracking-tight">Step-by-Step Guide</h2>
              </div>
              <div className="space-y-4">
                {recipe.instructions.map((step, idx) => (
                  <motion.div 
                    key={idx} 
                    className={`bg-card rounded-[1.5rem] overflow-hidden border transition-all duration-300 ${expandedStep === idx ? 'border-primary shadow-lg ring-2 ring-primary/20' : 'border-border shadow-sm hover:border-primary/50'}`}
                  >
                    <button 
                      className="w-full flex items-center p-6 text-left"
                      onClick={() => setExpandedStep(expandedStep === idx ? -1 : idx)}
                    >
                      <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-display font-bold text-xl mr-6 transition-colors ${expandedStep === idx ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                        {idx + 1}
                      </div>
                      <h3 className={`text-xl font-bold transition-colors ${expandedStep === idx ? 'text-foreground' : 'text-muted-foreground'}`}>
                        Step {idx + 1}
                      </h3>
                    </button>
                    <AnimatePresence>
                      {expandedStep === idx && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="px-6 pb-6 pt-0 ml-18"
                        >
                          <p className="text-lg text-foreground leading-relaxed font-medium">{step}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar (Right) - Ingredients / Ordering */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 bg-card rounded-[2rem] shadow-2xl border border-border overflow-hidden">
              <div className="bg-primary p-8 text-primary-foreground relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  {orderMode === 'cook' ? <ChefHat size={120} /> : <Utensils size={120} />}
                </div>
                <div className="relative z-10">
                  <h3 className="text-3xl font-display font-bold mb-2">
                    {orderMode === 'cook' ? 'Ingredients' : 'Order Now'}
                  </h3>
                  <p className="text-primary-foreground/80 font-medium">
                    {orderMode === 'cook' ? 'Premium ingredients delivered fresh' : 'Hot & fresh from Savora Kitchens'}
                  </p>
                </div>
              </div>

              <div className="p-8">
                {notification && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 bg-accent-green/20 text-green-800 dark:text-green-300 rounded-xl flex items-center gap-2 font-bold border border-accent-green/30">
                    <CheckCircle2 className="w-6 h-6" /> {notification}
                  </motion.div>
                )}

                <form onSubmit={handleAddToCart}>
                  {orderMode === 'cook' ? (
                    <>
                      <div className="mb-6 pb-4 border-b border-border flex justify-between items-center">
                        <span className="font-bold text-foreground text-lg">Select Items</span>
                        <label className="text-sm text-primary font-bold cursor-pointer hover:underline">
                          <input type="checkbox" className="hidden" onChange={(e) => handleSelectAll(e.target.checked)} defaultChecked />
                          Select All
                        </label>
                      </div>

                      <div className="space-y-4 mb-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                        {recipe.ingredients.map((ing, idx) => (
                          <div key={idx} className={`p-4 rounded-[1.5rem] border-2 transition-all ${selectedIngredients[ing.name] ? 'bg-primary/5 border-primary' : 'bg-transparent border-border'}`}>
                            <div className="flex items-start gap-4">
                              <input 
                                type="checkbox" 
                                checked={!!selectedIngredients[ing.name]} 
                                onChange={() => handleCheckboxChange(ing.name)}
                                className="mt-1.5 w-6 h-6 rounded-md text-primary focus:ring-primary border-border"
                              />
                              <div className="flex-1">
                                <div className="flex justify-between font-bold text-foreground mb-2 text-lg">
                                  <span>{ing.name}</span>
                                  <span className="text-primary">₹{ing.price}</span>
                                </div>
                                <input 
                                  type="text" 
                                  value={ingredientQuantities[ing.name] || ''} 
                                  onChange={(e) => handleQuantityChange(ing.name, e.target.value)}
                                  className="w-full mt-1 px-4 py-2 font-medium bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none transition-shadow"
                                  placeholder={ing.defaultQty}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="mb-8 space-y-6">
                      <div className="bg-muted p-6 rounded-[1.5rem] border border-border">
                        <h4 className="font-bold text-foreground mb-1 text-lg">Savora Kitchens</h4>
                        <p className="text-muted-foreground font-medium text-sm">Delivery in 35 mins</p>
                        <div className="mt-4 pt-4 border-t border-border flex justify-between font-bold text-lg">
                          <span>Total</span>
                          <span>₹450</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 text-sm font-medium text-muted-foreground">
                         <Info className="w-5 h-5 shrink-0 text-primary" />
                         <p>This is a simulated Zomato/Swiggy order flow. In Phase 4, you'll see a list of real nearby restaurants selling this dish.</p>
                      </div>
                    </div>
                  )}

                  <Button type="submit" size="lg" className="w-full text-xl h-16 shadow-primary/20 shadow-xl rounded-2xl relative overflow-hidden group">
                    <span className="relative z-10 flex items-center justify-center">
                      <ShoppingCart className="w-6 h-6 mr-3" /> Add to Order
                    </span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
