import bannier from "../../assets/banner-wide.jpg";
import svg from "../../assets/tear.svg";
import "./header.css";

export default function Header() {
  return (
    <div className="header">
      <img
        className="header__picture"
        src={bannier}
        alt="Bannière représentant une cliente contente"
      />
      <img className="header__tear" src={svg} alt="Déchirure" />
    </div>
  );
}
