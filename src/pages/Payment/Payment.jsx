import { useNavigate, useParams } from "react-router-dom";
import "./payment.css";
import axios from "../../config/axios.config";
import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import Cookies from "js-cookie";
import SubmissionModal from "../../components/SubmissionModal/SubmissionModal";

export default function Payment() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [buyerProtection] = useState(1);
  const [shippingFees] = useState(3);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  const fetchData = async (id) => {
    try {
      const response = await axios.get(`/offer/${id}`);
      setData(response.data.offer);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const token = Cookies.get("token");

  useEffect(() => {
    if (!token) {
      navigate("/signin");
    }
  }, [navigate, token]);

  useEffect(() => {
    fetchData(id);
  }, [id]);

  const stripePromise = loadStripe(
    `${import.meta.env.VITE_API_PUBLISHABLE_KEY_STRIPE}`
  );

  return (
    <div className="payment">
      {!isLoading && data ? (
        <div className="payment__container">
          <div className="payment__container__resume">
            <p className="resume">Résumé de la commande</p>
            <div className="payment__container__resume__line">
              <span className="details">Commande</span>
              <span className="details">{data.product_price} €</span>
            </div>
            <div className="payment__container__resume__line">
              <span className="details">Frais protection acheteurs</span>
              <span className="details">{buyerProtection} €</span>
            </div>
            <div className="payment__container__resume__line">
              <span className="details">Frais de port</span>
              <span className="details">{shippingFees} €</span>
            </div>
          </div>
          <div className="payment__container__total">
            <div className="payment__container__total__line">
              <span>Total</span>
              <span>
                {data.product_price + buyerProtection + shippingFees} €
              </span>
            </div>
            <div className="payment__container__total__line">
              <p>
                {`Il ne vous reste plus qu'un étape pour vous offrir Mes chats.
                Vous allez payer ${
                  data.product_price + buyerProtection + shippingFees
                } € (frais de protection et frais de port
                inclus).`}
              </p>
            </div>
          </div>
          <div className="payment__container__stripe">
            <Elements stripe={stripePromise}>
              <CheckoutForm
                data={data}
                total={data.product_price + buyerProtection + shippingFees}
                setIsModalOpen={setIsModalOpen}
                setModalMessage={setModalMessage}
              />
            </Elements>
          </div>
          <SubmissionModal
            isOpen={isModalOpen}
            message={modalMessage}
            btn={false}
          />
        </div>
      ) : (
        <p>En cours de chargement...</p>
      )}
    </div>
  );
}
