import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/img/vinted-logo.png";
import Cookies from "js-cookie";
import PriceRange from "./PriceRange";

const Header = ({
  token,
  setToken,
  searchString,
  setSearchString,
  range,
  setRange,
}) => {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    setSearchString(e.target.value);
  };

  const handleSignup = () => {
    navigate("/signup");
  };
  const handleLogin = () => {
    navigate("/login");
  };
  const handleSignout = () => {
    Cookies.remove("userToken");
    Cookies.remove("userName");
    setToken("");
    // navigate("/");
  };
  const handlePublish = () => {
    navigate("/publish");
  };

  return (
    <header>
      <div className="container">
        <div className="logo">
          <Link to={"/"}>
            {" "}
            <img src={logo} alt="logo" />{" "}
          </Link>
        </div>
        <div className="search">
          <input
            type="text"
            placeholder="Recherche des articles"
            value={searchString}
            onChange={handleSearch}
          />
          <PriceRange range={range} setRange={setRange} />
        </div>

        <div className="login">
          {!token ? (
            <>
              <button className="light-button" onClick={handleSignup}>
                S'inscrire
              </button>
              <button className="light-button" onClick={handleLogin}>
                Se connecter
              </button>
            </>
          ) : (
            <button className="red-button" onClick={handleSignout}>
              Se déconnecter
            </button>
          )}
        </div>
        <button className="dark-button" onClick={handlePublish}>
          Vends tes articles
        </button>
      </div>
    </header>
  );
};

export default Header;
