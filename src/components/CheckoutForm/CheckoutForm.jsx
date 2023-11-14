import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import "./checkoutForm.css";
import axios from "../../config/axios.config";
import Cookies from "js-cookie";

import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ data, total, setIsModalOpen, setModalMessage }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [completed, setCompleted] = useState(false);

  const navigate = useNavigate();

  const token = Cookies.get("token");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const cardElement = elements.getElement(CardElement);
    setIsModalOpen(true);
    setModalMessage("Paiement en cours... 🫸");
    try {
      const stripeResponse = await stripe.createToken(cardElement, {
        name: data._id,
      });
      const stripeToken = stripeResponse.token.id;
      const response = await axios.post(
        "/pay",
        {
          stripeToken,
          amount: total,
          title: data.product_name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.status === "succeeded") {
        setCompleted(true);

        setModalMessage("Paiement effectué ! ✅");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    } catch (err) {
      setModalMessage("Une erreur est survenue ! 🚨");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  };

  const cardElementOptions = {
    hidePostalCode: true,
  };

  return (
    <div className="checkoutForm">
      {!completed ? (
        <form className="checkoutForm__form" onSubmit={handleSubmit}>
          <CardElement options={cardElementOptions} className="input-cb" />
          <button className="btn-secondary btn-full" type="submit">
            Payer
          </button>
        </form>
      ) : (
        <span>Paiement effectué ✅ </span>
      )}
    </div>
  );
};

export default CheckoutForm;
