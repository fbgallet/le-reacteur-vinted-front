import Hero from "../components/Hero";
import OfferCard from "../components/OfferCard";

const Home = ({ isLoading, offers, count, page, setPage }) => {
  const nbPages = Math.ceil(count / 9);
  const pagesArray = Array.from({ length: nbPages }, (_, index) => index + 1);
  console.log("nbPages :>> ", nbPages);
  console.log("pagesArray :>> ", pagesArray);

  return isLoading ? (
    <div>Loading data...</div>
  ) : (
    <main>
      <div className="container">
        <Hero />
        <div className="pages-nav">
          <span>Page:</span>
          {pagesArray.map((pageNb, index) => (
            <span
              key={index}
              onClick={() => {
                setPage(pageNb);
              }}
            >
              {pageNb === page ? pageNb : <a>{pageNb}</a>}
            </span>
          ))}
        </div>
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
