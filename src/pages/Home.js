import React, { useEffect, useState } from 'react';
import FeaturedRecipe from '../components/FeaturedRecipe';
import ProjectList from '../components/ProjectList';

const Home = () => {
  const [featuredRecipe, setFeaturedRecipe] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/recipes')
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch recipes');
        return response.json();
      })
      .then((data) => {
        if (data.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.length);
          setFeaturedRecipe(data[randomIndex]);
        } else {
          setError('No recipes available');
        }
      })
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="home-container">
      <h1>Welcome to Recipe Manager</h1>
      <p>Manage, organize, and discover recipes effortlessly.</p>
      {error && <p className="error-message">{error}</p>}
      {featuredRecipe && <FeaturedRecipe recipe={featuredRecipe} />}
      <ProjectList />
    </div>
  );
};

export default Home;
