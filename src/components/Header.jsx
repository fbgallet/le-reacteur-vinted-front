import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/img/vinted-logo.png";
import Cookies from "js-cookie";
import PriceRange from "./PriceRange";
import Switch from "react-switch";

const Header = ({
  token,
  setToken,
  searchString,
  setSearchString,
  range,
  setRange,
  descendingSort,
  setDescendingSort,
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

  const handleSort = (nextChecked) => {
    setDescendingSort(nextChecked);
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
          <div className="filters">
            <label>
              <span>Prix:</span>
              <Switch
                onChange={handleSort}
                checked={descendingSort === null ? false : descendingSort}
                className="react-switch"
                onColor=" #42d6e1"
                onHandleColor="#2bb1ba"
                offHandleColor="#2bb1ba"
                checkedHandleIcon={
                  <div
                    style={{
                      display: "flex",
                      paddingBottom: "7px",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                      color: "white",
                      fontSize: 24,
                    }}
                  >
                    ⬊
                  </div>
                }
                uncheckedHandleIcon={
                  <div
                    style={{
                      display: "flex",
                      paddingBottom: "7px",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                      color: "white",
                      fontSize: 24,
                    }}
                  >
                    ⬈
                  </div>
                }
                uncheckedIcon={false}
                checkedIcon={false}
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                handleDiameter={25}
                height={25}
                width={40}
              />
            </label>
            <PriceRange range={range} setRange={setRange} />
          </div>
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
