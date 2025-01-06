import React, { useEffect, useState } from 'react';
import { getRecipes, deleteRecipe } from '../services/recipeService';
import RecipeCard from '../components/RecipeCard';
import RecipeForm from '../components/RecipeForm';
import './Recipes.css';

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCriteria, setFilterCriteria] = useState({ tag: '', difficulty: '' });
  const [sortCriteria, setSortCriteria] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadRecipes();
  }, []);

  useEffect(() => {
    applyFiltersAndSorting();
  }, [recipes, searchQuery, filterCriteria, sortCriteria]);

  const loadRecipes = async () => {
    try {
      const data = await getRecipes();
      setRecipes(data);
    } catch (err) {
      setError('Failed to fetch recipes.');
    }
  };

  const applyFiltersAndSorting = () => {
    let updatedRecipes = [...recipes];

    // Apply search
    if (searchQuery) {
      updatedRecipes = updatedRecipes.filter((recipe) =>
        recipe.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.ingredients?.some((ingredient) =>
          ingredient.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Apply filters
    if (filterCriteria.tag) {
      updatedRecipes = updatedRecipes.filter((recipe) =>
        recipe.tags?.includes(filterCriteria.tag)
      );
    }
    if (filterCriteria.difficulty) {
      updatedRecipes = updatedRecipes.filter(
        (recipe) => recipe.difficulty === filterCriteria.difficulty
      );
    }

    // Apply sorting
    if (sortCriteria === 'difficulty') {
      updatedRecipes.sort((a, b) => a.difficulty.localeCompare(b.difficulty));
    } else if (sortCriteria === 'lastUpdated') {
      updatedRecipes.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    } else if (sortCriteria === 'title') {
      updatedRecipes.sort((a, b) => a.title.localeCompare(b.title));
    }

    setFilteredRecipes(updatedRecipes);
  };

  const handleDelete = async (id) => {
    try {
      await deleteRecipe(id);
      loadRecipes();
    } catch (err) {
      setError('Failed to delete recipe.');
    }
  };

  const handleEdit = (recipe) => {
    setSelectedRecipe(recipe);
    setShowForm(true);
  };

  const handleCreate = () => {
    setSelectedRecipe(null);
    setShowForm(true);
  };

  return (
    <div className="recipes-container">
      <h1>Recipes</h1>
      {error && <p className="error-message">{error}</p>}

      {/* Filters and Actions */}
      <div className="filters-container">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Filters */}
        <select
          value={filterCriteria.tag}
          onChange={(e) =>
            setFilterCriteria({ ...filterCriteria, tag: e.target.value })
          }
        >
          <option value="">All Tags</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Dessert">Dessert</option>
          <option value="Quick Meal">Quick Meal</option>
          <option value="Main Course">Main Course</option>
        </select>

        <select
          value={filterCriteria.difficulty}
          onChange={(e) =>
            setFilterCriteria({ ...filterCriteria, difficulty: e.target.value })
          }
        >
          <option value="">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        {/* Sort Options */}
        <select
          value={sortCriteria}
          onChange={(e) => setSortCriteria(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="title">Title</option>
          <option value="lastUpdated">Last Updated</option>
          <option value="difficulty">Difficulty</option>
        </select>

        {/* Add New Recipe Button */}
        <button onClick={handleCreate}>Add New Recipe</button>
      </div>

      {showForm && (
        <RecipeForm
          recipe={selectedRecipe}
          onClose={() => {
            setShowForm(false);
            loadRecipes();
          }}
        />
      )}

      {/* Recipe Cards */}
      <div className="recipe-list">
        {filteredRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default Recipes;
