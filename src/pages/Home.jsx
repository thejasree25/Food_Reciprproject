import React, { useState, useEffect } from "react";
import { fetchRecipes } from "../utils/api";
import RecipeCard from "../components/RecipeCard";
import "./Home.css";
import Loader from "../components/Loader";
import RecipeModal from "../components/RecipeModal";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const [chickenRecipes, setChickenRecipes] = useState([]);
  const [soupRecipes, setSoupRecipes] = useState([]);
  const [exploraAll, setExploreAll] = useState([]);
  const [visibleCount, setVisibleCount] = useState(15);
  const [loading, setLoading] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const chicken = await fetchRecipes("chicken");
      setChickenRecipes(chicken.slice(0, 6));

      const soup = await fetchRecipes("soup");
      setSoupRecipes(soup);

      const all = await fetchRecipes("a");
      setExploreAll(all);

      setLoading(false);
    };

    fetchData();
  }, []);

  const handleSearch = async (query) => {
    setSearchQuery(query);

    if (query.trim() === "") return;

    setLoading(true);

    const result = await fetchRecipes(query);

    setRecipes(result);

    setLoading(false);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setRecipes([]);
  };

  const showMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="home-container">
        <SearchBar
          onSearch={handleSearch}
          onClear={clearSearch}
        />

        {searchQuery ? (
          <div className="section">
            <h2>Search Results for "{searchQuery}"</h2>

            {recipes.length > 0 ? (
              <div className="recipe-grid">
                {recipes.map((r) => (
                  <RecipeCard
                    key={r.idMeal}
                    recipe={r}
                    selected={setSelectedRecipe}
                  />
                ))}
              </div>
            ) : (
              <p>No Recipe Found for "{searchQuery}"</p>
            )}
          </div>
        ) : (
          <>
            <h2>Chicken Recipes</h2>

            <div className="recipe-grid">
              {chickenRecipes.map((r) => (
                <RecipeCard
                  key={r.idMeal}
                  recipe={r}
                  selected={setSelectedRecipe}
                />
              ))}
            </div>

            <div className="section">
              <h2>Soup Recipes</h2>

              <div className="recipe-grid">
                {soupRecipes.map((r) => (
                  <RecipeCard
                    key={r.idMeal}
                    recipe={r}
                    selected={setSelectedRecipe}
                  />
                ))}
              </div>
            </div>

            <div className="section">
              <h2>Explore All Recipes</h2>

              <div className="recipe-grid">
                {exploraAll.slice(0, visibleCount).map((r) => (
                  <RecipeCard
                    key={r.idMeal}
                    recipe={r}
                    selected={setSelectedRecipe}
                  />
                ))}
              </div>

              {visibleCount < exploraAll.length && (
                <button
                  className="load-more"
                  onClick={showMore}
                >
                  Show More
                </button>
              )}
            </div>
          </>
        )}
      </div>

      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </>
  );
};

export default Home;