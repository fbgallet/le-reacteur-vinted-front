import axios from "axios";
import { useState } from "react";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
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
      if (!password || !name || !email) return;
      // handle form submit
      const { data } = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        { username: name, email, password, newsletter: false }
      );
      console.log(data);
      Cookie.set("userToken", data.token, { secure: true });
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="login-page">
      <h2>S'inscrire</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          placeholder="Jean Dupont"
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(evt) => handleChange(evt, setName)}
        />
        <label htmlFor="email">Email:</label>
        <input
          placeholder="Email"
          type="text"
          name="email"
          id="email"
          value={email}
          onChange={(evt) => handleChange(evt, setEmail)}
        />
        <label htmlFor="password">Password:</label>
        <input
          placeholder="Password"
          type="password"
          name="password"
          id="pawword"
          value={password}
          onChange={(evt) => handleChange(evt, setPassword)}
        />
        <input
          type="checkbox"
          name="newsletter"
          id="newsletter"
          value={newsletter}
          onChange={(evt) => handleChange(evt, setNewsletter)}
        />
        <label htmlFor="newsletter">S'inscrire à la newsletter.</label>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Signup;
