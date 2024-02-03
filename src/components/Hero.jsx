import { useNavigate } from "react-router-dom";
import heroImg from "../assets/img/hero-home.jpg";

const Hero = () => {
  const navigate = useNavigate();

  const handlePublish = () => {
    navigate("/publish");
  };

  return (
    <div className="hero">
      <img src={heroImg} alt="home page" />
      <div className="action-wrapper">
        <h1>Prêts à faire du tri dans vos placards ?</h1>
        <button className="dark-button" onClick={handlePublish}>
          Commencer à vendre
        </button>
      </div>
    </div>
  );
};

export default Hero;
