import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Offer from "./pages/Offer";
import Header from "./components/Header";
// import Product from "./pages/Product";
// import About from "./pages/About";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [count, setCount] = useState(0);
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        console.log("response :>> ", response.data);
        setCount(response.data.count);
        setOffers(response.data.offers);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Home isLoading={isLoading} offers={offers} setOffers={setOffers} />
          }
        />
        <Route path="/offer/:id" element={<Offer />} />
        {/* <Route path="/product/:id" element={<Product />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
