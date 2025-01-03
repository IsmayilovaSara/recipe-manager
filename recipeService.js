import axios from 'axios';

const API_URL = 'http://localhost:3000/recipes';

export const getRecipes = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const addRecipe = async (recipe) => {
    const response = await axios.post(API_URL, recipe);
    return response.data;
};

export const updateRecipe = async (id, recipe) => {
    const response = await axios.put(`${API_URL}/${id}`, recipe);
    return response.data;
};

export const deleteRecipe = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};
