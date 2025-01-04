import React, { useState, useEffect } from 'react';
import { addRecipe, updateRecipe } from '../services/recipeService';

const RecipeForm = ({ recipe, onClose }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        ingredients: '',
        steps: '',
        tags: '',
        difficulty: 'Easy',
    });

    useEffect(() => {
        if (recipe) {
            setFormData(recipe);
        }
    }, [recipe]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        formData.updatedAt = new Date().toLocaleString();

        if (recipe) {
            await updateRecipe(recipe.id, formData);
        } else {
            await addRecipe(formData);
        }
        onClose();
    };

    return (
        <div className="recipe-form">
            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />

                <label>Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />

                <label>Ingredients (comma-separated)</label>
                <input
                    name="ingredients"
                    value={formData.ingredients}
                    onChange={handleChange}
                    required
                />

                <label>Preparation Steps</label>
                <textarea
                    name="steps"
                    value={formData.steps}
                    onChange={handleChange}
                    required
                />

                <label>Tags (comma-separated)</label>
                <input
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                />

                <label>Difficulty</label>
                <select
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleChange}
                >
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                </select>

                <button type="submit">
                    {recipe ? 'Update Recipe' : 'Create Recipe'}
                </button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
};

export default RecipeForm;
