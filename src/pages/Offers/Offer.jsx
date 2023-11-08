import { useParams } from "react-router-dom";
import "./offer.css";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Offers() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [mainPicture, setMainPicture] = useState("");
  const [productPictures, setProductPictures] = useState([]);

  const { id } = useParams();

  const fetchData = async (id) => {
    try {
      const response = await axios.get(
        `https://site--api-vinted--xqlhxl275zw4.code.run/offer/${id}`
      );
      setData(response.data.offer);
      setMainPicture(response.data.offer.product_image.url);

      if (
        Array.isArray(response.data.offer.product_pictures) &&
        response.data.offer.product_pictures.length > 0
      ) {
        setProductPictures(response.data.offer.product_pictures);
      }

      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData(id);
  }, [id]);

  console.log(data);

  const getProductDetail = (key) => {
    if (data.product_details && data.product_details.length > 0) {
      const detail = data.product_details.find((detail) => detail[key]);
      return detail ? detail[key] : "N/A";
    } else {
      return "N/A";
    }
  };

  const handleClickPicture = (picture) => {
    setMainPicture(picture);
  };

  return (
    <div className="offer">
      {!isLoading && data ? (
        <>
          <div className="offer__picture">
            <img
              className="offer__picture__mainPicture"
              src={mainPicture}
              alt="produit"
            />
            {productPictures.length > 0 && (
              <div className="offer__pictures">
                <img
                  className="offer__picture__additional"
                  src={data.product_image.url}
                  alt="produit"
                  onClick={() => handleClickPicture(data.product_image.url)}
                />
                {productPictures.map((picture, index) => (
                  <img
                    onClick={() => handleClickPicture(picture.url)}
                    key={index}
                    src={picture.url}
                    alt={` ${index + 1}`}
                    className="offer__picture__additional"
                  />
                ))}
              </div>
            )}
          </div>

          <div className="offer__infos">
            <span className="offer__infos__price">{data.product_price} €</span>
            <div className="offer__infos__main">
              <div>
                <span className="offer__infos__main__label">MARQUE:</span>
                <span>{getProductDetail("MARQUE")}</span>
              </div>
              <div>
                <span className="offer__infos__main__label">TAILLE:</span>
                <span>{getProductDetail("TAILLE")}</span>
              </div>
              <div>
                <span className="offer__infos__main__label">ÉTAT:</span>
                <span>{getProductDetail("ÉTAT")}</span>
              </div>
              <div>
                <span className="offer__infos__main__label">COULEUR:</span>
                <span>{getProductDetail("COULEUR")}</span>
              </div>
              <div>
                <span className="offer__infos__main__label">EMPLACEMENT:</span>
                <span>{getProductDetail("EMPLACEMENT")}</span>
              </div>
            </div>
            <div className="line"></div>
            <div className="offer__infos__secondary">
              {data.owner && data.owner.account ? (
                <>
                  <div className="offer__infos__secondary__user">
                    {data.owner.account.avatar && (
                      <img
                        className="offer__infos__secondary__avatar"
                        src={data.owner.account.avatar.url}
                        alt="avatar utilisateur"
                      />
                    )}
                    <span>{data.owner.account.username}</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="offer__infos__secondary__user">
                    <span>N/A</span>
                  </div>
                </>
              )}
              <div className="offer__infos__secondary__name">
                <span>{data.product_name}</span>
              </div>
              <div>
                <span>{data.product_description}</span>
              </div>
            </div>
            <div className="btn__container">
              <button className="btn-secondary offer__btn">Acheter</button>
            </div>
          </div>
        </>
      ) : (
        <p>En cours de chargement...</p>
      )}
    </div>
  );
}
