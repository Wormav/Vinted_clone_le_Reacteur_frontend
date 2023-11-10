import React, { useState, useContext } from "react";
import { ArticlesContext } from "../../context/articlesContext";
import "./searchBar.css";

export default function SearchBar() {
  const [input, setInput] = useState("");
  const { setUrl, setPage } = useContext(ArticlesContext);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInput(value);
    if (value.trim() === "") {
      setPage(1);
      setUrl(`https://site--api-vinted--xqlhxl275zw4.code.run/offer?page=1`);
    } else {
      setUrl(
        `https://site--api-vinted--xqlhxl275zw4.code.run/offer?title=${value}`
      );
    }
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
