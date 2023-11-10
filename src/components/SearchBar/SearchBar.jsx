import React, { useState, useContext } from "react";
import { ArticlesContext } from "../../context/articlesContext";
import "./searchBar.css";

export default function SearchBar() {
  const [input, setInput] = useState("");
  const { setTitle } = useContext(ArticlesContext);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInput(value);
    setTitle(value);
  };

  return (
    <div className="searchBar">
      <input
        className="searchBar__input"
        type="text"
        placeholder="🔎 Recherche des articles"
        value={input}
        onChange={handleInputChange}
      />
    </div>
  );
}
