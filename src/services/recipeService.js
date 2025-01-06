import axios from 'axios';

const API_URL = 'http://localhost:3000/recipes';

export const getRecipes = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching recipes:', error);
        throw error;
    }
};

export const addRecipe = async (recipe) => {
    try {
        const response = await axios.post(API_URL, recipe);
        return response.data;
    } catch (error) {
        console.error('Error adding recipe:', error);
        throw error;
    }
};

export const updateRecipe = async (id, recipe) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, recipe);
        return response.data;
    } catch (error) {
        console.error('Error updating recipe:', error);
        throw error;
    }
};

export const deleteRecipe = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error('Error deleting recipe:', error);
        throw error;
    }
};
