import "./searchBar.css";

export default function SearchBar() {
  return (
    <div className="searchBar">
      <input
        className="searchBar__input"
        type="text"
        placeholder="🔎 Recherche des articles"
      />
    </div>
  );
}
