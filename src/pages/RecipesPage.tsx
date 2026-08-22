import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, X, ChefHat } from 'lucide-react';
import { recipes } from '../data/recipes';
import { RecipeCard } from '../components/RecipeCard';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';

export const RecipesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

  useEffect(() => {
    const query = searchParams.get('search');
    if (query !== null) {
      setSearchQuery(query);
    }
  }, [searchParams]);

  const categories = [
    { id: 'all', label: 'All Recipes' },
    { id: 'indian', label: 'Indian' },
    { id: 'snacks', label: 'Snacks' },
    { id: 'beverage', label: 'Beverages' },
    { id: 'western', label: 'Western' }
  ];

  const filteredRecipes = recipes.filter(recipe => {
    const matchesCategory = activeCategory === 'all' || recipe.category === activeCategory;
    const matchesSearch = searchQuery.trim() === '' || 
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.ingredients.some(ing => ing.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0 }}
      className="w-full max-w-7xl mx-auto px-4 py-12"
    >
      <div className="text-center mb-16">
        <Badge variant="secondary" className="mb-4">Culinary Library</Badge>
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
          Explore Our <span className="text-emerald-500">Masterpieces</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Discover a world of flavor. From quick snacks to elaborate multi-course meals, find your next culinary adventure here.
        </p>
      </div>

      <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-md rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 mb-12">
        <div className="relative w-full max-w-3xl mx-auto mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <Input 
            type="text" 
            placeholder="Search recipes, ingredients, or cuisines..." 
            value={searchQuery} 
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (e.target.value) setSearchParams({ search: e.target.value });
              else setSearchParams({});
            }}
            className="w-full pl-12 pr-12 py-6 text-lg rounded-xl shadow-inner bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus-visible:ring-emerald-500"
          />
          {searchQuery && (
            <button 
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
              onClick={() => { setSearchQuery(''); setSearchParams({}); }}
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-2 md:gap-4 w-full">
          {categories.map(cat => (
            <Button 
              key={cat.id}
              variant={activeCategory === cat.id ? "default" : "outline"}
              className="rounded-full px-6"
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </Button>
          ))}
        </div>
      </div>

      {filteredRecipes.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="text-center py-24 bg-slate-50 dark:bg-slate-900/30 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800"
        >
          <ChefHat className="w-16 h-16 mx-auto text-slate-300 dark:text-slate-700 mb-6" />
          <h3 className="text-2xl font-bold text-slate-700 dark:text-slate-300 mb-2">No recipes found</h3>
          <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto">We couldn't find anything matching "{searchQuery}". Try a different search term or category.</p>
          <Button onClick={() => { setSearchQuery(''); setActiveCategory('all'); setSearchParams({}); }}>
            Clear Filters
          </Button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRecipes.map((recipe, i) => (
            <motion.div 
              key={recipe.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <RecipeCard recipe={recipe} />
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

// Also import Badge for the tag at the top
import { Badge } from '../components/ui/badge';
