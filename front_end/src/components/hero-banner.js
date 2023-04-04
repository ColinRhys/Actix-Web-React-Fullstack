import React from "react";
import SearchBar from "./SearchBar";

export const HeroBanner = () => {
  const logo =
    "https://www.rainforest-alliance.org/wp-content/uploads/2021/06/capybara-square-1.jpg.optimal.jpg";

  return (
    <div className="hero-banner hero-banner--pink-yellow">
      <div className="hero-banner__logo">
        <img className="hero-banner__image" src={logo} alt="Your Logo" />
      </div>
      <h1 className="hero-banner__headline">Name of Website</h1>
      <p className="hero-banner__description">
        Put your header text in here here / hero image text
      </p>
      <SearchBar className="hero-banner__searchbar" />
    </div>
  );
};
