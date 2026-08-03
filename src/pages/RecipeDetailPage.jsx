import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { recipes } from '../data/recipes';
import { useCart } from '../context/CartContext';

export const RecipeDetailPage = () => {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const recipe = recipes.find(r => r.id === recipeId);

  // Initialize selected state for ingredients
  const [selectedIngredients, setSelectedIngredients] = useState({});
  const [ingredientQuantities, setIngredientQuantities] = useState({});
  const [notification, setNotification] = useState('');

  useEffect(() => {
    if (recipe && recipe.ingredients) {
      const initialSelected = {};
      const initialQuantities = {};
      recipe.ingredients.forEach(ing => {
        initialSelected[ing.name] = true; // Selected by default
        initialQuantities[ing.name] = ing.defaultQty;
      });
      setSelectedIngredients(initialSelected);
      setIngredientQuantities(initialQuantities);
    }
  }, [recipe]);

  if (!recipe) {
    return (
      <div className="container text-center" style={{ padding: '4rem 1rem' }}>
        <h2>Recipe Not Found</h2>
        <p>Sorry, we couldn't find the recipe you're looking for.</p>
        <br />
        <Link to="/recipes" className="btn">Back to Recipes</Link>
      </div>
    );
  }

  const handleCheckboxChange = (name) => {
    setSelectedIngredients(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const handleQuantityChange = (name, val) => {
    setIngredientQuantities(prev => ({
      ...prev,
      [name]: val
    }));
  };

  const handleSelectAll = (checked) => {
    const updated = {};
    recipe.ingredients.forEach(ing => {
      updated[ing.name] = checked;
    });
    setSelectedIngredients(updated);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    const itemsToAdd = [];

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
    <div className="recipe-detail-page">
      <div className="recipe-container">
        <div className="recipe-header-image">
          <img src={recipe.image} alt={recipe.title} className="recipe-img" />
          <div className="recipe-header-overlay">
            <span className="category-badge">{recipe.category}</span>
            <h1>{recipe.title}</h1>
          </div>
        </div>

        {recipe.youtubeUrl && (
          <div className="recipe-video">
            <h3><i className="fas fa-video"></i> Video Tutorial</h3>
            <div className="video-responsive">
              <iframe 
                src={recipe.youtubeUrl} 
                title={`${recipe.title} Video Tutorial`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}

        <div className="recipe-content">
          <p className="recipe-lead-description">{recipe.description}</p>

          <div className="recipe-section">
            <h3><i className="fas fa-list-ul"></i> Ingredients Required:</h3>
            <ul className="ingredients-list">
              {recipe.ingredients.map((ing, idx) => (
                <li key={idx}>
                  <strong>{ing.name}</strong> - {ing.defaultQty} (₹{ing.price})
                </li>
              ))}
            </ul>
          </div>

          <div className="recipe-section">
            <h3><i className="fas fa-utensils"></i> Step-by-Step Instructions:</h3>
            <ol className="instructions-list">
              {recipe.instructions.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
          </div>

          <div className="recipe-section buy-ingredients-section">
            <h3>🛒 Buy Fresh Ingredients Online</h3>
            <p>Select the ingredients you need and add them directly to your shopping cart!</p>
            
            {notification && (
              <div className="alert-success">
                <i className="fas fa-check-circle"></i> {notification}
              </div>
            )}

            <form onSubmit={handleAddToCart} className="buy-ingredients-form">
              <div className="select-all-bar">
                <label>
                  <input 
                    type="checkbox" 
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    defaultChecked={true}
                  />
                  Select / Deselect All
                </label>
              </div>

              <table className="ingredients-table">
                <thead>
                  <tr>
                    <th>Select</th>
                    <th>Ingredient</th>
                    <th>Custom Quantity</th>
                    <th>Price (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {recipe.ingredients.map((ing, idx) => (
                    <tr key={idx} className={selectedIngredients[ing.name] ? 'selected-row' : ''}>
                      <td className="text-center">
                        <input 
                          type="checkbox" 
                          checked={!!selectedIngredients[ing.name]} 
                          onChange={() => handleCheckboxChange(ing.name)}
                        />
                      </td>
                      <td><strong>{ing.name}</strong></td>
                      <td>
                        <input 
                          type="text" 
                          value={ingredientQuantities[ing.name] || ''} 
                          onChange={(e) => handleQuantityChange(ing.name, e.target.value)}
                          placeholder={`e.g., ${ing.defaultQty}`}
                        />
                      </td>
                      <td>₹{ing.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="cart-action-bar">
                <button type="submit" className="cart-button">
                  <i className="fas fa-cart-plus"></i> Add Selected Ingredients to Cart
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
