import axios from "axios";
import { useState } from "react";
import Cookie from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleChange = (event, setStateCallback) => {
    setStateCallback(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!password || !email) return;
      // handle form submit
      const { data } = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        { email, password }
      );
      console.log(data);
      Cookie.set("userToken", data.token, { secure: true });
      setToken(data.token);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="login-page">
      <h2>Se connecter</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          type="text"
          name="email"
          id="email"
          value={email}
          onChange={(evt) => handleChange(evt, setEmail)}
        />
        <input
          placeholder="Mot de passe"
          type="password"
          name="password"
          id="pawword"
          value={password}
          onChange={(evt) => handleChange(evt, setPassword)}
        />

        <button className="dark-button">Se connecter</button>

        <Link to={"/signup"}>
          <p>Pas encore de compte ? Inscrits-toi !</p>
        </Link>
      </form>
    </div>
  );
};

export default Login;
