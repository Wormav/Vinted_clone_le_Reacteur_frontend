import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import SearchBar from "../SearchBar/SearchBar";
import "./navBar.css";
import { AuthContext } from "../../context/userContext";
import SearchFilterPrice from "../SearchFilterPrice/SearchFilterPrice";
import SearchFilterSlider from "../SearchFilterSlider/SearchFilterSlider";

export default function NavBar() {
  const navigate = useNavigate();
  const { isAuthenticated, handleLogout } = useContext(AuthContext);

  const handleClickLogo = () => {
    navigate("/");
  };

  const handleClickSignin = () => {
    navigate("/signin");
  };

  const handleClickSignup = () => {
    navigate("/signup");
  };

  const handleClickLogout = () => {
    handleLogout();
    navigate("/");
  };

  const handleClickPost = () => {
    if (isAuthenticated) {
      navigate("/post");
    } else {
      navigate("/signin");
    }
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
      <SearchFilterSlider />
      <SearchFilterPrice />
      <div className="navBar__auth">
        {isAuthenticated ? (
          <button onClick={handleClickLogout} className="btn-danger">
            Déconnexion
          </button>
        ) : (
          <>
            <button onClick={handleClickSignup} className="btn-primary">
              S'inscrire
            </button>
            <button onClick={handleClickSignin} className="btn-primary">
              Se connecter
            </button>
          </>
        )}
      </div>
      <button onClick={handleClickPost} className="btn-secondary">
        Vends tes articles
      </button>
    </div>
  );
}
