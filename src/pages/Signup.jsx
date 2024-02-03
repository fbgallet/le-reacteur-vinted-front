import axios from "axios";
import { useState } from "react";
import Cookie from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

const Signup = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event, setStateCallback) => {
    setStateCallback(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!password || !username || !email) return;
      // handle form submit
      const { data } = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        { username, email, password, newsletter: false }
      );
      console.log(data);
      Cookie.set("userToken", data.token, { secure: true });
      setToken(data.token);
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="signup-page">
      <h2>S'inscrire</h2>
      <form onSubmit={handleSubmit}>
        {/* <label htmlFor="username">Username:</label> */}
        <input
          placeholder="Nom d'utilisateur"
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={(evt) => handleChange(evt, setUsername)}
        />
        {/* <label htmlFor="email">Email:</label> */}
        <input
          placeholder="Email"
          type="text"
          name="email"
          id="email"
          value={email}
          onChange={(evt) => handleChange(evt, setEmail)}
        />
        {/* <label htmlFor="password">Password:</label> */}
        <input
          placeholder="Mot de passe"
          type="password"
          name="password"
          id="pawword"
          value={password}
          onChange={(evt) => handleChange(evt, setPassword)}
        />
        <div className="newsletter">
          <div>
            <input
              type="checkbox"
              name="newsletter"
              id="newsletter"
              value={newsletter}
              onChange={(evt) => handleChange(evt, setNewsletter)}
            />
            <label htmlFor="newsletter">S'inscrire à la newsletter.</label>
          </div>
          <p>
            En m'inscrivant je confirme avoir lu et accepté les Termes &
            Conditions et Politique de Confidentialité de Vinted. Je confirme
            avoir au moins 18 ans.
          </p>
        </div>

        <button className="dark-button">S'inscrire</button>

        <Link to={"/login"}>
          <p>Tu as déjà un compte ? Connecte-toi !</p>
        </Link>
      </form>
    </div>
  );
};

export default Signup;
