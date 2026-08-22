import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { recipes } from '../data/recipes';
import { RecipeCard } from '../components/RecipeCard';

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
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">🍽 FreshBite Recipe Collection</h1>
        <p className="text-gray-600 dark:text-gray-400">Discover mouthwatering dishes and order fresh ingredients easily</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-10 flex flex-col items-center">
        <div className="relative w-full max-w-2xl mb-6">
          <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          <input 
            type="text" 
            placeholder="Search recipes, ingredients..." 
            value={searchQuery} 
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (e.target.value) {
                setSearchParams({ search: e.target.value });
              } else {
                setSearchParams({});
              }
            }}
            className="w-full pl-12 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none dark:bg-gray-700 dark:text-white"
          />
          {searchQuery && (
            <button 
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 transition"
              onClick={() => {
                setSearchQuery('');
                setSearchParams({});
              }}
            >
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-3 w-full">
          {categories.map(cat => (
            <button 
              key={cat.id}
              className={`px-5 py-2 rounded-full font-semibold transition ${
                activeCategory === cat.id 
                  ? 'bg-green-600 text-white shadow-md' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {filteredRecipes.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-600">
          <i className="fas fa-utensils-slash text-4xl text-gray-400 mb-4"></i>
          <h3 className="text-xl font-bold text-gray-700 dark:text-gray-200 mb-2">No recipes found matching "{searchQuery}"</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">Try searching for another dish or browse all categories.</p>
          <button 
            onClick={() => { setSearchQuery(''); setActiveCategory('all'); setSearchParams({}); }} 
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md transition"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};
