import { Link } from "react-router-dom";
import Avatar from "./Avatar";

const OfferCard = ({ id, owner, image, size, brand, price }) => {
  return (
    <div className="offer-card">
      <Avatar
        username={owner.account.username}
        avatar={owner.account.avatar?.secure_url}
        size={"small"}
      />
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
