import React from 'react';
import { Link } from 'react-router-dom';
import { recipes } from '../data/recipes';
import { RecipeCard } from '../components/RecipeCard';
import { Slideshow } from '../components/Slideshow';

export const HomePage: React.FC = () => {
  const popularRecipes = recipes.filter(r => r.popular).slice(0, 6);

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <video autoPlay muted loop playsInline className="absolute w-full h-full object-cover z-0">
          <source src="/video/2583492-hd_1920_1080_24fps.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
        <div className="relative z-20 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Cook it. Love it. Share it.</h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">Explore easy-to-follow recipes and order fresh ingredients online with one click.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/recipes" className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-md font-semibold transition flex items-center justify-center gap-2">
              <i className="fas fa-search"></i> Explore Recipes
            </Link>
            <Link to="/cart" className="px-6 py-3 bg-white hover:bg-gray-100 text-gray-900 rounded-md font-semibold transition flex items-center justify-center gap-2">
              <i className="fas fa-shopping-cart"></i> View Cart
            </Link>
          </div>
        </div>
      </section>

      <div className="py-8">
        <Slideshow />
      </div>

      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-2 text-gray-800 dark:text-gray-100">
          <i className="fas fa-star text-yellow-400"></i> Popular Recipes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>

      <section className="bg-green-50 dark:bg-gray-800 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100">
            <i className="fas fa-quote-left text-green-500 mr-2"></i> What Our Foodies Say
          </h2>
          <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md italic text-gray-700 dark:text-gray-300">
            <p className="text-xl mb-6">"FreshBite has made my cooking so much easier! I love how I can find a recipe and instantly shop the exact fresh ingredients delivered to my doorstep."</p>
            <div className="font-semibold not-italic text-green-600 dark:text-green-400">– Ananya Sharma, Home Chef</div>
          </div>
        </div>
      </section>
    </div>
  );
};
