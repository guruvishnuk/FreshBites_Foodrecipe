import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { recipes } from '../data/recipes';
import { useCart } from '../context/CartContext';

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
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">Recipe Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Sorry, we couldn't find the recipe you're looking for.</p>
        <Link to="/recipes" className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">Back to Recipes</Link>
      </div>
    );
  }

  const handleCheckboxChange = (name: string) => {
    setSelectedIngredients(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const handleQuantityChange = (name: string, val: string) => {
    setIngredientQuantities(prev => ({
      ...prev,
      [name]: val
    }));
  };

  const handleSelectAll = (checked: boolean) => {
    const updated: Record<string, boolean> = {};
    recipe.ingredients.forEach(ing => {
      updated[ing.name] = checked;
    });
    setSelectedIngredients(updated);
  };

  const handleAddToCart = (e: React.FormEvent) => {
    e.preventDefault();
    const itemsToAdd: any[] = [];

    recipe.ingredients.forEach(ing => {
      if (selectedIngredients[ing.name]) {
        const qty = ingredientQuantities[ing.name] || ing.defaultQty;
        itemsToAdd.push({
          name: ing.name,
          quantity: qty,
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
    setNotification(`Added ${itemsToAdd.length} ingredient(s) to your cart!`);
    setTimeout(() => {
      navigate('/cart');
    }, 1200);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-12">
        <div className="relative h-64 md:h-96 w-full">
          <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-6 md:p-10 text-white">
            <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full w-max mb-3 uppercase tracking-wider">{recipe.category}</span>
            <h1 className="text-3xl md:text-5xl font-extrabold">{recipe.title}</h1>
          </div>
        </div>

        {recipe.youtubeUrl && (
          <div className="p-6 md:p-10 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-800 dark:text-gray-100">
              <i className="fas fa-video text-red-500"></i> Video Tutorial
            </h3>
            <div className="relative pt-[56.25%] rounded-lg overflow-hidden shadow-md bg-black">
              <iframe 
                src={recipe.youtubeUrl} 
                title={`${recipe.title} Video Tutorial`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              ></iframe>
            </div>
          </div>
        )}

        <div className="p-6 md:p-10 space-y-12">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed italic border-l-4 border-green-500 pl-4">{recipe.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-800 dark:text-gray-100">
                <i className="fas fa-list-ul text-green-500"></i> Ingredients Required
              </h3>
              <ul className="space-y-3 bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                {recipe.ingredients.map((ing, idx) => (
                  <li key={idx} className="flex justify-between items-center text-gray-700 dark:text-gray-200 border-b border-gray-200 dark:border-gray-600 last:border-0 pb-2 last:pb-0">
                    <span className="font-semibold">{ing.name}</span>
                    <span className="text-sm">{ing.defaultQty} <span className="text-gray-500 dark:text-gray-400 font-medium ml-1">(₹{ing.price})</span></span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-800 dark:text-gray-100">
                <i className="fas fa-utensils text-green-500"></i> Instructions
              </h3>
              <ol className="list-decimal list-inside space-y-4 text-gray-700 dark:text-gray-300">
                {recipe.instructions.map((step, idx) => (
                  <li key={idx} className="pl-2 leading-relaxed">
                    <span className="pl-1">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="bg-green-50 dark:bg-gray-700 rounded-xl p-6 md:p-8 border border-green-100 dark:border-gray-600 shadow-sm mt-12">
            <h3 className="text-2xl font-bold mb-2 flex items-center gap-2 text-gray-800 dark:text-gray-100">
              🛒 Buy Fresh Ingredients Online
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Select the ingredients you need and add them directly to your shopping cart!</p>
            
            {notification && (
              <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md flex items-center gap-2 font-medium">
                <i className="fas fa-check-circle"></i> {notification}
              </div>
            )}

            <form onSubmit={handleAddToCart}>
              <div className="mb-4">
                <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-semibold cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    defaultChecked={true}
                    className="w-5 h-5 text-green-600 rounded focus:ring-green-500 cursor-pointer"
                  />
                  Select / Deselect All
                </label>
              </div>

              <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-600 mb-6">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600">
                      <th className="p-4 font-semibold text-center w-20">Select</th>
                      <th className="p-4 font-semibold">Ingredient</th>
                      <th className="p-4 font-semibold">Quantity</th>
                      <th className="p-4 font-semibold">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recipe.ingredients.map((ing, idx) => (
                      <tr key={idx} className={`border-b border-gray-200 dark:border-gray-700 last:border-0 transition-colors ${selectedIngredients[ing.name] ? 'bg-green-50 dark:bg-gray-700' : 'bg-white dark:bg-gray-800'}`}>
                        <td className="p-4 text-center">
                          <input 
                            type="checkbox" 
                            checked={!!selectedIngredients[ing.name]} 
                            onChange={() => handleCheckboxChange(ing.name)}
                            className="w-5 h-5 text-green-600 rounded focus:ring-green-500 cursor-pointer"
                          />
                        </td>
                        <td className="p-4 font-medium text-gray-800 dark:text-gray-200">{ing.name}</td>
                        <td className="p-4">
                          <input 
                            type="text" 
                            value={ingredientQuantities[ing.name] || ''} 
                            onChange={(e) => handleQuantityChange(ing.name, e.target.value)}
                            placeholder={`e.g., ${ing.defaultQty}`}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none dark:bg-gray-600 dark:text-white max-w-[150px]"
                          />
                        </td>
                        <td className="p-4 font-semibold text-green-600 dark:text-green-400">₹{ing.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <button type="submit" className="w-full sm:w-auto px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-md transition flex items-center justify-center gap-2 text-lg">
                <i className="fas fa-cart-plus"></i> Add Selected to Cart
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
