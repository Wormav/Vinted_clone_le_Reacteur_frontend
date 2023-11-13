import "./post.css";
import { useForm } from "react-hook-form";
import axios from "../../config/axios.config";
import { useContext, useState } from "react";
import Cookies from "js-cookie";
import SubmissionModal from "../../components/SubmissionModal/SubmissionModal";
import { ArticlesContext } from "../../context/articlesContext";
import { useDropzone } from "react-dropzone";

export default function Post() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { update, setUpdate } = useContext(ArticlesContext);

  const { getRootProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setSelectedFiles([...selectedFiles, ...acceptedFiles]);
    },
  });

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
  };

  const onSubmit = async (data) => {
    setIsModalOpen(true);
    setModalMessage("Envoi en cours... 🫸");
    const formData = new FormData();

    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("picture", selectedFiles[i]);
    }

    Object.keys(data)
      .filter((key) => key !== "picture")
      .forEach((key) => {
        formData.append(key, data[key]);
      });

    const token = Cookies.get("token");

    try {
      await axios.post("/offer/publish", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setModalMessage("Annonce postée ✅");
      setUpdate(!update);
    } catch (error) {
      console.error(error);
      setModalMessage("Erreur lors de l'envoi 🚨");
    }
  };

  return (
    <div className="post" onClick={() => setIsModalOpen(false)}>
      <h1>Vends ton article</h1>
      <form className="post__form" onSubmit={handleSubmit(onSubmit)}>
        <div
          {...getRootProps()}
          className="post__form__section picture-section"
        >
          <input
            {...getRootProps()}
            type="file"
            id="file-upload"
            {...register("picture")}
            className="file-upload"
            onChange={handleFileChange}
            multiple
          />
          <label htmlFor="file-upload" className="file-upload-label label">
            {selectedFiles.length === 0
              ? "+ Ajoute des photos"
              : `${selectedFiles.length} fichier(s) sélectionné(s)`}
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
      <SubmissionModal isOpen={isModalOpen} message={modalMessage} />
    </div>
  );
}
