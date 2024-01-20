import heroImg from "../assets/img/hero-home.jpg";

const Hero = () => {
  return (
    <div className="hero">
      <img src={heroImg} alt="home page" />
      <div className="action-wrapper">
        <h1>Prêts à faire du tri dans vos placards ?</h1>
        <button className="dark-button">Commencer à vendre</button>
      </div>
    </div>
  );
};

export default Hero;
