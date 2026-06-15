import React from "react";
import "./styles/RecipeCard.css";

const RecipeCard = ({ recipe, selected }) => {
  if (!recipe) return null;

  return (
    <div className="recipe-card" onClick={() => selected(recipe)}>
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
      />
      <h3>{recipe.strMeal}</h3>
      <p>{recipe.strCategory}</p>
    </div>
  );
};

export default RecipeCard;