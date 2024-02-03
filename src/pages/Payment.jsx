import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe(
  // Le Reacteur test public key
  //   "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
  // My public key
  "pk_test_51KGNSmAJ6wOKBf79Ygfupxry3TuPQTkOWrhN7tplMKHYEZSLwfWvuUPOeYZuosocWPtr9Sw3nUGCihUc1XsOhZnz00D3l0S5Hu"
);
const shippingFees = 0.8;
const protectionFees = 0.4;

const Payment = ({ token }) => {
  const [total, setTotal] = useState(0);
  const [user, setUser] = useState({});

  const location = useLocation();
  const offer = location.state.offer;

  useEffect(() => {
    setTotal((offer.product_price + shippingFees + protectionFees).toFixed(2));
  }, []);

  console.log(offer.product_price);

  return token && offer ? (
    <div className="payment">
      <div className="container">
        <h3>Résumé de la commande</h3>
        <div className="price-detail">
          <div>
            <span>Commande</span>
            <span>{offer.product_price.toFixed(2).replace(".", ",")} €</span>
          </div>
          <div>
            <span>Frais de protection acheteur</span>
            <span>{protectionFees.toFixed(2).replace(".", ",")} €</span>
          </div>
          <div>
            <span>Frais de port</span>
            <span>{shippingFees.toFixed(2).replace(".", ",")} €</span>
          </div>
        </div>
        <div className="price-total">
          <span>Total</span>
          <span>{total && total.toString().replace(".", ",")} €</span>
        </div>
        <p>
          Il ne vous reste plus qu'une étape pour vous offrir{" "}
          <strong>{offer.product_name}</strong>. Vous allez payer{" "}
          <strong>{total} €</strong>. (frais de protection et frais de port
          inclus)
        </p>
        <Elements stripe={stripePromise}>
          <CheckoutForm
            title={offer.product_name}
            price={offer.product_price}
          />
        </Elements>
      </div>
    </div>
  ) : (
    <Navigate to="/" />
  );
};

export default Payment;
