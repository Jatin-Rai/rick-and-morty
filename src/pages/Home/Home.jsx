import React from 'react';
import Logo from "../../assets/RickAndMorty.png";
import style from "./Home.module.css";

/**
 * Home Component: Represents the home page of the Rick and Morty fan website.
 * @returns {JSX.Element} - React component
 */
const Home = () => {
  return (
    <div className={style.container} data-testid="home-header">
      <h1>Welcome</h1>
      <div className={style.image} data-testid="home-image-container">
        <img src={Logo} alt="Rick and Morty" />
      </div>
      <h3>Nerds</h3>
      <h4>Built with love by a Fan for the Fans</h4>
    </div>
  );
}

export default Home;
