import { useNavigate } from "react-router-dom";
import "./card.css";

export default function Card({ offer }) {
  const productImageUrl = offer.product_image ? offer.product_image.url : null;

  const productSize = offer.product_details.find((detail) => detail.TAILLE);
  const productBrand = offer.product_details.find((detail) => detail.MARQUE);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/offer/${offer._id}`);
  };

  return (
    <div className="card" onClick={handleClick}>
      {productImageUrl ? (
        <img className="card__picture" src={productImageUrl} alt="" />
      ) : (
        <div>No product image available</div> //mettre image par défaut
      )}
      <div className="card__infos">
        <span>{offer.product_price} €</span>
        <p>{offer.product_name}</p>
        <p>{productSize ? productSize.TAILLE : "No size available"}</p>
        <p>{productBrand ? productBrand.MARQUE : "No brand available"}</p>
      </div>
    </div>
  );
}
