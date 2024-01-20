import { Link } from "react-router-dom";
import logo from "../assets/img/vinted-logo.png";

const Header = () => {
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
          Search
          <input type="text" placeholder="Recherche des articles" />
        </div>
        <div className="login">
          <button className="light-button">S'inscrire</button>
          <button className="light-button">Se connecter</button>
        </div>
        <button className="dark-button">Vends tes articles</button>
      </div>
    </header>
  );
};

export default Header;
