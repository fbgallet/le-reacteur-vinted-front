import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Avatar from "../components/Avatar";

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
  }, []);

  console.log("offer :>> ", offer);

  return isLoading ? (
    <p>is loading...</p>
  ) : (
    <div className="offer">
      <div className="container">
        <img src={offer.product_image.url} alt="photo" />
        <div className="offer-content">
          <div className="price">{offer.product_price.toFixed(2)} €</div>
          <div className="offer-details">
            {offer.product_details.map((detail, index) => (
              <div key={index}>
                <span>{Object.keys(detail)[0]}</span>
                <span>{detail[Object.keys(detail)[0]]}</span>
              </div>
            ))}
          </div>
          <div className="divider"></div>
          <div>
            <p className="offer-name">{offer.product_name}</p>
            <p className="description">{offer.product_description}</p>
            <Avatar
              username={offer.owner.account.username}
              avatar={offer.owner.account.avatar?.secure_url}
              size={"medium"}
            />
          </div>
          <button className="dark-button">Acheter</button>
        </div>
      </div>
    </div>
  );
};

export default Offer;
