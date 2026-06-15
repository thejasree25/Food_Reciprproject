export const fetchRecipes = async (query = "") => {
  try {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch recipes");
    }

    const data = await res.json();
    return data.meals || [];
  } catch (err) {
    console.error("Error fetching data:", err);
    return [];
  }
};