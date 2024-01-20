import { Link } from "react-router-dom";

const OfferCard = ({ id, owner, image, size, brand, price }) => {
  return (
    <div className="offer-card">
      <div>{owner.account.username}</div>
      <Link to={`/offer/${id}`}>
        <img src={image.url} alt="photo" />
        <div className="price">{price} €</div>
        <div className="size">{size}</div>
        <div className="brand">{brand}</div>
      </Link>
    </div>
  );
};

export default OfferCard;
