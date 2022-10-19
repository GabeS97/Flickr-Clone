import React from "react";
import "./AuthHeader.css";
type Props = {};

function AuthHeader({}: Props) {
  return (
    <header className="authHeader__header">
      <img
        className="authHeader__logo"
        src="https://brandlogos.net/wp-content/uploads/2022/04/flickr-logo-brandlogos.net_.png"
        alt=""
      />
    </header>
  );
}

export default AuthHeader;
