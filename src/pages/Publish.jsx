import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router-dom";

const Publish = ({ token }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [place, setPlace] = useState("");
  const [price, setPrice] = useState(0);
  const [exchange, setExchange] = useState(false);
  const navigate = useNavigate();

  // console.log("token on Publish page:>> ", token);

  const handleChange = (event, setStateCallback) => {
    setStateCallback(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!file || !description || !title || !price) return;
      // handle form submit

      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("condition", condition);
      formData.append("city", place);
      formData.append("price", price);
      formData.append("picture", file);
      // TODO add exchange key in backend
      //formData.append("exchange", exchange);

      // for (const entrie of formData) {
      //   console.log(entrie);
      // }

      try {
        const response = await axios.post(
          "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
          formData,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Offer published: ", JSON.stringify(response.data));
      } catch (err) {
        if (err.response.status === 500) {
          console.error("An error occurred");
        } else {
          console.error(err.response.data.msg);
        }
      }

      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return token ? (
    <div className="publish-page">
      <div className="container">
        <h2>
          {Cookies.get("userName")}, présente soigneusement ton article à vendre
          !
        </h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Ajoute une photo
              <input
                type="file"
                onChange={(event) => {
                  setFile(event.target.files[0]);
                }}
              />
            </label>
            {file && (
              <div className="uploaded-image">
                <img src={URL.createObjectURL(file)} alt="" />
                <button>X</button>
              </div>
            )}
          </div>
          <div>
            <label>
              Titre:
              <input
                placeholder="ex: Chemise verte"
                type="text"
                name="title"
                id="title"
                value={title}
                onChange={(evt) => handleChange(evt, setTitle)}
              />
            </label>
            <label>
              Décris ton article:
              <textarea
                placeholder="ex: porté une seule fois, taille correctement"
                type="description"
                name="description"
                id="pawword"
                rows="3"
                cols="100"
                value={description}
                onChange={(evt) => handleChange(evt, setDescription)}
              />
            </label>
          </div>
          <div>
            <label>
              Marque:
              <input
                placeholder="ex: Zara"
                type="text"
                name="brand"
                id="brand"
                value={brand}
                onChange={(evt) => handleChange(evt, setBrand)}
              />
            </label>
            <label>
              Size:
              <input
                placeholder="ex: L / 42"
                type="text"
                name="size"
                id="size"
                value={size}
                onChange={(evt) => handleChange(evt, setSize)}
              />
            </label>
            <label>
              Couleur:
              <input
                placeholder="ex: Bleu"
                type="text"
                name="color"
                id="color"
                value={color}
                onChange={(evt) => handleChange(evt, setColor)}
              />
            </label>
            <label>
              Etat:
              <input
                placeholder="ex: comme neuf"
                type="text"
                name="condition"
                id="condition"
                value={condition}
                onChange={(evt) => handleChange(evt, setCondition)}
              />
            </label>
            <label>
              Lieu:
              <input
                placeholder="ex: Toulouse"
                type="text"
                name="place"
                id="place"
                value={place}
                onChange={(evt) => handleChange(evt, setPlace)}
              />
            </label>
          </div>
          <div>
            <label>
              Prix
              <input
                placeholder="0,00 €"
                type="text"
                name="price"
                id="price"
                value={price}
                onChange={(evt) => handleChange(evt, setPrice)}
              />
            </label>
            <div>
              <input
                type="checkbox"
                name="exchange"
                id="exchange"
                value={exchange}
                onChange={(evt) => handleChange(evt, setExchange)}
              />
              <label htmlFor="exchange">
                Je suis intéressé(e) par les échanges
              </label>
            </div>
          </div>
          <button className="dark-button">Ajouter</button>
        </form>
      </div>
    </div>
  ) : (
    <>
      <p>No token!</p>
      <Navigate to="/login" state={{ from: "/publish" }} />
    </>
  );
};

export default Publish;
