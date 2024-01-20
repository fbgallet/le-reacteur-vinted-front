import Hero from "../components/Hero";
import OfferCard from "../components/OfferCard";

const Home = ({ isLoading, offers, setOffers }) => {
  return isLoading ? (
    <div>Loading data...</div>
  ) : (
    <main>
      <div className="container">
        <Hero />
        <div className="offers-list">
          {offers.map((offer) => (
            <OfferCard
              key={offer._id}
              id={offer._id}
              owner={offer.owner}
              image={offer.product_image}
              size={offer.product_details[1]["TAILLE"]}
              brand={offer.product_details[0]["MARQUE"]}
              price={offer.product_price}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Home;
