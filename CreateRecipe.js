import React, { useState } from 'react';
import axios from 'axios';

function CreateRecipe() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    ingredients: '',
    preparationSteps: '',
    tags: '',
    difficulty: 'Easy',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecipe = {
      ...form,
      ingredients: form.ingredients.split(','),
      preparationSteps: form.preparationSteps.split('\n'),
      tags: form.tags.split(','),
      lastUpdated: new Date().toISOString(),
    }

    if (isUpdating) {
      // Update existing recipe
      axios
        .put(`http://localhost:3000/recipes/${recipeId}`, updatedRecipe)
        .then((response) => {
          console.log('Recipe updated successfully:', response.data);
          if (onSuccess) onSuccess();
        })
        .catch((error) => {
          console.error('Error updating recipe:', error);
        });
    } else {
      // Create new recipe
      axios
        .post('http://localhost:3000/recipes', updatedRecipe)
        .then((response) => {
          console.log('Recipe created successfully:', response.data);
          if (onSuccess) onSuccess();
        })
        .catch((error) => {
          console.error('Error creating recipe:', error);
        });
    }
  }


}
