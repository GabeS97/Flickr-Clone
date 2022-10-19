import React, { useEffect } from "react";
import "./Header.css";
type Props = {};

function Header({}: Props) {
  let path: string = window.location.pathname;

  useEffect(() => {}, [path]);

  console.log(path);

  if (path !== ("/login" || "/signup")) {
    return (
      <header className="header__header">
        <div className="header__left">
          <img
            className="header__logo"
            src="https://brandlogos.net/wp-content/uploads/2022/04/flickr-logo-brandlogos.net_.png"
            alt=""
          />
        </div>

        <div className="header__middle">
          <div className="header__search">
            <i className="fa-solid fa-magnifying-glass header__searchicon"></i>
            <input type="text" placeholder="Photos, people, or groups" />
          </div>
        </div>

        <div className="header__right">
          <div className="header__buttons">
            <button className="login__button">Log In</button>
            <button className="signpup__button">Sign Up</button>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
