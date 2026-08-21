import React from 'react';
import { Link } from 'react-router-dom';

interface Recipe {
  id: string | number;
  title: string;
  image: string;
  category: string;
  description: string;
}

interface RecipeCardProps {
  recipe: Recipe;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <div className="relative h-48 overflow-hidden group">
        <img 
          src={recipe.image} 
          alt={recipe.title} 
          loading="lazy" 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
          {recipe.category}
        </span>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">{recipe.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm flex-grow mb-4 line-clamp-3">
          {recipe.description}
        </p>
        <Link 
          to={`/recipe/${recipe.id}`} 
          className="inline-block mt-auto text-center px-4 py-2 bg-green-50 dark:bg-gray-700 text-green-600 dark:text-green-400 font-semibold rounded-md hover:bg-green-100 dark:hover:bg-gray-600 transition"
        >
          View Recipe <i className="fas fa-arrow-right ml-1"></i>
        </Link>
      </div>
    </div>
  );
};
