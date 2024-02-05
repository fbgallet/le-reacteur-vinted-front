import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Avatar from "../components/Avatar";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Offer = ({ token }) => {
  const [offer, setOffer] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  // console.log("id", id);
  const navigate = useNavigate();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    token
      ? navigate("/payment", { state: { offer } })
      : navigate("/login", { state: { from: `/offer/${id}` } });
  };

  console.log("offer :>> ", offer);

  return isLoading ? (
    <p>is loading...</p>
  ) : (
    <div className="offer">
      <div className="container">
        {offer.product_pictures.length === 1 ? (
          <img src={offer.product_image.url} alt="photo" />
        ) : (
          <div className="images-caroussel">
            <Carousel
              swipeable={true}
              draggable={false}
              showDots={true}
              responsive={responsive}
              ssr={true} // means to render carousel on server-side.
              infinite={true}
              keyBoardControl={true}
              customTransition="all .5"
              transitionDuration={500}
              containerClass="carousel-container"
              removeArrowOnDeviceType={["tablet", "mobile"]}
            >
              {offer.product_pictures.map((image) => (
                <div>
                  <img src={image.secure_url} alt="offer picture" />
                </div>
              ))}
            </Carousel>
          </div>
        )}
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
          <button className="dark-button" onClick={handleSubmit}>
            Acheter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Offer;
