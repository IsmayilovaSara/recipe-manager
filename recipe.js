import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Recipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/recipes')
      .then(response => setRecipes(response.data))
      .catch(error => console.error('Error fetching recipes:', error));
  }, []);

  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        {recipes.map(recipe => (
          <li key={recipe.id}>
            <h2>{recipe.title}</h2>
            <p>{recipe.description}</p>
            <p>Difficulty: {recipe.difficulty}</p>
            <p>Last Updated: {new Date(recipe.lastUpdated).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Recipes;
