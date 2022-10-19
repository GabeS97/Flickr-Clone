import React from "react";
import AuthHeader from "../../AuthHeader/AuthHeader";
import "./SignupPage.css";
type Props = {};

function SignupPage({}: Props) {
  return (
    <div className="signupPage">
      <AuthHeader />
      <img
        className="signupPage__background"
        src="https://live.staticflickr.com/7860/47508364201_5030d46631_b.jpg"
      />

      <div className="signupPage__formContainer">
        <div className="signupPage__formHeader">
          <img
            className="signupPage__logo"
            src="https://aux2.iconspalace.com/uploads/477867976811570308.png"
            alt=""
          />
          <h2 className="signupPage__title">Sign up for Flickr</h2>
        </div>
        <form className="signup__form">
          <input type="text" placeholder="First name"/>
          <input type="text" placeholder="Last name"/>
          <input type="email" placeholder="Email address"/>
          <input type="password" placeholder="Password"/>

          <button type="submit">Sign up</button>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;
