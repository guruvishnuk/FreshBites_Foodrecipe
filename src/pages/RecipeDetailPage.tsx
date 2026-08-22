import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, CheckCircle2, PlayCircle, ListOrdered, ChefHat } from 'lucide-react';
import { recipes } from '../data/recipes';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

export const RecipeDetailPage: React.FC = () => {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const recipe = recipes.find(r => r.id === recipeId);

  const [selectedIngredients, setSelectedIngredients] = useState<Record<string, boolean>>({});
  const [ingredientQuantities, setIngredientQuantities] = useState<Record<string, string>>({});
  const [notification, setNotification] = useState('');

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
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4">Recipe Not Found</h2>
        <Button onClick={() => navigate('/recipes')}>Browse Recipes</Button>
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
      className="w-full max-w-6xl mx-auto px-4 py-8"
    >
      {/* Hero Image Section */}
      <div className="relative h-[40vh] md:h-[60vh] w-full rounded-3xl overflow-hidden shadow-2xl mb-12">
        <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent flex flex-col justify-end p-8 md:p-16">
          <Badge className="w-max mb-4 bg-emerald-500 hover:bg-emerald-600 text-sm py-1 px-3 shadow-lg">{recipe.category}</Badge>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight mb-4 drop-shadow-md">
            {recipe.title}
          </h1>
          <p className="text-lg md:text-xl text-slate-200 max-w-3xl font-light drop-shadow-sm">
            {recipe.description}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Content (Left) */}
        <div className="lg:col-span-8 space-y-16">
          
          {/* Video Section */}
          {recipe.youtubeUrl && (
            <section>
              <div className="flex items-center gap-3 mb-6">
                <PlayCircle className="w-8 h-8 text-rose-500" />
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Masterclass Video</h2>
              </div>
              <div className="relative pt-[56.25%] rounded-2xl overflow-hidden shadow-xl bg-slate-900 border border-slate-200 dark:border-slate-800">
                <iframe 
                  src={recipe.youtubeUrl} 
                  title="Video Tutorial"
                  className="absolute inset-0 w-full h-full"
                  allowFullScreen
                ></iframe>
              </div>
            </section>
          )}

          {/* Instructions */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <ListOrdered className="w-8 h-8 text-emerald-500" />
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Step-by-Step Guide</h2>
            </div>
            <div className="space-y-6">
              {recipe.instructions.map((step, idx) => (
                <div key={idx} className="flex gap-6 items-start bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-lg">
                    {idx + 1}
                  </div>
                  <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed pt-1">{step}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar (Right) - Ingredients & Cart */}
        <div className="lg:col-span-4">
          <div className="sticky top-28 bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="bg-emerald-600 p-6 text-white flex items-center gap-3">
              <ChefHat className="w-8 h-8 opacity-90" />
              <div>
                <h3 className="text-xl font-bold">Premium Ingredients</h3>
                <p className="text-emerald-100 text-sm">Delivered fresh to your door</p>
              </div>
            </div>

            <div className="p-6">
              {notification && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-xl flex items-center gap-2 font-medium border border-emerald-200 dark:border-emerald-800/50">
                  <CheckCircle2 className="w-5 h-5" /> {notification}
                </motion.div>
              )}

              <form onSubmit={handleAddToCart}>
                <div className="mb-6 pb-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                  <span className="font-semibold text-slate-900 dark:text-white">Select Items</span>
                  <label className="text-sm text-emerald-600 dark:text-emerald-400 font-medium cursor-pointer hover:underline">
                    <input type="checkbox" className="hidden" onChange={(e) => handleSelectAll(e.target.checked)} defaultChecked />
                    Select All
                  </label>
                </div>

                <div className="space-y-4 mb-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {recipe.ingredients.map((ing, idx) => (
                    <div key={idx} className={`p-4 rounded-xl border transition-colors ${selectedIngredients[ing.name] ? 'bg-slate-50 dark:bg-slate-800/50 border-emerald-200 dark:border-emerald-800/50' : 'bg-transparent border-slate-100 dark:border-slate-800'}`}>
                      <div className="flex items-start gap-3">
                        <input 
                          type="checkbox" 
                          checked={!!selectedIngredients[ing.name]} 
                          onChange={() => handleCheckboxChange(ing.name)}
                          className="mt-1 w-5 h-5 rounded text-emerald-600 focus:ring-emerald-500"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between font-semibold text-slate-900 dark:text-white mb-1">
                            <span>{ing.name}</span>
                            <span className="text-emerald-600 dark:text-emerald-400">₹{ing.price}</span>
                          </div>
                          <input 
                            type="text" 
                            value={ingredientQuantities[ing.name] || ''} 
                            onChange={(e) => handleQuantityChange(ing.name, e.target.value)}
                            className="w-full mt-2 px-3 py-1.5 text-sm bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-md focus:ring-1 focus:ring-emerald-500 outline-none transition-shadow"
                            placeholder={ing.defaultQty}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Button type="submit" size="lg" className="w-full text-lg shadow-xl shadow-emerald-500/20">
                  <ShoppingCart className="w-5 h-5 mr-2" /> Add to Order
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
