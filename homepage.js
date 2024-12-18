import React, { useEffect, useState } from "react";
import axios from "axios";

const HomePage = () => {
  const [featuredRecipe, setFeaturedRecipe] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    // Fetch a featured recipe
    axios.get("http://localhost:5000/recipes")
      .then((response) => {
        if (response.data.length > 0) {
          setFeaturedRecipe(response.data[0]); // Set the first recipe as the featured recipe
        }
      })
      .catch((error) => console.error("Error fetching recipes:", error));
  }, []);

  const fetchRecipes = () => {
    axios.get("http://localhost:5000/recipes")
      .then((response) => {
        setRecipes(response.data);
        setFilteredRecipes(response.data); // Initially show all recipes
      })
      .catch((error) => console.error("Error fetching recipes:", error));
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(query) ||
      recipe.description.toLowerCase().includes(query) ||
      recipe.ingredients.some((ingredient) =>
        ingredient.toLowerCase().includes(query)
      )
    );
    setFilteredRecipes(filtered);
  };


  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/recipes/${id}`)
      .then(() => {
        // Remove the deleted recipe from the state
        setRecipes(recipes.filter((recipe) => recipe.id !== id));
        setFilteredRecipes(filteredRecipes.filter((recipe) => recipe.id !== id));
      })
      .catch((error) => console.error("Error deleting recipe:", error));
  };


  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome to the Recipe Manager App</h1>
      <p>
        This app helps you create, view, edit, and organize your favorite recipes!
      </p>
      
      <h2>Featured Recipe</h2>
      {featuredRecipe ? (
        <div>
          <h3>{featuredRecipe.name}</h3>
          <p><strong>Ingredients:</strong> {featuredRecipe.ingredients.join(", ")}</p>
          <p><strong>Steps:</strong> {featuredRecipe.steps.join(" > ")}</p>
          <p><strong>Tags:</strong> {featuredRecipe.tags.join(", ")}</p>
        </div>
      ) : (
        <p>Loading featured recipe...</p>
      )}

      <h2>My Projects</h2>
      <ul>
        <li>
          <a href="https://github.com/your-repo/project1" target="_blank" rel="noopener noreferrer">
            Project 1
          </a>
        </li>
        <li>
          <a href="https://github.com/your-repo/project2" target="_blank" rel="noopener noreferrer">
            Project 2
          </a>
        </li>
      </ul>
    </div>
  );
};

export default HomePage;
