import React from "react";
import "./styles/Navbar.css";

const Navbar = ({ toggleDarkMode, darkMode }) => {
  return (
    <div className="navbar">
      <h1 className="logo">Food Recipes</h1>

      <button
        onClick={toggleDarkMode}
        className="dark-btn"
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </div>
  );
};

export default Navbar;