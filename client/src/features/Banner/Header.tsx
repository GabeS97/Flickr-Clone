import React from "react";
import "./Header.css";
type Props = {};

function Header({}: Props) {
  return (
    <header className="header__banner">
      <div className="header__left">
        <img
          className="header__logo"
          src="https://brandlogos.net/wp-content/uploads/2022/04/flickr-logo-brandlogos.net_.png"
        />
      </div>

      <div className="header__middle">
        <input type="text" placeholder="Photos, people, or groups" />
      </div>

      <div className="header__right"></div>
      <button className="login__button">Log In</button>
      <button className="signpup__button">Sign Up</button>
    </header>
  );
}

export default Header;
