import React from 'react';
import './FeaturedRecipe.css';

const FeaturedRecipe = ({ recipe }) => {
  // Check if recipe is undefined or null
  if (!recipe) {
    return <p>No recipe selected.</p>;
  }

  // Ensure ingredients is an array
  const ingredients = Array.isArray(recipe.ingredients) ? recipe.ingredients : [];

  return (
    <div className="featured-recipe">
      <h2>Popular Recipe</h2>
      <h3>{recipe.name}</h3>
      <p>{recipe.description}</p>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
    </div>
  );
};

export default FeaturedRecipe;
