import React, { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/recipes')
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch recipes');
        return response.json();
      })
      .then((data) => setRecipes(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div>
      <h1>Recipes</h1>
      {error && <p className="error-message">{error}</p>}
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

export default Recipes;
