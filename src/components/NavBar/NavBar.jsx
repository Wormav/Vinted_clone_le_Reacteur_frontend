import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import SearchBar from "../SearchBar/SearchBar";
import "./navBar.css";

export default function NavBar() {
  const navigate = useNavigate();

  const handleClickLogo = () => {
    navigate("/");
  };

  return (
    <div className="navBar">
      <img
        onClick={handleClickLogo}
        className="navBar__logo"
        src={logo}
        alt="logo de vinted"
      />
      <SearchBar />
      <div className="navBar__auth">
        <button className="btn-primary">S'inscrire</button>
        <button className="btn-primary">Se connecter</button>
      </div>
      <button className="btn-secondary">Vends tes articles</button>
    </div>
  );
}
