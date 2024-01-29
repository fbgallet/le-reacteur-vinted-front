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
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Cookies from "js-cookie";

function App() {
  const [token, setToken] = useState(Cookies.get("userToken" || ""));
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers?page=${page}&limit=10`
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
  }, [page]);

  return (
    <Router>
      <Header token={token} setToken={setToken} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              isLoading={isLoading}
              offers={offers}
              count={count}
              page={page}
              setPage={setPage}
            />
          }
        />
        <Route path="/offer/:id" element={<Offer />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
