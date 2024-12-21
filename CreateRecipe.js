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
    };
