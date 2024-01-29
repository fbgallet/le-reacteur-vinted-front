import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/img/vinted-logo.png";
import Cookies from "js-cookie";

const Header = ({ token, setToken }) => {
  const navigate = useNavigate();
  const handleSignup = () => {
    navigate("/signup");
  };
  const handleLogin = () => {
    navigate("/login");
  };
  const handleSignout = () => {
    Cookies.remove("token");
    setToken("");
    // navigate("/");
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
          <input type="text" placeholder="Recherche des articles" />
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
            <button className="light-button" onClick={handleSignout}>
              Se déconnecter
            </button>
          )}
        </div>
        <button className="dark-button">Vends tes articles</button>
      </div>
    </header>
  );
};

export default Header;
