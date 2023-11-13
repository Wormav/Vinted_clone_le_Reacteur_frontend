import "./post.css";
import { useForm } from "react-hook-form";
import axios from "../../config/axios.config";
import { useState } from "react";
import Cookies from "js-cookie";

export default function Post() {
  const [fileCount, setFileCount] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFileChange = (event) => {
    const files = event.target.files;
    setFileCount(files.length);
    for (let i = 0; i < files.length; i++) {
      console.log(`Fichier ${i}: ${files[i].name}`);
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    if (data.picture && data.picture.length > 0) {
      for (const file of data.picture) {
        formData.append("picture", file);
      }
    }

    Object.keys(data)
      .filter((key) => key !== "picture")
      .forEach((key) => {
        formData.append(key, data[key]);
      });

    const token = Cookies.get("token");

    try {
      const response = await axios.post("/offer/publish", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Succès :", response.data);
    } catch (error) {
      console.error("Erreur :", error.response?.data || error.message);
    }
  };

  return (
    <div className="post">
      <h1>Vends ton article</h1>
      <form className="post__form" onSubmit={handleSubmit(onSubmit)}>
        <div className="post__form__section picture-section">
          <input
            type="file"
            id="file-upload"
            {...register("picture")}
            className="file-upload"
            onChange={handleFileChange}
            multiple
          />
          <label htmlFor="file-upload" className="file-upload-label label">
            {fileCount === 0
              ? "+ Ajoute des photos"
              : `${fileCount} fichier(s) sélectionné(s)`}
          </label>
        </div>
        <div className="post__form__section">
          <label className="label">
            Titre de l'article
            <input
              className={errors.title ? "input error-input" : "input"}
              {...register("title", { required: true })}
            />
            {errors.title && (
              <span className="error">Le titre est obligatoire.</span>
            )}
          </label>
          <label className="label">
            Décrit ton article
            <textarea
              className={errors.description ? "input error-input" : "input"}
              {...register("description", { required: true })}
            />
            {errors.description && (
              <span className="error">La description est obligatoire.</span>
            )}
          </label>
        </div>
        <div className="post__form__section">
          <label className="label">
            Marque
            <input className="input" {...register("brand")} />
          </label>
          <label className="label">
            Taille
            <input className="input" {...register("size")} />
          </label>
          <label className="label">
            Couleur
            <input className="input" {...register("color")} />
          </label>
          <label className="label">
            État
            <input className="input" {...register("condition")} />
          </label>
          <label className="label">
            Lieu
            <input className="input" {...register("city")} />
          </label>
        </div>
        <div className="post__form__section">
          <label className="label">
            Prix
            <input
              className={errors.price ? "input error-input" : "input"}
              type="number"
              {...register("price", { min: 1 })}
            />
            {errors.price && (
              <span className="error">
                Le prix doit être une valeur positive.
              </span>
            )}
          </label>
          <label className="label">
            Je suis intéressé(e) par les échanges
            <input type="checkbox" {...register("interestedInExchanges")} />
          </label>
        </div>
        <button className="btn-secondary" type="submit">
          Ajouter
        </button>
      </form>
    </div>
  );
}
