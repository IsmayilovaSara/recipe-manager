import React, { useEffect, useState } from 'react';
import { getRecipes, deleteRecipe } from '../services/recipeService';
import RecipeCard from '../components/RecipeCard';
import RecipeForm from '../components/RecipeForm';

const Recipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        loadRecipes();
    }, []);

    const loadRecipes = async () => {
        const data = await getRecipes();
        setRecipes(data);
    };

    const handleDelete = async (id) => {
        await deleteRecipe(id);
        loadRecipes();
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
        <div>
            <h1>Recipes</h1>
            <button onClick={handleCreate}>Add New Recipe</button>
            
            {showForm && (
                <RecipeForm
                    recipe={selectedRecipe}
                    onClose={() => {
                        setShowForm(false);
                        loadRecipes();
                    }}
                />
            )}

            <div className="recipe-list">
                {recipes.map((recipe) => (
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

