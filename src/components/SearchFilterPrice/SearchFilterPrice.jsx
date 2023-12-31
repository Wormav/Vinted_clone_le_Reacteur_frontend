import React, { useContext, useState } from "react";
import "./searchFilterPrice.css";
import { ArticlesContext } from "../../context/articlesContext";

export default function SearchFilterPrice() {
  const [isChecked, setIsChecked] = useState(false);

  const { setSort, setPage } = useContext(ArticlesContext);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    if (isChecked) {
      setSort("price-asc");
      setPage(1);
    } else {
      setSort("price-desc");
      setPage(1);
    }
  };

  return (
    <div className="searchFilterPrice">
      <p>Ordre de prix :</p>
      <div className="searchFilterPrice__input">
        <div className="checkbox-wrapper-2">
          <input
            type="checkbox"
            id="toggle"
            className="sc-gJwTLC ikxBAC"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="toggle" className="slider"></label>
        </div>
      </div>
    </div>
  );
}
