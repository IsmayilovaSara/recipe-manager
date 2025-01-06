import React from 'react';

const RecipeCard = ({ recipe, onDelete, onEdit }) => {
    const tags = Array.isArray(recipe.tags) ? recipe.tags : [];
    const ingredients = Array.isArray(recipe.ingredients) ? recipe.ingredients : [];
    const steps = Array.isArray(recipe.steps) ? recipe.steps : [];

    return (
        <div className="recipe-card">
            <h2>{recipe.title}</h2>
            <p><strong>Description:</strong> {recipe.description}</p>
            <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
            <p><strong>Last Updated:</strong> {recipe.updatedAt}</p>

            <p><strong>Ingredients:</strong></p>
            <ul>
                {ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>

            <p><strong>Preparation Steps:</strong></p>
            <ol>
                {steps.map((step, index) => (
                    <li key={index}>{step}</li>
                ))}
            </ol>

            <p><strong>Tags:</strong></p>
            <div className="tags">
                {tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                ))}
            </div>

            <div className="hover-buttons">
                <button onClick={() => onEdit(recipe)}>Edit</button>
                <button onClick={() => onDelete(recipe.id)}>Delete</button>
            </div>
        </div>
    );
};

export default RecipeCard
