import "./css/App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Offer from "./pages/Offer";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Cookies from "js-cookie";
import Publish from "./pages/Publish";
import Payment from "./pages/Payment";

function App() {
  const [token, setToken] = useState(Cookies.get("userToken" || ""));
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchString, setSearchString] = useState("");
  const [range, setRange] = useState([0, 100]);
  const [descendingSort, setDescendingSort] = useState(null);

  // console.log("count :>> ", count);
  // console.log("offers :>> ", offers);
  // console.log(searchString);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers?page=${page}&limit=10${
            // mon backend, pour l'instant ça ne colle pas...
            //`https://site--vinted-replica-back--2bhrm4wg9nqn.code.run/offers?page=${page}&limit=10${
            searchString ? "&title=" + searchString : ""
          }${range[0] ? "&priceMin=" + range[0] : ""}${
            "&priceMax=" + range[1]
          }${
            descendingSort !== null
              ? descendingSort
                ? "&sort=price-desc"
                : "&sort=price-asc"
              : ""
          }`
        );
        console.log("response :>> ", response.data);
        setCount(response.data.count);
        setOffers(response.data.offers);
        // with my back
        // setCount(response.data.length);
        // setOffers(response.data);

        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [page, searchString, range, descendingSort]);

  return (
    <Router>
      <Header
        token={token}
        setToken={setToken}
        searchString={searchString}
        setSearchString={setSearchString}
        range={range}
        setRange={setRange}
        descendingSort={descendingSort}
        setDescendingSort={setDescendingSort}
      />
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
        <Route path="/offer/:id" element={<Offer token={token} />} />
        <Route path="/signup" element={<Signup setToken={setToken} />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/publish" element={<Publish token={token} />} />
        <Route path="/payment" element={<Payment token={token} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
