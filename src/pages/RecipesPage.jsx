import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { recipes } from '../data/recipes';
import { RecipeCard } from '../components/RecipeCard';

export const RecipesPage = () => {
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
    <div className="container">
      <div className="recipes-header">
        <h1>🍽 FreshBite Recipe Collection</h1>
        <p>Discover mouthwatering dishes and order fresh ingredients easily</p>
      </div>

      <div className="recipes-controls">
        <div className="search-input-wrapper">
          <i className="fas fa-search search-icon"></i>
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
            className="recipes-search-input"
          />
          {searchQuery && (
            <button 
              className="clear-search-btn"
              onClick={() => {
                setSearchQuery('');
                setSearchParams({});
              }}
            >
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>

        <div className="filter-buttons">
          {categories.map(cat => (
            <button 
              key={cat.id}
              className={activeCategory === cat.id ? 'active' : ''}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {filteredRecipes.length === 0 ? (
        <div className="no-recipes-found">
          <i className="fas fa-utensils-slash fa-3x"></i>
          <h3>No recipes found matching "{searchQuery}"</h3>
          <p>Try searching for another dish or browse all categories.</p>
          <button onClick={() => { setSearchQuery(''); setActiveCategory('all'); setSearchParams({}); }} className="btn">
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid">
          {filteredRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};
