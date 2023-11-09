import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { AuthContext } from "../../context/userContext";

// css du fichier Signin.css

export default function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    newsletter: false,
  });
  const [alert, setAlert] = useState("");

  const { handleSignin } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, type, checked } = e.target;
    const val = type === "checkbox" ? checked : e.target.value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? (checked ? true : false) : val,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert("");

    if (!formData.email || !formData.username || !formData.password) {
      setAlert("Veuillez remplir tous les champs.");
      return;
    }

    try {
      const response = await axios.post(
        "https://site--api-vinted--xqlhxl275zw4.code.run/user/signup",
        formData
      );

      const { token } = response.data;

      Cookies.set("token", token, { expires: 7 });

      handleSignin();
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la requête:", error);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setAlert(error.response.data.message);
      } else {
        setAlert(
          "Une erreur s'est produite lors de l'inscription. Veuillez réessayer."
        );
      }
    }
  };

  return (
    <div className="signin">
      <h2>S'inscrire</h2>
      <form className="signin__form" onSubmit={handleSubmit}>
        <input
          className="signin__form__input"
          type="text"
          placeholder="Nom d'utilisateur"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          className="signin__form__input"
          type="email"
          placeholder="Adresse email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          className="signin__form__input"
          type="password"
          placeholder="Mot de passe"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <input
          className="signin__form__input"
          type="checkbox"
          name="newsletter"
          checked={formData.newsletter}
          onChange={handleChange}
        />
        <p className="news">S'inscrire à notre newsletter</p>
        <button className="btn-secondary" type="submit">
          S'inscrire
        </button>
        {alert && <p className="alert">{alert}</p>}
        <Link to={"/signin"} className="signin__link">
          Pas encore de compte ? Inscris-toi !
        </Link>
      </form>
    </div>
  );
}
