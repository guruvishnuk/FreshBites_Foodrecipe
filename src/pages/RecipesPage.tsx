import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ChefHat, Filter } from 'lucide-react';
import { recipes } from '../data/recipes';
import { RecipeCard } from '../components/RecipeCard';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

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
    { id: 'all', label: 'All Dishes' },
    { id: 'indian', label: 'Indian' },
    { id: 'snacks', label: 'Snacks' },
    { id: 'beverage', label: 'Beverages' },
    { id: 'western', label: 'Western' }
  ];

  const filteredRecipes = recipes.filter(recipe => {
    const matchesCategory = activeCategory === 'all' || recipe.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch = searchQuery.trim() === '' || 
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
      <div className="text-center mb-12">
        <Badge variant="yellow" className="mb-6 px-4 py-1 text-sm rounded-full">Menu</Badge>
        <h1 className="text-5xl md:text-7xl font-display font-extrabold text-foreground mb-6 tracking-tight">
          Explore Our <span className="text-primary italic">Menu</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
          Discover a world of flavor. From quick snacks to elaborate multi-course meals, find your next culinary adventure here.
        </p>
      </div>

      <div className="bg-card rounded-[2rem] shadow-xl border border-border p-4 sm:p-8 mb-16 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative z-10 w-full max-w-4xl mx-auto mb-8 flex items-center bg-background rounded-full p-2 border border-border shadow-inner">
          <Search className="text-muted-foreground w-6 h-6 ml-4 shrink-0" />
          <input 
            type="text" 
            placeholder="Search recipes, ingredients, or cuisines..." 
            value={searchQuery} 
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (e.target.value) setSearchParams({ search: e.target.value });
              else setSearchParams({});
            }}
            className="w-full px-4 py-4 text-lg bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
          />
          {searchQuery && (
            <button 
              className="p-2 text-muted-foreground hover:text-foreground transition-colors mr-2 rounded-full hover:bg-muted"
              onClick={() => { setSearchQuery(''); setSearchParams({}); }}
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="relative z-10 flex flex-wrap justify-center gap-3 w-full max-w-4xl mx-auto">
          <div className="hidden sm:flex items-center text-muted-foreground mr-2 font-semibold">
            <Filter className="w-4 h-4 mr-2" /> Filters:
          </div>
          {categories.map(cat => (
            <button 
              key={cat.id}
              className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-300 text-sm border-2 ${
                activeCategory === cat.id 
                  ? 'bg-primary border-primary text-primary-foreground shadow-md scale-105' 
                  : 'bg-transparent border-border text-foreground hover:border-primary/50 hover:bg-muted'
              }`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {filteredRecipes.length === 0 ? (
          <motion.div 
            key="empty"
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center py-32 bg-muted/30 rounded-[3rem] border-2 border-dashed border-border"
          >
            <div className="w-32 h-32 bg-background rounded-full shadow-lg border border-border flex items-center justify-center mx-auto mb-8 animate-bounce">
              <ChefHat className="w-16 h-16 text-primary" />
            </div>
            <h3 className="text-3xl font-display font-bold text-foreground mb-4">No dishes found</h3>
            <p className="text-lg text-muted-foreground mb-10 max-w-md mx-auto font-medium">We couldn't find anything matching "<span className="text-foreground font-bold">{searchQuery}</span>". Try a different search term or category.</p>
            <Button size="lg" className="rounded-full px-8 shadow-primary/20 shadow-lg" onClick={() => { setSearchQuery(''); setActiveCategory('all'); setSearchParams({}); }}>
              Clear Filters & Explore All
            </Button>
          </motion.div>
        ) : (
          <motion.div 
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {filteredRecipes.map((recipe, i) => (
              <motion.div 
                key={recipe.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <RecipeCard recipe={recipe} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
