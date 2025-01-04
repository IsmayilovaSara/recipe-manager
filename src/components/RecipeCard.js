import React from 'react';

const RecipeCard = ({ recipe, onDelete, onEdit }) => {
    return (
        <div className="recipe-card">
            <h2>{recipe.title}</h2>
            <p>{recipe.description}</p>
            <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
            <p><strong>Last Updated:</strong> {recipe.updatedAt}</p>

            <div className="tags">
                {recipe.tags.map((tag, index) => (
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

export default RecipeCard;

