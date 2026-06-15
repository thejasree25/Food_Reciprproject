import React, { useState } from "react";
import "./styles/SearchBar.css";

const SearchBar = ({ onSearch, onClear }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query.trim() === "") return;

    console.log(query);

    onSearch(query);
  };

  const handleClear = () => {
    setQuery("");
    onClear();
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for a recipe..."
        className="search-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button type="submit" className="search-btn">
        Search
      </button>

      {query && (
        <button
          type="button"
          className="clear-btn"
          onClick={handleClear}
        >
          Clear
        </button>
      )}
    </form>
  );
};

export default SearchBar;