import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import Cookies from "js-cookie";
import axios from "axios";

const CheckoutForm = ({ title, price }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const cardElement = elements.getElement(CardElement);

    try {
      const stripeResponse = await stripe.createToken(cardElement, {
        name: Cookies.get("userName"),
      });
      console.log("stripeResponse :>> ", stripeResponse);
      const stripeToken = stripeResponse.token?.id;

      if (stripeResponse.token) {
        const { data } = await axios.post(
          // Le Reacteur route
          //"https://lereacteur-vinted-api.herokuapp.com/payment",
          // My backend route
          "https://site--vinted-replica-back--2bhrm4wg9nqn.code.run/payment",
          {
            token: stripeToken,
            title: title,
            amount: price,
          }
        );
        console.log(data);
        // Si la réponse du serveur est favorable, la transaction a eu lieu
        if (data.status === "succeeded") {
          setCompleted(true);
        } else {
          alert(
            "La transaction n'a pas pu s'effectuer correctement (mais on a gardé l'argent quand même, désolé 😎)"
          );
        }
      } else {
        alert(stripeResponse.error.message);
      }
    } catch (error) {
      console.log("Stripe token error: ", error.response);
    }
  };

  return (
    <>
      {!completed ? (
        <form onSubmit={handleSubmit} className="payment-form">
          <CardElement />
          <button type="submit" className="dark-button">
            Payer
          </button>
        </form>
      ) : (
        <span>Paiement effectué avec succès ✅! </span>
      )}
    </>
  );
};

export default CheckoutForm;
