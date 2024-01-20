import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Offer = () => {
  const [offer, setOffer] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  // console.log("id", id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        setOffer(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
    console.log("offer :>> ", offer);
  }, []);

  return isLoading ? (
    <p>is loading...</p>
  ) : (
    <div className="offer">
      <div className="container">
        <img src={offer.product_image.url} alt="photo" />
        <div className="offer-content">
          <div className="price">{offer.product_price} €</div>
          <div className="offer-details">
            {offer.product_details.map((detail, index) => (
              <div key={index}>
                <span>{Object.keys(detail)[0]}</span>
                <span>{detail[Object.keys(detail)[0]]}</span>
              </div>
            ))}
          </div>
          <div className="offer-name">{offer.product_name}</div>
          <div className="description">{offer.product_description}</div>
          <div className="username">{offer.owner.account.username}</div>
          {/* 20 €

Tailleur pantalon Ikito

très bien coupé pantalon droit avec poches qui arrive aux chevilles et se ferme par un zip discret veste cintrée avec gros boutons métallisés taille 36 marque Ikito, vintage, qui n’existe plus :) marron chiné

Tailleur pantalon Ikito
Monica.Jaskolski */}
        </div>
      </div>
    </div>
  );
};

export default Offer;
